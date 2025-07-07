import { registerLicense } from "@syncfusion/ej2-base";

export function setupSyncfusionLicense() {
  const licenseKey = import.meta.env.VITE_SYNCFUSION_LICENSE_KEY;

  if (!licenseKey) {
    console.warn("⚠️ Syncfusion license key is missing!");
  } else {
    registerLicense(licenseKey);
  }
}