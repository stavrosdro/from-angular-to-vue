const activeRequests: { [s: string]: AbortController } = {};
const retries = 3;

export function get<T>(
  url: string,
  requestInit: RequestInit = { headers: { "Content-type": "application/json" } }
): Promise<T> {
  const config: RequestInit = {
    ...requestInit,
    method: "GET",
  };

  return fetchWrapper(url, config);
}

export function post(
  url: string,
  requestInit: RequestInit = { headers: { "Content-type": "application/json" } }
) {
  const config: RequestInit = {
    ...requestInit,
    method: "POST",
  };

  return fetchWrapper(url, config);
}

async function fetchWrapper(url: string, requestInit: RequestInit) {
  activeRequests[url]?.abort();

  const controller = new AbortController();
  activeRequests[url] = controller;

  let response: Response;
  let counter = 0;

  do {
    response = await fetch(url, {
      ...requestInit,
      signal: controller.signal,
    });

    if (response.ok) {
      counter = retries;
    } else {
      counter++;
    }
  } while (counter < retries);

  if (!response.ok) {
    const error = await response.text();
    return Promise.reject(JSON.parse(error));
  }

  delete activeRequests[url];
  return response.json();
}
