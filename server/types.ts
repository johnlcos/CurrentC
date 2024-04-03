export interface ServerError {
  status: number;
  message: {
    error: string;
  };
}
