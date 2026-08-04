import tariffs from './tariffs.json';

export type CategoryKey = keyof typeof tariffs.categories;

export type PricingInput = {
  category: CategoryKey;
  widthMm: number;
  heightMm: number;
  manualAreaM2?: number;
  installation: boolean;
  deliveryUah?: number;
  modifiers?: number[];
  usdRateUah: number;
};

export type PricingResult = {
  areaM2: number;
  productUsd: number;
  installationUsd: number;
  subtotalUsd: number;
  productUah: number;
  installationUah: number;
  deliveryUah: number;
  totalUah: number;
  usdRateUah: number;
};

export function calculateAreaM2(
  widthMm: number,
  heightMm: number,
  manualAreaM2?: number
): number {
  if (manualAreaM2 && manualAreaM2 > 0) return manualAreaM2;
  return Math.max(0, widthMm / 1000) * Math.max(0, heightMm / 1000);
}

export function calculatePrice(input: PricingInput): PricingResult {
  const category = tariffs.categories[input.category];
  const areaM2 = calculateAreaM2(
    input.widthMm,
    input.heightMm,
    input.manualAreaM2
  );

  const modifier = (input.modifiers ?? []).reduce(
    (total, value) => total * (Number(value) || 1),
    1
  );

  const productUsd = areaM2 * category.productUsdM2 * modifier;
  const installationUsd =
    input.installation && category.installationEnabled
      ? areaM2 * category.installationUsdM2
      : 0;

  const subtotalUsd = productUsd + installationUsd;
  const productUah = productUsd * input.usdRateUah;
  const installationUah = installationUsd * input.usdRateUah;
  const deliveryUah = Number(input.deliveryUah ?? tariffs.defaults.deliveryUah);
  const totalUah = productUah + installationUah + deliveryUah;

  return {
    areaM2,
    productUsd,
    installationUsd,
    subtotalUsd,
    productUah,
    installationUah,
    deliveryUah,
    totalUah,
    usdRateUah: input.usdRateUah,
  };
}
