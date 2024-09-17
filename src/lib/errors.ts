import axios, { AxiosError } from 'axios';

export function getErrorMessage(
  error: Error | AxiosError,
  defaultValue?: string
) {
  if (axios.isAxiosError(error)) {
    const errorMessage = Array.isArray(error.response?.data?.message)
      ? error.response?.data?.message[0]
      : error.response?.data?.message;

    return errorMessage || defaultValue || '';
  }

  if (error instanceof Error) {
    return error.message || defaultValue || 'Unexpected Error';
  }

  return defaultValue || 'Unexpected Error';
}