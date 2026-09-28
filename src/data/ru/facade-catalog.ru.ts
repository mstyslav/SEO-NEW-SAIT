/**
 * RU texts for the hub /ru/poslugy/sklyani-fasady/: card name and note of each facade child page and
 * the systems-table fields (system name, type, two key specs) — mirrors src/data/facade-catalog.ts.
 * The child pages themselves have no RU version yet (P2), so only what the hub renders is here.
 */
export interface FacadeHubCardRu {
  slug: string;
  path: string;
  name: string;
  cardNote: string;
  models: { id: string; name: string; kind: string; specs: [string, string][] }[];
}

export const facadeHubCardsRu: FacadeHubCardRu[] = [
  {
    "slug": "stiykovo-ryhelne-sklinnya",
    "path": "/poslugy/sklyani-fasady/stiykovo-ryhelne-sklinnya/",
    "name": "Стоечно-ригельное остекление",
    "cardNote": "Каркас из стоек и ригелей: дома, офисы, ТЦ, крыши.",
    "models": [
      {
        "id": "mb-mt50n",
        "name": "Aluprof MB-MT50N",
        "kind": "Стоечно-ригельный фасад",
        "specs": [
          [
            "Теплоизоляция",
            "Uf от 0,55 W/(m²K)"
          ],
          [
            "Воздухопроницаемость",
            "AE 1950 Pa"
          ]
        ]
      },
      {
        "id": "mb-sr50n",
        "name": "Aluprof MB-SR50N",
        "kind": "Стоечно-ригельный",
        "specs": [
          [
            "Теплоизоляция",
            "Uf от 0,6 W/(m²K)"
          ],
          [
            "Воздухопроницаемость",
            "AE 1200"
          ]
        ]
      },
      {
        "id": "mb-sr50n-hi",
        "name": "Aluprof MB-SR50N HI",
        "kind": "Повышенная теплоизоляция",
        "specs": [
          [
            "Теплоизоляция",
            "Uf от 0,85 W/(m²K)"
          ],
          [
            "Воздухопроницаемость",
            "AE 1200"
          ]
        ]
      },
      {
        "id": "mb-sr60n",
        "name": "Aluprof MB-SR60N",
        "kind": "Фасад 60 мм",
        "specs": [
          [
            "Воздухопроницаемость",
            "до AE 1350"
          ],
          [
            "Водонепроницаемость",
            "до RE 1500"
          ]
        ]
      },
      {
        "id": "mb-mm50n",
        "name": "Aluprof MB-MM50N",
        "kind": "Стоечно-ригельный, более тёплый",
        "specs": [
          [
            "Теплоизоляция",
            "Uf от 0,62 W/(m²K)"
          ],
          [
            "Воздухопроницаемость",
            "AE 1200 Pa"
          ]
        ]
      },
      {
        "id": "mb-sr50n-pl",
        "name": "Aluprof MB-SR50N PL",
        "kind": "«Горизонтальная линия»",
        "specs": [
          [
            "Воздухопроницаемость",
            "класс AE"
          ],
          [
            "Водонепроницаемость",
            "RE 1200"
          ]
        ]
      }
    ]
  },
  {
    "slug": "strukturne-sklinnya-fasadu",
    "path": "/poslugy/sklyani-fasady/strukturne-sklinnya-fasadu/",
    "name": "Структурное остекление фасада",
    "cardNote": "Сплошное стекло снаружи: полуструктурные и элементные фасады.",
    "models": [
      {
        "id": "mb-sr50n-efekt",
        "name": "Aluprof MB-SR50N EFEKT",
        "kind": "Стеклянные стены и крыша",
        "specs": [
          [
            "Воздухопроницаемость",
            "AE 1200 Pa"
          ],
          [
            "Водонепроницаемость",
            "RE 1200 Pa"
          ]
        ]
      },
      {
        "id": "mb-se85-sg",
        "name": "Aluprof MB-SE85 SG",
        "kind": "Структурный модульный фасад",
        "specs": [
          [
            "Воздухопроницаемость",
            "класс AE 1200 Pa"
          ],
          [
            "Водонепроницаемость",
            "класс RE 1200 Pa"
          ]
        ]
      },
      {
        "id": "mb-se65",
        "name": "Aluprof MB-SE65",
        "kind": "Элементный фасад",
        "specs": [
          [
            "Воздухопроницаемость",
            "AE 1200 Pa"
          ],
          [
            "Водонепроницаемость",
            "RE 1200 Pa"
          ]
        ]
      },
      {
        "id": "mb-sr50n-iw",
        "name": "Aluprof MB-SR50N IW",
        "kind": "Окно, скрытое в фасаде",
        "specs": [
          [
            "Теплоизоляция",
            "Uw от 1,68 W/(m²K)"
          ],
          [
            "Водонепроницаемость",
            "E1500"
          ]
        ]
      },
      {
        "id": "mb-sr50n-ei",
        "name": "Aluprof MB-SR50N EI / EI EFEKT",
        "kind": "Противопожарный фасад",
        "specs": [
          [
            "Огнестойкость",
            "EI30 и EI60"
          ],
          [
            "Воздухопроницаемость",
            "AE 1050 Pa"
          ]
        ]
      },
      {
        "id": "mb-sr60n",
        "name": "Aluprof MB-SR60N",
        "kind": "Фасад 60 мм",
        "specs": [
          [
            "Воздухопроницаемость",
            "до AE 1350"
          ],
          [
            "Водонепроницаемость",
            "до RE 1500"
          ]
        ]
      }
    ]
  },
  {
    "slug": "sklyani-fasady-budynkiv",
    "path": "/poslugy/sklyani-fasady/sklyani-fasady-budynkiv/",
    "name": "Стеклянные фасады домов",
    "cardNote": "Витражи, второй свет, стеклянные крыши для частного дома.",
    "models": [
      {
        "id": "mb-mt50n",
        "name": "Aluprof MB-MT50N",
        "kind": "Стоечно-ригельный фасад",
        "specs": [
          [
            "Теплоизоляция",
            "Uf от 0,55 W/(m²K)"
          ],
          [
            "Воздухопроницаемость",
            "AE 1950 Pa"
          ]
        ]
      },
      {
        "id": "mb-sr50n-hi-plus",
        "name": "Aluprof MB-SR50N HI+",
        "kind": "Энергосберегающий фасад",
        "specs": [
          [
            "Теплоизоляция",
            "Uf от 0,59 W/(m²K)"
          ],
          [
            "Воздухопроницаемость",
            "AE 1200 Pa"
          ]
        ]
      },
      {
        "id": "mb-sr50n-a",
        "name": "Aluprof MB-SR50N A",
        "kind": "На деревянный или стальной каркас",
        "specs": [
          [
            "Стеклопакет",
            "24–64 мм"
          ],
          [
            "Вес заполнения",
            "до 600 кг"
          ]
        ]
      },
      {
        "id": "mb-sr50n-iw",
        "name": "Aluprof MB-SR50N IW",
        "kind": "Окно, скрытое в фасаде",
        "specs": [
          [
            "Теплоизоляция",
            "Uw от 1,68 W/(m²K)"
          ],
          [
            "Водонепроницаемость",
            "E1500"
          ]
        ]
      },
      {
        "id": "mb-sr50n-rw",
        "name": "Aluprof MB-SR50N RW",
        "kind": "Окна в стеклянной крыше",
        "specs": [
          [
            "Уклон крыши",
            "от 5° до 75°"
          ],
          [
            "Размер окна",
            "до 1,80 × 2,05 м"
          ]
        ]
      },
      {
        "id": "mb-sunprof",
        "name": "Aluprof MB-SUNPROF",
        "kind": "Фасадные жалюзи",
        "specs": [
          [
            "Ширина ламелей",
            "100–300 мм"
          ],
          [
            "Угол наклона",
            "от 0 до 45°"
          ]
        ]
      }
    ]
  },
  {
    "slug": "enerhoefektyvni-fasady",
    "path": "/poslugy/sklyani-fasady/enerhoefektyvni-fasady/",
    "name": "Энергоэффективные фасады",
    "cardNote": "Пассивные здания, солнцезащита, фасад с солнечными панелями.",
    "models": [
      {
        "id": "mb-sr50n-hi-plus",
        "name": "Aluprof MB-SR50N HI+",
        "kind": "Энергосберегающий фасад",
        "specs": [
          [
            "Теплоизоляция",
            "Uf от 0,59 W/(m²K)"
          ],
          [
            "Воздухопроницаемость",
            "AE 1200 Pa"
          ]
        ]
      },
      {
        "id": "mb-mt50n",
        "name": "Aluprof MB-MT50N",
        "kind": "Стоечно-ригельный фасад",
        "specs": [
          [
            "Теплоизоляция",
            "Uf от 0,55 W/(m²K)"
          ],
          [
            "Воздухопроницаемость",
            "AE 1950 Pa"
          ]
        ]
      },
      {
        "id": "mb-mm50n",
        "name": "Aluprof MB-MM50N",
        "kind": "Стоечно-ригельный, более тёплый",
        "specs": [
          [
            "Теплоизоляция",
            "Uf от 0,62 W/(m²K)"
          ],
          [
            "Воздухопроницаемость",
            "AE 1200 Pa"
          ]
        ]
      },
      {
        "id": "mb-sr50n-pv",
        "name": "Aluprof MB-SR50N PV",
        "kind": "Фасад с солнечными панелями",
        "specs": [
          [
            "Теплоизоляция",
            "Uf от 1,13 W/(m²K)"
          ],
          [
            "Воздухопроницаемость",
            "AE 1200 Pa"
          ]
        ]
      },
      {
        "id": "mb-sr50n-zs",
        "name": "Aluprof MB-SR50N ZS",
        "kind": "Фасад с жалюзи",
        "specs": [
          [
            "Воздухопроницаемость",
            "класс AE 1200"
          ],
          [
            "Водонепроницаемость",
            "класс RE 1200"
          ]
        ]
      },
      {
        "id": "mb-sunprof",
        "name": "Aluprof MB-SUNPROF",
        "kind": "Фасадные жалюзи",
        "specs": [
          [
            "Ширина ламелей",
            "100–300 мм"
          ],
          [
            "Угол наклона",
            "от 0 до 45°"
          ]
        ]
      }
    ]
  },
  {
    "slug": "vitrinne-sklinnya",
    "path": "/poslugy/sklyani-fasady/vitrinne-sklinnya/",
    "name": "Витринное остекление",
    "cardNote": "Магазины, кафе, салоны: большие поля стекла и двери.",
    "models": [
      {
        "id": "mb-sr50n",
        "name": "Aluprof MB-SR50N",
        "kind": "Стоечно-ригельный",
        "specs": [
          [
            "Теплоизоляция",
            "Uf от 0,6 W/(m²K)"
          ],
          [
            "Воздухопроницаемость",
            "AE 1200"
          ]
        ]
      },
      {
        "id": "mb-sr50n-efekt",
        "name": "Aluprof MB-SR50N EFEKT",
        "kind": "Стеклянные стены и крыша",
        "specs": [
          [
            "Воздухопроницаемость",
            "AE 1200 Pa"
          ],
          [
            "Водонепроницаемость",
            "RE 1200 Pa"
          ]
        ]
      },
      {
        "id": "mb-45",
        "name": "Aluprof MB-45",
        "kind": "Без терморазрыва",
        "specs": [
          [
            "Глубина профиля",
            "45 мм (рама) / 54 мм (створка)"
          ],
          [
            "Остекление",
            "2–35 мм"
          ]
        ]
      },
      {
        "id": "mb-79n",
        "name": "Aluprof MB-79N",
        "kind": "Распашные и поворотно-откидные",
        "specs": [
          [
            "Теплоизоляция профиля",
            "Uf от 0,83 W/(m²K)"
          ],
          [
            "Теплоизоляция окна",
            "Uw от 0,64 W/(m²K)"
          ]
        ]
      },
      {
        "id": "mb-86n",
        "name": "Aluprof MB-86N",
        "kind": "Крупноформатные окна",
        "specs": [
          [
            "Теплоизоляция окна",
            "Uw от 0,62 W/(m²K)"
          ],
          [
            "Водонепроницаемость",
            "класс E4800 Pa"
          ]
        ]
      },
      {
        "id": "mb-slimline",
        "name": "Aluprof MB-Slimline",
        "kind": "Панорамные окна",
        "specs": [
          [
            "Теплоизоляция окна",
            "Uw от 0,8 W/(m²K)"
          ],
          [
            "Водонепроницаемость",
            "класс E1500"
          ]
        ]
      }
    ]
  },
  {
    "slug": "sklyani-vkhidni-hrupy",
    "path": "/poslugy/sklyani-fasady/sklyani-vkhidni-hrupy/",
    "name": "Стеклянные входные группы",
    "cardNote": "Двери + стеклянные поля в одном профиле: дома и бизнес.",
    "models": [
      {
        "id": "mb-86n-pivot-door",
        "name": "Aluprof MB-86N Pivot Door",
        "kind": "Поворотные двери",
        "specs": [
          [
            "Макс. размер полотна",
            "2,0×3,4 м"
          ],
          [
            "Теплоизоляция",
            "UD от 0,73 W/(m²K)"
          ]
        ]
      },
      {
        "id": "mb-100gft",
        "name": "Aluprof MB-100GFT",
        "kind": "Коммерческие входы",
        "specs": [
          [
            "Ресурс",
            "1 000 000 циклов (класс 8)"
          ],
          [
            "Воздухопроницаемость",
            "класс 3 (600 Pa)"
          ]
        ]
      },
      {
        "id": "aluprof-panel-doors",
        "name": "Aluprof Panel Doors",
        "kind": "Входные панельные",
        "specs": [
          [
            "Теплоизоляция дверей",
            "UD от 0,63 W/(m²K)"
          ],
          [
            "Водонепроницаемость",
            "от класса E900"
          ]
        ]
      },
      {
        "id": "mb-79n-door",
        "name": "Aluprof MB-79N (двери)",
        "kind": "Тёплые входные",
        "specs": [
          [
            "Теплоизоляция профиля",
            "Uf от 0,83 W/(m²K)"
          ],
          [
            "Защита от взлома",
            "RC1–RC3"
          ]
        ]
      },
      {
        "id": "mb-86n",
        "name": "Aluprof MB-86N",
        "kind": "Крупноформатные окна",
        "specs": [
          [
            "Теплоизоляция окна",
            "Uw от 0,62 W/(m²K)"
          ],
          [
            "Водонепроницаемость",
            "класс E4800 Pa"
          ]
        ]
      },
      {
        "id": "mb-45s",
        "name": "Aluprof MB-45S",
        "kind": "Двери без терморазрыва",
        "specs": [
          [
            "Глубина профиля",
            "45 мм"
          ],
          [
            "Полотно",
            "до 2,4 × 1,25 м"
          ]
        ]
      }
    ]
  }
] as FacadeHubCardRu[];
