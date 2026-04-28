import { Request, Response, NextFunction } from "express";
import { handlePrismaError } from "../utils/prismaErrorHandler";

export function errorMiddleware(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("❌ ERRO GLOBAL:", error);

  const handled = handlePrismaError(error);

  return res.status(handled.status).json({
    error: handled.message,
  });
}