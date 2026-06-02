// export function getErrorMessage(error: any): string {
//   return (
//     error?.response?.data?.message ||
//     error?.response?.data?.error ||
//     error?.message ||
//     "Erro inesperado. Tente novamente."
//   );
// }

// import axios from "axios";
import {isAxiosError} from "axios";

export function getErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    return (
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Erro ao processar solicitação."
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Ocorreu um erro inesperado.";
}