# -*- coding: utf-8 -*-
"""Writes MASTER_TABLE.md: archive folder → page mapping, factual vs SEO geography, CITY × SERVICE matrix,
existing shower city data, personal-site mapping, curated order. Usage: python3 -I table.py <repo>"""
import json, glob, collections, sys, os, unicodedata
REPO = sys.argv[1]
sys.path.insert(0, os.path.join(REPO, 'seo-audit/projects-local-archive'))
import data  # noqa: E402

N = lambda s: unicodedata.normalize('NFC', s)
P, byfile = {}, {}
for f in glob.glob(os.path.join(REPO, 'src/content/projects/*.json')):
    d = json.load(open(f, encoding='utf-8')); P[d['slug']] = d; byfile[os.path.basename(f)[:-5]] = d['slug']
CAT = {'glass-partitions': 'Скляні перегородки', 'showers': 'Душові', 'railings': 'Сходи та огорожі', 'glass-doors': 'Скляні двері',
       'business-glass': 'Скло для бізнесу', 'frameless-glazing': 'Безрамне скління', 'aluminium': 'Алюміній',
       'glass-facades': 'Фасади', 'mirrors': 'Дзеркала'}
CITY = {'Київ': 'kyiv', 'Одеса': 'odesa', 'Львів': 'lviv'}
CITIES = [('kyiv', 'Київ'), ('odesa', 'Одеса'), ('lviv', 'Львів')]
B2B = {'sklinnya-riznogo-typu-dlya-gotelno-restorannogo-kompleksu-osocor-residence-m-kyyiv', 'zasklinnya-fasadiv-ta-okno-vydachi-v-coffee-ocean-m-odesa-arkadijska-aleya',
       'sklyani-peregorodky-dlya-ofisu-v-m-odesa', 'gotel-dvoryanskyj-odesa-dushovi-ta-shtorky-na-vanu', 'teple-osklinnya-vhidnoyi-grupy-restoranu-art-shat',
       'sklinni-riznogo-typu-dlya-gotelno-restorannogo-kompleksu-2', 'rozdilennya-peregorodkomu-prostoru-ta-obklejka-lakobelem-dvernyh-portaliv-dlya-stomatalogii-m-odesa',
       'chastne-zamovlennya-odesa-dushova-ta-peregorodka', 'rozdilennya-zony-pryjomu-kliyenta-mizh-pidgotovchoyu-zonoyu-v-kliniczi-zdrava',
       'sklinnya-riznogo-typu-dlya-gotelno-restorannogo-kompleksu', 'zonuvannya-prostoru-odnokimnatnoyi-kvartyry', 'choice-osklinya-kabinetu-v-vzhe-diyuchomu-magazyni',
       'glass-showcase-podium-store', 'bank-glass-partition-matte-glass', 'office-glass-partition-white-odesa', 'dental-clinic-glass-doors-aluminium-frame-kyiv'}
SHOWERS = {'Двер в душову з нерухомим склом': 'shower-door-fixed-glass-kyiv', 'Душвоа 2 скал від стіни до стіни': 'shower-wall-to-wall-brass-kyiv',
           'Душова від стіни до стіни': 'shower-corner-niche-kyiv', 'Душова до стелі': 'shower-glass-to-ceiling-kyiv',
           'Душова з розсувними дверима': 'sliding-shower-doors-kyiv', 'Душова під кутом': 'corner-shower-satin-hardware-odesa',
           'Душова трапеція з інсталяцією': 'trapezoid-shower-lviv', 'Душова із скошеною стелею': 'shower-sloped-ceiling-lviv',
           'Душові двері з золотою фурнітурою': 'shower-door-gold-hardware-kyiv', 'Кутова душова  - фарбованна фурнітура': 'corner-shower-bronze-hardware-odesa',
           'Кутова душова з чорною фурнітурою': 'corner-shower-black-hardware-lviv', 'Перегородка в душову до СТелі': 'stationary-shower-partition-odesa',
           'Скляна дверка': 'swing-shower-door-kyiv', 'Склянна Перегородка': 'stationary-glass-partition-lviv', 'Шторка на ванну': 'bath-screen-custom-odesa'}
SHOWERS = {N(k): v for k, v in SHOWERS.items()}
# mstyslavhrabko.com (read-only, repo commit 957eb93): local_archive projects → archive folder id
PERSONAL = {'A24': 'accordion-partition-mirror-film', 'A25': 'arched-bathroom-partition-gold', 'A16': 'arched-glass-partition-apartment',
            'A31': 'bank-glass-partition', 'A34': 'bedroom-partition-stopsol', 'A17': 'corner-loft-wardrobe-partition-kyiv',
            'A18': 'corner-wardrobe-bronze-glass', 'A28': 'cracked-ice-triplex-partition', 'A35': 'dental-clinic-glass-doors-kyiv',
            'A29': 'kitchen-glass-partition-odesa', 'A20': 'office-partition-white-odesa', 'A30': 'retail-showcase-podium',
            'A37': 'stairs-titanium-nitride-house', 'A27': 'study-glass-partition-apartment-kyiv', 'A23': 'tinted-partition-black-profile',
            'A22': 'wardrobe-partition-light-loft-lviv'}
OWNER = {'A17': 'owner 2026-10-14', 'A22': 'owner 2026-10-14', 'A29': 'owner 2026-10-14', 'A35': 'owner 2026-10-14',
         'A27': 'owner 2026-10-14', 'A20': 'owner 2026-10-14'}

inv = [l.rstrip('\n').split('\t') for l in open(os.path.join(REPO, 'seo-audit/projects-local-archive/archive-inventory.tsv'), encoding='utf-8')]
cnt = collections.Counter(N(os.path.dirname(r)) for _, _, r in inv)
byfolder = {N(p['folder']).rstrip(): p for p in data.PROJECTS}

L = []; w = L.append
w('# Space Glass — local project archive → main site: master table\n')
w('Archive `/Users/mstyslav/Проекти Space Glass` (read-only; 37 folders, 256 photos; `ДУШОВІ.zip` = copy of ДУШОВІ). '
  'Texts: `data.py` → `gen.py` (images, JSON, RU, cases) → `order.py` (portfolio order) → `table.py` (this file).\n')
w('**Geography model.** `city` = factual location only (owner-confirmed or existing site data); it is the only value shown on '
  'the project page and in schema. `seoLocations` = market for a project whose city is unknown; such a project appears on that '
  'city hub only in the block «Інші реалізовані рішення Space Glass», never as an object in the city.\n')
w('## 1. All 37 archive folders\n')
w('| # | ORIGINAL FOLDER | NORMALIZED TITLE | CATEGORY | FACTUAL CITY | SEO LOCATION | OBJECT TYPE | SLUG | URL | STATUS | CITY SOURCE | PERSONAL SITE MATCH | NOTES |')
w('|---|---|---|---|---|---|---|---|---|---|---|---|---|')
for i, d in enumerate(sorted(cnt, key=lambda d: (not d.startswith('ДУШОВІ'), d)), 1):
    top, name = d.split('/', 1)
    if top == 'ДУШОВІ':
        s = byfile[SHOWERS[name]]; e = P[s]
        w(f"| {i} | {name} | {e['h1']} | {CAT[e['category']]} | {e.get('city', '—')} | — | {e['objectType']} | {s} | /project/{s}/ | EXISTING | existing website data; archive verification: NO | — | {cnt[d]} photos, all already on the page; city preserved |")
    else:
        p = byfolder[d.rstrip()]; e = P[p['slug']]; pid = p['id']
        seo = e.get('seoLocations', ['—'])[0]
        src = OWNER.get(pid, 'unknown (not in folder name)') if e.get('city') else 'unknown (not in folder name)'
        w(f"| {i} | {name} | {e['h1']} | {CAT[e['category']]} | {e.get('city', 'Unknown')} | {seo} | {e['objectType']} | {p['slug']} | /project/{p['slug']}/ | NEW | {src} | {PERSONAL.get(pid, '—')} | {pid}; {len(p['gallery']) + 1} photos |")

fact = collections.Counter(CITY.get(d.get('city'), 'unknown') for d in P.values())
seo = collections.Counter(d['seoLocations'][0] for d in P.values() if d.get('seoLocations'))
w(f'\n## 2. Geography ({len(P)} published projects)\n')
w('| | Київ | Одеса | Львів | Unknown |\n|---|---|---|---|---|')
w(f"| A. Factual | {fact['kyiv']} | {fact['odesa']} | {fact['lviv']} | {fact['unknown']} |")
w(f"| B. SEO coverage (factual + assigned) | {fact['kyiv'] + seo['kyiv']} | {fact['odesa'] + seo['odesa']} | {fact['lviv'] + seo['lviv']} | {fact['unknown'] - sum(seo.values())} |")

def status(t):
    return 'STRONG' if t >= 3 else 'ACCEPTABLE' if t == 2 else 'WEAK'

w('\n## 3. CITY × SERVICE (factual / assigned / total / status)\n')
w('| SERVICE | Київ | Одеса | Львів | Unknown→ total |\n|---|---|---|---|---|')
rows = list(CAT.items()) + [('__b2b', 'B2B / commercial'), ('__res', 'Residential')]
for key, label in rows:
    def match(d):
        return (d['slug'] in B2B) if key == '__b2b' else (d['slug'] not in B2B) if key == '__res' else d['category'] == key
    cells = []
    for c, _ in CITIES:
        f = sum(1 for d in P.values() if match(d) and CITY.get(d.get('city')) == c)
        a = sum(1 for d in P.values() if match(d) and (d.get('seoLocations') or [None])[0] == c)
        cells.append(f'{f} / {a} / **{f + a}** {status(f + a)}')
    w(f"| {label} | {' | '.join(cells)} | {sum(1 for d in P.values() if match(d))} |")

w('\n## 4. Unknown → SEO location\n')
w('| PROJECT | CATEGORY | FACTUAL CITY | SEO LOCATION | REASON |\n|---|---|---|---|---|')
for slug, (loc, why) in sorted(data.SEO_LOCATIONS.items(), key=lambda x: (x[1][0], P[x[0]]['sortOrder'])):
    w(f"| {P[slug]['cardTitle']} (`{slug}`) | {CAT[P[slug]['category']]} | Unknown | {loc} | {why} |")

w('\n## 5. Existing shower projects (cities from the site, not from the archive)\n')
w('| PROJECT | CURRENT CITY | CITY SOURCE | STATUS |\n|---|---|---|---|')
for name, f in SHOWERS.items():
    e = P[byfile[f]]
    w(f"| {e['cardTitle']} (`{e['slug']}`) | {e.get('city')} | existing website data (2026-08 import) | PRESERVED / NOT ARCHIVE-VERIFIED |")

w('\n## 6. Personal site mapping (mstyslavhrabko.com, not changed; no links created)\n')
w('| PERSONAL SLUG | SPACE GLASS SLUG | FACTUAL CITY | SPACE GLASS STATUS |\n|---|---|---|---|')
for pid, ps in sorted(PERSONAL.items(), key=lambda x: x[1]):
    p = next(x for x in data.PROJECTS if x['id'] == pid); e = P[p['slug']]
    w(f"| {ps} | {p['slug']} | {e.get('city', 'Unknown')} | NEW, local branch (not deployed) |")

w('\n## 7. Curated order (sortOrder = position × 10; 1–15 featured)\n')
for d in sorted(P.values(), key=lambda d: d['sortOrder']):
    loc = d.get('city') or (f"Unknown → SEO {d['seoLocations'][0]}" if d.get('seoLocations') else 'Unknown')
    w(f"{d['sortOrder'] // 10}. {d['cardTitle']} — {loc} — {CAT[d['category']]}{' — B2B' if d['slug'] in B2B else ''} — `/project/{d['slug']}/`")
open(os.path.join(REPO, 'seo-audit/projects-local-archive/MASTER_TABLE.md'), 'w', encoding='utf-8').write('\n'.join(L) + '\n')
print(dict(fact), dict(seo), len(P))
