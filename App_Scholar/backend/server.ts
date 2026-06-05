import 'dotenv/config';
import app from './app';
import { prisma } from './lib/prisma';

const PORT = 3001;

async function startServer() {
  try {
    // 🔌 testa conexão com banco
    await prisma.$connect();
    console.log('Banco conectado com sucesso');

    app.listen(PORT, "0.0.0.0", () => {
    console.log("Servidor rodando na porta 3000");
  });

  } catch (error) {
    console.error('Erro ao conectar no banco:', error);
    process.exit(1);
  }
}

startServer();