export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";

interface UseFetchResponse<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
  isComplete: boolean;
}
