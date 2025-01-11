export async function apiFetch(url, options = {}) {
  const baseUrl = "";
  const finalUrl = url.startsWith("http") ? url : `${baseUrl}/${url}`;

  const response = await fetch(finalUrl, {
    ...options,
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json();
}
