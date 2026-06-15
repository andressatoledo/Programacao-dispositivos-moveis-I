import express from 'express';
import cors from 'cors';

import { errorMiddleware } from "./middlewares/errorMiddleware";

import alunoRoutes from './routes/alunoRoutes';
import professorRoutes from './routes/professorRoutes';
import cursoRoutes from './routes/cursoRoutes';
import disciplinaRoutes from './routes/disciplinaRoutes';
import boletimRoutes from './routes/boletimRoutes';
import authRoutes from './routes/authRoutes';
import usuarioRoutes from './routes/usuarioRoutes';
import dashboardRoutes from './routes/dashboardRoutes';
import semestreRoutes from './routes/semestreRoutes';
import avisoRoutes from './routes/avisoRoutes';

const app = express();

app.use(cors());

app.use(express.json());
app.use('/api/avisos', avisoRoutes);
app.use('/api/alunos', alunoRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/professores', professorRoutes);
app.use('/api/cursos', cursoRoutes);
app.use('/api/disciplinas', disciplinaRoutes);
app.use('/api/boletins', boletimRoutes);
app.use('/api/auth', authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/semestres", semestreRoutes);
app.use(errorMiddleware);


export default app;