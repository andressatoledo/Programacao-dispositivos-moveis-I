import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { ComboOption } from "../type/comboOption";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export class UsuarioController {

  /**
   * Lista todos os usuários
   */
  static async listar(req: Request, res: Response) {
    try {
      const usuarios = await prisma.usuario.findMany({
        orderBy: {
          usuarioCreatedAt: "desc",
        },
        select: {
          usuarioId: true,
          usuarioNome: true,
          usuarioEmail: true,
          usuarioRole: true,
          usuarioCreatedAt: true,
          usuarioUpdatedAt: true,
          // nunca retorna senha
        },
      });

      return res.json(usuarios);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao listar usuários",
      });
    }
  }

  /**
   * Busca usuário por ID
   */
  static async buscarPorId(req: Request, res: Response) {
    try {
      const id = String(req.params.id);

      const usuario = await prisma.usuario.findUnique({
        where: { usuarioId: id },
        select: {
          usuarioId: true,
          usuarioNome: true,
          usuarioEmail: true,
          usuarioRole: true,
          usuarioCreatedAt: true,
          usuarioUpdatedAt: true,
        },
      });

      if (!usuario) {
        return res.status(404).json({
          message: "Usuário não encontrado",
        });
      }

      return res.json(usuario);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao buscar usuário",
      });
    }
  }

  /**
   * Cria novo usuário com senha criptografada
   */
  static async criar(req: Request, res: Response) {
    try {
      const { usuarioNome, usuarioEmail, usuarioSenha, usuarioRole } = req.body;

      // validação básica
      if (!usuarioSenha) {
        return res.status(400).json({
          message: "Senha é obrigatória",
        });
      }

      const senhaHash = await bcrypt.hash(usuarioSenha, SALT_ROUNDS);

      const usuario = await prisma.usuario.create({
        data: {
          usuarioNome,
          usuarioEmail,
          usuarioSenha: senhaHash,
          usuarioRole,
        },
      });

      return res.status(201).json({
        usuarioId: usuario.usuarioId,
        usuarioNome: usuario.usuarioNome,
        usuarioEmail: usuario.usuarioEmail,
        usuarioRole: usuario.usuarioRole,
        usuarioCreatedAt: usuario.usuarioCreatedAt,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao criar usuário",
      });
    }
  }

  /**
   * Atualiza usuário (com hash se senha for enviada)
   */
  static async atualizar(req: Request, res: Response) {
    try {
      const id = String(req.params.id);
      const { usuarioNome, usuarioEmail, usuarioSenha, usuarioRole } = req.body;

      const data: any = {
        usuarioNome,
        usuarioEmail,
        usuarioRole,
      };

      // só re-hash se senha foi enviada
      if (usuarioSenha) {
        data.usuarioSenha = await bcrypt.hash(usuarioSenha, SALT_ROUNDS);
      }

      const usuario = await prisma.usuario.update({
        where: { usuarioId: id },
        data,
      });

      return res.json({
        usuarioId: usuario.usuarioId,
        usuarioNome: usuario.usuarioNome,
        usuarioEmail: usuario.usuarioEmail,
        usuarioRole: usuario.usuarioRole,
        usuarioUpdatedAt: usuario.usuarioUpdatedAt,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao atualizar usuário",
      });
    }
  }

  /**
   * Remove usuário
   */
  static async deletar(req: Request, res: Response) {
    try {
      const id = String(req.params.id);

      await prisma.usuario.delete({
        where: { usuarioId: id },
      });

      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao deletar usuário",
      });
    }
  }

  /**
   * Combo para selects (id + nome)
   */
  static async combo(req: Request, res: Response) {
    try {
      const usuarios = await prisma.usuario.findMany({
        select: {
          usuarioId: true,
          usuarioNome: true,
        },
        orderBy: {
          usuarioNome: "asc",
        },
      });

      const combo: ComboOption[] = usuarios.map((u) => ({
        value: u.usuarioId,
        label: u.usuarioNome,
      }));

      return res.json(combo);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao carregar combo de usuários",
      });
    }
  }
}