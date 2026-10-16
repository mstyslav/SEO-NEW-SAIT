// EN/DE/ES project case texts by locale and case id (src/i18n/intl-routes.ts → INTL_CASES).
import type { IntlLocale } from '../../../i18n/intl-routes';
import type { CaseCopy, CaseLabels } from './types';
import { caseLabelsEn, casesEn } from './cases-en';
import { caseLabelsDe, casesDe } from './cases-de';
import { caseLabelsEs, casesEs } from './cases-es';

export const caseCopy: Record<IntlLocale, Record<string, CaseCopy>> = { en: casesEn, de: casesDe, es: casesEs };
export const caseLabels: Record<IntlLocale, CaseLabels> = { en: caseLabelsEn, de: caseLabelsDe, es: caseLabelsEs };
