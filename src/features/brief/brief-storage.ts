import {
  isIndustryId,
  isServiceId,
  type ServiceId,
  type IndustryId,
} from '@/data/catalogue';

export const BRIEF_KEY = 'articcus.brief';
export interface BriefState {
  services: ServiceId[];
  industry: IndustryId | 'other' | '';
}
export const EMPTY_BRIEF: BriefState = { services: [], industry: '' };

export function parseBrief(raw: string | null): BriefState {
  try {
    const value: unknown = JSON.parse(raw || '{}');
    if (!value || typeof value !== 'object') return EMPTY_BRIEF;
    const data = value as Record<string, unknown>;
    return {
      services: Array.isArray(data.s)
        ? [...new Set(data.s.filter(isServiceId))]
        : [],
      industry: isIndustryId(data.i) || data.i === 'other' ? data.i : '',
    };
  } catch {
    return EMPTY_BRIEF;
  }
}

export function readBrief(): BriefState {
  try {
    return parseBrief(sessionStorage.getItem(BRIEF_KEY));
  } catch {
    return EMPTY_BRIEF;
  }
}

export function writeBrief(brief: BriefState) {
  try {
    sessionStorage.setItem(
      BRIEF_KEY,
      JSON.stringify({ s: brief.services, i: brief.industry }),
    );
  } catch {
    /* The in-memory brief still works when storage is blocked. */
  }
}
