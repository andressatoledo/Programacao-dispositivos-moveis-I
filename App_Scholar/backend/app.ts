import express from 'express';
import cors from 'cors';

import { errorMiddleware } from "./middlewares/errorMiddleware";

import alunoRoutes from './routes/alunoRoutes';
import professorRoutes from './routes/professorRoutes';
import cursoRoutes from './routes/cursoRoutes';
import disciplinaRoutes from './routes/disciplinaRoutes';
import boletimRoutes from './routes/boletimRoutes';
import authRoutes from './routes/authRoutes';

const app = express();

app.use(express.json());

app.use('/alunos', alunoRoutes);
app.use('/professores', professorRoutes);
app.use('/cursos', cursoRoutes);
app.use('/disciplinas', disciplinaRoutes);
app.use('/boletins', boletimRoutes);
app.use('/auth', authRoutes);

app.use(cors());
app.use(errorMiddleware);

export default app;