// EN/DE/ES hub texts by locale and page id (see hubs-config.ts for the shared photos/icons).
import type { IntlLocale } from '../../../i18n/intl-routes';
import type { HubCommon, HubCopy } from './types';
import { hubCommonEn, hubsEn } from './hubs-en';
import { hubCommonDe, hubsDe } from './hubs-de';
import { hubCommonEs, hubsEs } from './hubs-es';

export const hubCopy: Record<IntlLocale, Record<string, HubCopy>> = { en: hubsEn, de: hubsDe, es: hubsEs };
export const hubCommon: Record<IntlLocale, HubCommon> = { en: hubCommonEn, de: hubCommonDe, es: hubCommonEs };
