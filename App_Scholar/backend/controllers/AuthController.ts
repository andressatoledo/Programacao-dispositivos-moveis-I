import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import { AuthRequest } from "../middlewares/authMiddleware";

const SECRET: string = process.env.JWT_SECRET as string;

if (!SECRET) {
  throw new Error("JWT_SECRET não configurado no ambiente");
}

export class AuthController {
  /**
   * LOGIN
   */
  static async login(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({
          error: "Email e senha são obrigatórios",
        });
      }

      const usuario = await prisma.usuario.findUnique({
        where: { usuarioEmail: email },
      });

      if (!usuario) {
        return res.status(401).json({
          error: "Credenciais inválidas",
        });
      }

      const senhaValida = await bcrypt.compare(senha, usuario.usuarioSenha);

      if (!senhaValida) {
        return res.status(401).json({
          error: "Credenciais inválidas",
        });
      }

      const token = jwt.sign(
        {
          sub: usuario.usuarioId,
          role: usuario.usuarioRole,
          email: usuario.usuarioEmail,
          alunoId: usuario.alunoId,
          professorId: usuario.professorId,
        },
        SECRET,
        {
          expiresIn: "1d",
        },
      );

      return res.json({
        token,
        usuario: {
          id: usuario.usuarioId,
          nome: usuario.usuarioNome,
          email: usuario.usuarioEmail,
          role: usuario.usuarioRole,
          alunoId: usuario.alunoId,
          professorId: usuario.professorId,
        },
      });
    } catch (error) {
      console.error("Erro no login:", error);
      return res.status(500).json({
        error: "Erro interno no login",
      });
    }
  }

  /**
   * REGISTRO
   */
  static async registrar(req: Request, res: Response) {
    try {
      const { usuarioNome, usuarioEmail, usuarioSenha, usuarioRole } = req.body;

      if (!usuarioNome || !usuarioEmail || !usuarioSenha) {
        return res.status(400).json({
          error: "Nome, email e senha são obrigatórios",
        });
      }

      const usuarioExistente = await prisma.usuario.findUnique({
        where: { usuarioEmail },
      });

      if (usuarioExistente) {
        return res.status(409).json({
          error: "Email já está em uso",
        });
      }

      const hash = await bcrypt.hash(usuarioSenha, 10);

      const usuario = await prisma.usuario.create({
        data: {
          usuarioNome,
          usuarioEmail,
          usuarioSenha: hash,
          usuarioRole: usuarioRole ?? "aluno",
        },
      });

      return res.status(201).json({
        id: usuario.usuarioId,
        nome: usuario.usuarioNome,
        email: usuario.usuarioEmail,
        role: usuario.usuarioRole,
        alunoId: usuario.alunoId,
        professorId: usuario.professorId,
      });
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      return res.status(500).json({
        error: "Erro interno ao registrar usuário",
      });
    }
  }

  /**
   * MUDAR SENHA
   */
  static async mudarSenha(req: AuthRequest, res: Response) {
  
    const usuarioId = req.user?.sub;
    console.log(req.body);
    const { senhaAtual, novaSenha } = req.body;

    const usuario = await prisma.usuario.findUnique({
      where: { usuarioId },
    });

    
    if (!usuario) {
      return res.status(400).json({
        message: "Senha atual inválida",
      });
    }
   
    const senhaValida = await bcrypt.compare(senhaAtual, usuario.usuarioSenha);

   
    if (!senhaValida) {
      return res.status(400).json({
        message: "Senha atual inválida",
      });
    }
   
    const senhaHash = await bcrypt.hash(novaSenha, 10);

    await prisma.usuario.update({
      where: { usuarioId },

      data: {
        usuarioSenha: senhaHash,
      },
    });

    return res.json({
      message: "Senha alterada",
    });
  }
}
