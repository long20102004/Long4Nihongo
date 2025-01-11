export async function apiFetch(url, options = {}) {
  const token = localStorage.getItem("jwt-token");
  const baseUrl = "http://localhost:8080";
  const finalUrl = url.startsWith("http") ? url : `${baseUrl}/${url}`;
  return fetch(finalUrl, {
    ...options,
    headers: {
      ...options.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  }).then((res) => res.json());
}
