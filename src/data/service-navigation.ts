export interface ServiceNavigationItem {
  label: string;
  href: string;
}

/**
 * Головні комерційні напрямки душових конструкцій.
 * Цей список спільний для сторінки послуг і Footer, щоб назви,
 * кількість та посилання в обох блоках завжди збігалися.
 */
export const showerServiceNavigation: ServiceNavigationItem[] = [
  { label: 'Душові піддони', href: '/catalog/dushovi-piddony/' },
  { label: 'Кутова душова кабіна', href: '/dushovi-kabiny/kutovi/' },
  { label: 'Двері для душу', href: '/dushovi-kabiny/dushovi-dveri/' },
  { label: 'Перегородка для душу', href: '/poslugy/dushovi-konstruktsii/perehorodka-dlia-dushu/' },
  { label: 'Скляна шторка для ванни', href: '/dushovi-kabiny/shtorky-dlia-vanny/' }
];
