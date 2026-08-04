export function calculateAreaM2(widthMm, heightMm, manualAreaM2) {
  if (Number(manualAreaM2) > 0) return Number(manualAreaM2);
  return Math.max(0, Number(widthMm) / 1000) *
    Math.max(0, Number(heightMm) / 1000);
}

export function calculatePrice({
  widthMm,
  heightMm,
  manualAreaM2,
  productUsdM2,
  installationUsdM2,
  installation,
  modifiers = [],
  usdRateUah,
  deliveryUah = 0,
}) {
  const areaM2 = calculateAreaM2(widthMm, heightMm, manualAreaM2);
  const modifier = modifiers.reduce(
    (total, value) => total * (Number(value) || 1),
    1
  );

  const productUsd = areaM2 * Number(productUsdM2) * modifier;
  const installationUsd = installation
    ? areaM2 * Number(installationUsdM2)
    : 0;

  return {
    areaM2,
    modifier,
    productUsd,
    installationUsd,
    subtotalUsd: productUsd + installationUsd,
    productUah: productUsd * usdRateUah,
    installationUah: installationUsd * usdRateUah,
    deliveryUah: Number(deliveryUah),
    totalUah:
      (productUsd + installationUsd) * usdRateUah + Number(deliveryUah),
    usdRateUah,
  };
}
