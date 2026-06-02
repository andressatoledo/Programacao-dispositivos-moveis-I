import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'segredo';

interface TokenPayload {
  sub: string;
  role: string;
  email: string;
  alunoId?: string | null;
  professorId?: string | null;
}

export interface AuthRequest extends Request {
  user?: TokenPayload;
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, SECRET) as TokenPayload;
    req.user = decoded;
    console.log("Usuário autenticado:", req.user);
    return next();
  } catch {
    return res.status(401).json({ error: 'Token inválido' });
    
  }
}