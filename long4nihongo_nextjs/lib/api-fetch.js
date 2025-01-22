export async function apiFetch(url, options = {}) {
  const baseUrl = "http://20.239.232.148:8080";
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
