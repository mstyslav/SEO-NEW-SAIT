# -*- coding: utf-8 -*-
"""
Generates the archive-imported projects from data.py:
  public/images/projects/{slug}/*.webp           (hero + gallery, -480/-720/-960 variants)
  src/content/projects/{slug}.json               (UA project entity)
  src/data/ru/projects-archive.ru.ts             (RU texts, merged into projectTextsRu)
  src/data/project-cases/archive-2026-10.ts      (premium case blocks UA+RU)
The archive is read only. Usage: python3 -I gen.py <repo> <inventory.tsv> <tmpdir> [--no-images]
"""
import json, os, subprocess, sys
from PIL import Image, ImageOps

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import data  # noqa: E402

REPO, INVENTORY, TMP = sys.argv[1], sys.argv[2], sys.argv[3]
NO_IMAGES = '--no-images' in sys.argv
MAX_W = 1280
QUALITY = 80

inv = {}
for line in open(INVENTORY, encoding='utf-8'):
    pid, dims, rel = line.rstrip('\n').split('\t')
    inv[pid] = rel

RELATED = {
    'A37': ['ogorozha-shodiv-ta-drugogo-poverhu', 'dzerkalni-dveri-v-garderob-2'],
    'A28': ['A23', 'A36'], 'A30': ['A31', 'A20'], 'A25': ['A16', 'A36'], 'A31': ['A20', 'A35'],
    'A34': ['A18', 'A26'], 'A24': ['A34', 'A29'], 'A35': ['A31', 'A36'], 'A18': ['A21', 'A34'],
    'A16': ['A25', 'A19'], 'A32': ['A27', 'A36'], 'A20': ['A31', 'sklyani-peregorodky-dlya-ofisu-v-m-odesa'],
    'A29': ['A26', 'dzerkalni-dveri-v-garderob'], 'A23': ['A28', 'A33'], 'A19': ['A36', 'A16'],
    'A36': ['A19', 'A32'], 'A21': ['A18', 'sklyani-peregorodky-u-garderobnu-v-m-odesa'],
    'A26': ['A33', 'A34'], 'A27': ['A32', 'A19'], 'A33': ['A26', 'A23'],
}
by_id = {p['id']: p for p in data.PROJECTS}


def related(pid):
    return [by_id[r]['slug'] if r in by_id else r for r in RELATED[pid]]


def to_jpeg(src):
    """HEIC → JPEG via sips (macOS) in TMP; JPG returned as is."""
    if src.lower().endswith('.heic'):
        out = os.path.join(TMP, os.path.basename(src) + '.jpg')
        if not os.path.exists(out):
            subprocess.run(['sips', '-s', 'format', 'jpeg', '-s', 'formatOptions', '95', src, '--out', out],
                           check=True, capture_output=True)
        return out
    return src


def export(pid, slug, name):
    src = to_jpeg(os.path.join(data.ARCHIVE_ROOT, inv[pid]))
    im = ImageOps.exif_transpose(Image.open(src)).convert('RGB')
    if im.width > MAX_W:
        im = im.resize((MAX_W, round(im.height * MAX_W / im.width)), Image.LANCZOS)
    d = os.path.join(REPO, 'public/images/projects', slug)
    os.makedirs(d, exist_ok=True)
    base = os.path.join(d, f'{slug}-{name}')
    if not NO_IMAGES:
        im.save(base + '.webp', 'WEBP', quality=QUALITY, method=6)
        for w in (480, 720, 960):
            if im.width > w:
                im.resize((w, round(im.height * w / im.width)), Image.LANCZOS).save(f'{base}-{w}.webp', 'WEBP', quality=QUALITY, method=6)
    return dict(src=f'/images/projects/{slug}/{slug}-{name}.webp', width=im.width, height=im.height)


ru_texts, cases, rows = {}, {}, []
for p in data.PROJECTS:
    uk, ru, slug = p['uk'], p['ru'], p['slug']
    cover = {**export(p['hero'], slug, 'hero'), 'alt': uk['alts'][p['hero']]}
    gallery = [{**export(g, slug, f'detail-{i:02d}'), 'alt': uk['alts'][g]} for i, g in enumerate(p['gallery'], 1)]

    def body(t):
        return dict(
            clientTask={'title': t['type'], 'text': t['about'][0] if len(t['about'][0]) >= 60 else t['short']},
            solution={'title': t['gallery_title'], 'text': t['about'][-1]},
            installation={'title': t['type'], 'text': t['short']},
            result={'title': t['h1'], 'text': t['result']},
        )

    entry = dict(
        slug=slug, locale='uk', status='published', featured=False, sortOrder=0,
        seo={'title': uk['seo_t'], 'description': uk['seo_d']},
        h1=uk['h1'], cardTitle=uk['card'], cardTitleRu=ru['card'],
        category=p['category'], constructionType=uk['type'], constructionTypeRu=ru['type'],
        objectType=uk['obj'], shortDescription=uk['short'], shortDescriptionRu=ru['short'],
        **body(uk),
        characteristics=[{'label': l, 'value': v} for l, v in uk['chars']],
        materials=uk['mats'],
        cover=cover, gallery=gallery,
        faq=[{'question': q, 'answer': a} for q, a in uk['faq']],
        serviceLink={'label': uk['svc'][0], 'href': uk['svc'][1]},
        relatedProjectSlugs=related(p['id']),
    )
    path = os.path.join(REPO, 'src/content/projects', f'{slug}.json')
    if os.path.exists(path):  # keep the curated sortOrder/featured of an earlier run
        old = json.load(open(path, encoding='utf-8'))
        entry['sortOrder'], entry['featured'] = old['sortOrder'], old['featured']
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(entry, f, ensure_ascii=False, indent=2)
        f.write('\n')

    ru_texts[slug] = dict(
        seo={'title': ru['seo_t'], 'description': ru['seo_d']}, h1=ru['h1'], cardTitle=ru['card'],
        constructionType=ru['type'], objectType=ru['obj'], shortDescription=ru['short'],
        **body(ru),
        characteristics=[{'label': l, 'value': v} for l, v in ru['chars']], materials=ru['mats'],
        coverAlt=ru['alts'][p['hero']], gallery=[[ru['alts'][g]] for g in p['gallery']],
        faq=[{'question': q, 'answer': a} for q, a in ru['faq']], serviceLinkLabel=ru['svc'],
    )

    def case(t, svc_labels, cta_title, button):
        primary_label, secondary_labels = svc_labels
        return dict(
            heroCaption=t['hero_cap'], galleryTitle=t['gallery_title'],
            about={'title': t['type'], 'paragraphs': t['about']},
            tech={'title': 'Що відомо про проєкт' if t is uk else 'Что известно о проекте',
                  'items': [{'label': l, 'value': v} for l, v in t['tech']]},
            result={'title': 'Результат', 'text': t['result']},
            service={'title': 'Пов’язана послуга' if t is uk else 'Связанная услуга',
                     'primary': {'label': primary_label, 'href': uk['svc'][1]},
                     'secondary': [{'label': lab, 'href': href} for lab, (_, href) in zip(secondary_labels, uk['svc2'])]},
            cta={'title': cta_title, 'text': t['cta'], 'button': button},
            faqTitle='Питання про проєкт і замовлення' if t is uk else 'Вопросы о проекте и заказе',
        )

    cases[slug] = {
        'uk': case(uk, (uk['svc'][0], [l for l, _ in uk['svc2']]), data.CTA_UK, data.BTN_UK),
        'ru': case(ru, (ru['svc'], ru['svc2']), data.CTA_RU, data.BTN_RU),
    }
    rows.append((p, slug, len(p['gallery']) + 1))

HEAD_RU = '''/**
 * RU texts of the projects imported from the owner's local archive «Проекти Space Glass» (October 2026).
 * GENERATED by seo-audit/projects-local-archive/gen.py from data.py — edit data.py and re-run.
 * Merged into projectTextsRu (src/data/ru/projects.ru.ts). Facts come only from the archive folder names.
 */
'''
with open(os.path.join(REPO, 'src/data/ru/projects-archive.ru.ts'), 'w', encoding='utf-8') as f:
    f.write(HEAD_RU + 'export const archiveProjectTextsRu = ' + json.dumps(ru_texts, ensure_ascii=False, indent=2) + ';\n')

HEAD_CASE = '''/**
 * Premium case blocks for the projects imported from the owner's local archive «Проекти Space Glass»
 * (October 2026). GENERATED by seo-audit/projects-local-archive/gen.py from data.py — edit data.py and re-run.
 *
 * Sources: the archive folder name (the only confirmed facts: object, construction, glass, finish) and
 * what the project's own photos visibly show (always phrased as «на фото»). Nothing else is stated:
 * no city, size, thickness, hardware brand, system, term, year or price. No «general information» blocks.
 */
import type { ProjectCase } from '../project-cases';

'''
with open(os.path.join(REPO, 'src/data/project-cases/archive-2026-10.ts'), 'w', encoding='utf-8') as f:
    f.write(HEAD_CASE + 'export const archiveCases: Record<string, ProjectCase> = ' + json.dumps(cases, ensure_ascii=False, indent=2) + ';\n')

print('generated', len(rows), 'projects')
