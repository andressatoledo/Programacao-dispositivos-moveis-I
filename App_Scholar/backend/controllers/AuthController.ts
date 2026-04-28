import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";

const SECRET = process.env.JWT_SECRET || "default_secret";

export class AuthController {

  static async login(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;

      const usuario = await prisma.usuario.findUnique({
        where: { usuarioEmail: email }, // ✅ CORRIGIDO
      });

      if (!usuario) {
        return res.status(401).json({ error: "Usuário não encontrado" });
      }

      const senhaValida = await bcrypt.compare(
        senha,
        usuario.usuarioSenha // ✅ CORRIGIDO
      );

      if (!senhaValida) {
        return res.status(401).json({ error: "Senha inválida" });
      }

      const token = jwt.sign(
        {
          id: usuario.usuarioId,     // ✅ CORRIGIDO
          role: usuario.usuarioRole // ✅ CORRIGIDO
        },
        SECRET,
        { expiresIn: "1d" }
      );

      return res.json({
        token,
        usuario: {
          nome: usuario.usuarioNome,     // ✅ CORRIGIDO
          role: usuario.usuarioRole,     // ✅ CORRIGIDO
        },
      });

    } catch (error) {
      console.error("❌ Erro no login:", error);
      return res.status(500).json({ error: "Erro ao realizar login" });
    }
  }

  static async registrar(req: Request, res: Response) {
    try {
      const { senha, ...resto } = req.body;

      const hash = await bcrypt.hash(senha, 10);

      const usuario = await prisma.usuario.create({
        data: {
          ...resto,
          usuarioSenha: hash, // ✅ CORRIGIDO
        },
      });

      return res.status(201).json(usuario);

    } catch (error) {
      console.error("❌ Erro ao registrar usuário:", error);
      return res.status(500).json({ error: "Erro ao registrar usuário" });
    }
  }
}