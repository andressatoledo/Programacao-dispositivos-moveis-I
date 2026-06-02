export interface EstadoIBGE {
  id: number;
  sigla: string;
  nome: string;
}

export interface CidadeIBGE {
  id: number;
  nome: string;
}

export class IbgeService {

  /**
   * Lista todos os estados do Brasil
   */
  static async listarEstados(): Promise<EstadoIBGE[]> {
    const response = await fetch(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
    );

    const data = await response.json();

    return data.map((estado: any) => ({
      id: estado.id,
      sigla: estado.sigla,
      nome: estado.nome,
    }));
  }

  /**
   * Lista cidades por UF (SP, RJ, etc)
   */
  static async listarCidades(uf: string): Promise<CidadeIBGE[]> {
    const response = await fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
    );

    const data = await response.json();

    return data.map((cidade: any) => ({
      id: cidade.id,
      nome: cidade.nome,
    }));
  }
}