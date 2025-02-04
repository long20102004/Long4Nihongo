export async function apiFetch(url, options = {}) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const finalUrl = url.startsWith("http") ? url : `${baseUrl}/${url}`;
  const { method = "GET", ...restOptions } = options;
  const response = await fetch(finalUrl, {
    method,
    credentials: "include",
    ...restOptions,
  });
  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  } else return response;
}
