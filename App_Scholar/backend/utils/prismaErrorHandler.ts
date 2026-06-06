import { Prisma } from "@prisma/client";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";

const fieldLabels: Record<string, string> = {
  alunoMatricula: "Matrícula",
  alunoEmail: "E-mail",
  alunoNome: "Nome",
  professorEmail: "E-mail do professor",
  usuarioEmail: "E-mail",
};

function getFieldLabel(field: string): string {
  return fieldLabels[field] || field;
}

export function handlePrismaError(error: unknown) {


  if (error instanceof PrismaClientKnownRequestError) {

    switch (error.code) {

      case "P2002": {
        const fields = error.meta?.target as string[] | undefined;

        const readableFields = fields?.map(getFieldLabel).join(", ");

        return {
          status: 409,
          message: `${readableFields} já está em uso`,
        };
      }

      case "P2003":
        return {
          status: 400,
          message: "Violação de chave estrangeira (relacionamento inválido)",
        };

      case "P2025":
        return {
          status: 404,
          message: "Registro não encontrado",
        };

      default:
        return {
          status: 400,
          message: "Erro de banco de dados",
        };
    }
  }


  if (error instanceof PrismaClientValidationError) {
    return {
      status: 400,
      message: "Dados inválidos enviados",
    };
  }


  return {
    status: 500,
    message: "Erro interno do servidor",
  };
}