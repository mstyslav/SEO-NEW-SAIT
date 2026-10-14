# -*- coding: utf-8 -*-
"""Writes MASTER_TABLE.md (archive folder → page mapping + portfolio stats). Usage: python3 -I table.py <repo>"""
import json, glob, collections, sys, os, unicodedata
REPO = sys.argv[1]
sys.path.insert(0, os.path.join(REPO, 'seo-audit/projects-local-archive'))
import data  # noqa: E402

N = lambda s: unicodedata.normalize('NFC', s)
P = {}
byfile = {}
for f in glob.glob(os.path.join(REPO, 'src/content/projects/*.json')):
    d = json.load(open(f, encoding='utf-8')); P[d['slug']] = d; byfile[os.path.basename(f)[:-5]] = d['slug']
CAT = {'showers': 'Душові', 'mirrors': 'Дзеркала', 'glass-partitions': 'Скляні перегородки', 'glass-doors': 'Скляні двері',
       'railings': 'Сходи та огорожі', 'frameless-glazing': 'Безрамне скління', 'aluminium': 'Алюмінієві конструкції',
       'glass-facades': 'Фасадне скління', 'business-glass': 'Скло для бізнесу'}
B2B = {'sklinnya-riznogo-typu-dlya-gotelno-restorannogo-kompleksu-osocor-residence-m-kyyiv', 'zasklinnya-fasadiv-ta-okno-vydachi-v-coffee-ocean-m-odesa-arkadijska-aleya',
       'sklyani-peregorodky-dlya-ofisu-v-m-odesa', 'gotel-dvoryanskyj-odesa-dushovi-ta-shtorky-na-vanu', 'teple-osklinnya-vhidnoyi-grupy-restoranu-art-shat',
       'sklinni-riznogo-typu-dlya-gotelno-restorannogo-kompleksu-2', 'rozdilennya-peregorodkomu-prostoru-ta-obklejka-lakobelem-dvernyh-portaliv-dlya-stomatalogii-m-odesa',
       'chastne-zamovlennya-odesa-dushova-ta-peregorodka', 'rozdilennya-zony-pryjomu-kliyenta-mizh-pidgotovchoyu-zonoyu-v-kliniczi-zdrava',
       'sklinnya-riznogo-typu-dlya-gotelno-restorannogo-kompleksu', 'zonuvannya-prostoru-odnokimnatnoyi-kvartyry', 'choice-osklinya-kabinetu-v-vzhe-diyuchomu-magazyni',
       'glass-showcase-podium-store', 'bank-glass-partition-matte-glass', 'office-glass-partition-white', 'dental-clinic-glass-doors-aluminium-frame'}
# ДУШОВІ folder → existing content file (every archive photo matched a site photo by perceptual hash).
SHOWERS = {'Двер в душову з нерухомим склом': 'shower-door-fixed-glass-kyiv', 'Душвоа 2 скал від стіни до стіни': 'shower-wall-to-wall-brass-kyiv',
           'Душова від стіни до стіни': 'shower-corner-niche-kyiv', 'Душова до стелі': 'shower-glass-to-ceiling-kyiv',
           'Душова з розсувними дверима': 'sliding-shower-doors-kyiv', 'Душова під кутом': 'corner-shower-satin-hardware-odesa',
           'Душова трапеція з інсталяцією': 'trapezoid-shower-lviv', 'Душова із скошеною стелею': 'shower-sloped-ceiling-lviv',
           'Душові двері з золотою фурнітурою': 'shower-door-gold-hardware-kyiv', 'Кутова душова  - фарбованна фурнітура': 'corner-shower-bronze-hardware-odesa',
           'Кутова душова з чорною фурнітурою': 'corner-shower-black-hardware-lviv', 'Перегородка в душову до СТелі': 'stationary-shower-partition-odesa',
           'Скляна дверка': 'swing-shower-door-kyiv', 'Склянна Перегородка': 'stationary-glass-partition-lviv', 'Шторка на ванну': 'bath-screen-custom-odesa'}
SHOWERS = {N(k): v for k, v in SHOWERS.items()}
inv = [l.rstrip('\n').split('\t') for l in open(os.path.join(REPO, 'seo-audit/projects-local-archive/archive-inventory.tsv'), encoding='utf-8')]
cnt = collections.Counter(N(os.path.dirname(r)) for _, _, r in inv)
byfolder = {N(p['folder']).rstrip(): p for p in data.PROJECTS}
held = {N(h['folder']).rstrip(): h for h in data.HELD}

L = []; w = L.append
w('# Space Glass — local project archive → main site: master table\n')
w('Archive `/Users/mstyslav/Проекти Space Glass` (read-only; `ДУШОВІ.zip` is a copy of the ДУШОВІ folder). '
  'Texts: `data.py`; images/JSON/RU/cases: `gen.py`; portfolio order: `order.py`; this file: `table.py`. '
  'Photo ids (aNNN) → files: `archive-inventory.tsv`.\n')
w('No archive folder names a city → CITY = Unknown for every new project (nothing guessed). '
  'Cities of the 15 shower projects come from the existing site records (imported 2026-08), not from the archive.\n')
w('| # | ORIGINAL FOLDER NAME | CATEGORY FOLDER | PHOTOS | CITY | OBJECT TYPE | CONSTRUCTION TYPE | MATCHED PROJECT | CURRENT URL | STATUS | PROPOSED TITLE | SLUG | ACTION |')
w('|---|---|---|---|---|---|---|---|---|---|---|---|---|')
for i, d in enumerate(sorted(cnt, key=lambda d: (not d.startswith('ДУШОВІ'), d)), 1):
    top, name = d.split('/', 1); key = d.rstrip()
    if top == 'ДУШОВІ':
        s = byfile[SHOWERS[name]]; e = P[s]
        w(f"| {i} | {name} | {top} | {cnt[d]} | {e.get('city', 'Unknown')} (site) | {e['objectType']} | {e['constructionType']} | {e['cardTitle']} | /project/{s}/ | EXISTING | keep | {s} | none: every archive photo is already on the page |")
    elif key in byfolder:
        p = byfolder[key]
        w(f"| {i} | {name} | {top} | {cnt[d]} | Unknown | {p['uk']['obj']} | {p['uk']['type']} | — | — | NEW | {p['uk']['h1']} | {p['slug']} | created UA+RU, {len(p['gallery']) + 1} photos |")
    else:
        h = held[key]
        w(f"| {i} | {name} | {top} | {cnt[d]} | Unknown | — | — | {'cracked-ice-triplex-glass-partition' if h['id'] == 'A17' else 'room-glass-partition-tinted-black-profile'} (same interior) | — | {h['status']} | — | — | not created — {h['reason']} |")

city = collections.Counter(d.get('city') or 'Unknown' for d in P.values())
cats = collections.Counter(CAT[d['category']] for d in P.values())
w(f'\n## Portfolio after import ({len(P)} published entries)\n')
w('- By city: ' + ', '.join(f'{k} — {v}' for k, v in city.most_common()))
w('- By category: ' + ', '.join(f'{k} — {v}' for k, v in cats.most_common()))
w(f'- B2B/commercial — {len(B2B & set(P))}, residential — {len(P) - len(B2B & set(P))}')
w('\n## Curated order (sortOrder = position × 10; positions 1–15 have featured = true)\n')
for d in sorted(P.values(), key=lambda d: d['sortOrder']):
    w(f"{d['sortOrder'] // 10}. {d['cardTitle']} — {d.get('city', 'Unknown')} — {CAT[d['category']]}{' — B2B' if d['slug'] in B2B else ''} — `/project/{d['slug']}/`")
open(os.path.join(REPO, 'seo-audit/projects-local-archive/MASTER_TABLE.md'), 'w', encoding='utf-8').write('\n'.join(L) + '\n')
print(dict(city), dict(cats), len(B2B & set(P)), len(P))
