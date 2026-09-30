
export const REQUEST_STEP_TITLES = [
  "Property Details",
  "Site access & conditions",
  "Services",
  "Schedule",
] as const;

/** Total number of steps in the New Request wizard. */
export const TOTAL_REQUEST_STEPS = REQUEST_STEP_TITLES.length;

/** Query-string key that carries the active wizard step. */
export const REQUEST_STEP_QUERY_KEY = "step";

/** Clamp any number to a valid wizard step (1 … TOTAL_REQUEST_STEPS). */
export const clampRequestStep = (step: number): number => {
  if (!Number.isFinite(step)) return 1;
  return Math.min(Math.max(Math.trunc(step), 1), TOTAL_REQUEST_STEPS);
};

/** Read a `?step=` search param safely — invalid values fall back to step 1. */
export const parseStepParam = (value?: string | string[] | null): number => {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number.parseInt(raw ?? "", 10);

  return Number.isNaN(parsed) ? 1 : clampRequestStep(parsed);
};

/** Build the URL that represents a given step on the current pathname. */
export const requestStepUrl = (pathname: string, step: number): string =>
  `${pathname}?${REQUEST_STEP_QUERY_KEY}=${clampRequestStep(step)}`;
