/**
 * RU versions of the catalog sections rendered by ProfileCategoryPage. Each list
 * mirrors the UK data file (same slugs, paths and images, Russian text); a group
 * without an entry here falls back to the UK list for sibling cards.
 */
import type { ProfileCategory, ProfileGroup } from '../profile-systems';
import { railingCategoriesRu } from './railing-catalog.ru';

export const ruCategoriesByGroup: Partial<Record<ProfileGroup, ProfileCategory[]>> = {
  railings: railingCategoriesRu
};
