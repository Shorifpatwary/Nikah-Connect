// Type for the successful response (status code 200)
export interface ResponseDataType {
  data: {
    name: string;
    email: string;
    phone: string;
    updated_at: string;
    created_at: string;
    id: number;
    message?: string;
    errors?: Record<string, string[]>;
  };
  status: number;
  statusText: string;
}
