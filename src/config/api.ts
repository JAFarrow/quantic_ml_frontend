const DEFAULT_API_PATH = "/api";

const envHost = import.meta.env.VITE_API_BASE_URL?.trim();

export const apiBaseUrl = envHost && envHost.length > 0 ? `${envHost}${DEFAULT_API_PATH}` : DEFAULT_API_PATH;

export const buildApiUrl = (segment: string) => {
  const path = segment.startsWith("/") ? segment : `/${segment}`;
  return `${apiBaseUrl}${path}`;
};

export const insertEndpoint = buildApiUrl("/insert");
export const uploadEndpoint = buildApiUrl("/upload");
