# -*- coding: utf-8 -*-
"""Curated portfolio order for /project/ (and every list sorted by sortOrder). sortOrder = position × 10.
TOP 15 get featured=true. Usage: python3 -I order.py <repo>"""
import json, glob, os, sys
ORDER = [
 'sklinnya-riznogo-typu-dlya-gotelno-restorannogo-kompleksu-osocor-residence-m-kyyiv',  # Osocor, Kyiv
 'glass-stair-railing-titanium-nitride-house',                                       # NEW stairs
 'zasklinnya-fasadiv-ta-okno-vydachi-v-coffee-ocean-m-odesa-arkadijska-aleya',       # Coffee Ocean, Odesa
 'sklyani-peregorodky-dlya-ofisu-v-m-odesa',                                          # BC Morskyi, Odesa
 'cracked-ice-triplex-glass-partition',                                               # NEW
 'gotel-dvoryanskyj-odesa-dushovi-ta-shtorky-na-vanu',                                # hotel, Odesa
 'shtorka-dlya-vannoyi-zhk-akvarel-v-m-odesa',
 'glass-showcase-podium-store',                                                       # NEW shop
 'teple-osklinnya-vhidnoyi-grupy-restoranu-art-shat',
 'arched-glass-partition-bathroom-painted-profile',                                   # NEW
 'sklinni-riznogo-typu-dlya-gotelno-restorannogo-kompleksu-2',                        # KSELENA
 'shower-wall-to-wall-brass-kyiv',
 'bank-glass-partition-matte-glass',                                                  # NEW bank
 'ogorozha-shodiv-ta-drugogo-poverhu',
 'dzerkalo-z-pidsvidkoyu-v-m-odesa',
 'bedroom-glass-partition-stopsol-synchro',
 'rozdilennya-peregorodkomu-prostoru-ta-obklejka-lakobelem-dvernyh-portaliv-dlya-stomatalogii-m-odesa',
 'mizhkimnatni-peregorodky-v-styli-loft-zhk-atlant-m-kyyiv',
 'trapezoid-shower-lviv',
 'folding-glass-partition-mirror-film',
 'chastne-zamovlennya-odesa-dushova-ta-peregorodka',
 'sliding-shower-doors-kyiv',
 'dental-clinic-glass-doors-aluminium-frame-kyiv',
 'rozdilennya-zony-pryjomu-kliyenta-mizh-pidgotovchoyu-zonoyu-v-kliniczi-zdrava',
 'corner-wardrobe-glass-partition-bronze-glass',
 'shower-sloped-ceiling-lviv',
 'sklinnya-riznogo-typu-dlya-gotelno-restorannogo-kompleksu',
 'arched-glass-partition-apartment',
 'corner-loft-wardrobe-glass-partition-kyiv',                                        # A17 Kyiv
 'dzerkalni-dveri-v-garderob-2',
 'dzerkalo-z-pidsvidkoyu-v-m-odesa-2',
 'private-house-study-glass-partition-aluminium',
 'sklyani-peregorodky-u-garderobnu-v-m-odesa',
 'zonuvannya-prostoru-odnokimnatnoyi-kvartyry',
 'corner-shower-black-hardware-lviv',
 'office-glass-partition-white-odesa',
 'choice-osklinya-kabinetu-v-vzhe-diyuchomu-magazyni',
 'kitchen-glass-partition-apartment-odesa',
 'dzerkalni-dveri-v-garderob',
 'shower-door-gold-hardware-kyiv',
 'mizhkimnatni-peregorodku-v-stuli-loft',
 'dzerkalo-na-stinu-v-zhk-kontynent-m-odesa',
 'room-glass-partition-tinted-black-profile',
 'bath-screen-teremky-kyiv',
 'mirrored-wardrobe-doors-milos-odesa',
 'corner-shower-bronze-hardware-odesa',
 'interior-glass-partition-with-door',
 'mizhkimnatni-peregorodky-v-dytyachu',
 'dushovi-garmoshka-zhk',
 'glass-partitions-aluminium-frame-lock-apartment',
 'shower-glass-to-ceiling-kyiv',
 'wardrobe-glass-partition-swing-doors',
 'wardrobe-glass-partition-light-loft-lviv',                                         # A22 Lviv
 'stationary-shower-partition-odesa',
 'sliding-glass-partition-room-balcony',
 'corner-shower-satin-hardware-odesa',
 'apartment-study-glass-partition-kyiv',
 'shower-door-fixed-glass-kyiv',
 'glass-partition-room-to-balcony',
 'stationary-glass-partition-lviv',
 'swing-shower-door-kyiv',
 'shower-corner-niche-kyiv',
 'shtorka-dlya-vannoyi-v-m-odesa',
]
repo = sys.argv[1]
files = {}
for f in glob.glob(os.path.join(repo, 'src/content/projects/*.json')):
    files[json.load(open(f, encoding='utf-8'))['slug']] = f
assert len(ORDER) == len(set(ORDER)), 'duplicate in ORDER'
missing = set(files) - set(ORDER); extra = set(ORDER) - set(files)
assert not missing and not extra, (missing, extra)
for i, slug in enumerate(ORDER, 1):
    f = files[slug]; raw = open(f, encoding='utf-8').read(); d = json.loads(raw)
    new_sort, new_feat = i * 10, i <= 15
    if d['sortOrder'] == new_sort and d['featured'] == new_feat: continue
    # targeted text replacement keeps the original file formatting
    import re
    raw = re.sub(r'"sortOrder": \d+', f'"sortOrder": {new_sort}', raw, count=1)
    raw = re.sub(r'"featured": (true|false)', f'"featured": {"true" if new_feat else "false"}', raw, count=1)
    open(f, 'w', encoding='utf-8').write(raw)
print('ordered', len(ORDER))
