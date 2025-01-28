export default function getMockFetchImplementation<T>(jsonPayload: T) {
  return async () => {
    const mockFetchResponse = {
      ok: true,
      async json() {
        return jsonPayload;
      },
    };
    return mockFetchResponse;
  };
}
