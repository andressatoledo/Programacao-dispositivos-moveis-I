export interface Aviso {
  avisoId?: string;

  avisoTitulo: string;

  avisoMensagem: string;

  avisoAtivo: boolean;

  criadoPorId: string;

  cursoId?: string | null;

  disciplinaId?: string | null;

  criadoPor?: {
    usuarioId: string;
    usuarioNome: string;
  };

  curso?: {
    cursoId: string;
    cursoNome: string;
  };

  disciplina?: {
    disciplinaId: string;
    disciplinaNome: string;
  };

  avisoCreatedAt?: string;
}

export interface AvisoFiltro {
  avisoTitulo?: string;

  cursoId?: string;

  disciplinaId?: string;

  avisoAtivo?: boolean;
}

export interface AvisoNaoLidoResponse
  extends Aviso {}

export interface AvisoContadorResponse {
  quantidade: number;
}