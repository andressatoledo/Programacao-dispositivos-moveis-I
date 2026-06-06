import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { AlunoFormData, alunoSchema } from "../../schemas/aluno.schema";
import { AlunoService } from "../../services/alunoService";
import { ViaCepService } from "../../services/cepService";
import { IbgeService } from "../../services/localidadeService";

import { Mode } from "../../types/Outros/mode";
import { useCursoCombo } from "../Curso/useCursoCombo";
import { useScreenMode } from "../useScreenMode";

import { ComboOption } from "../../types/Outros/combo";

export function useAlunoForm(mode: Mode, alunoId?: string) {
  const screen = useScreenMode(mode);
  const { isCreate, setLoading } = screen;

  const { optionsCursos, loadingCursos } = useCursoCombo();

  const [optionsEstados, setOptionsEstados] = useState<ComboOption[]>([]);
  const [optionsCidades, setOptionsCidades] = useState<ComboOption[]>([]);

  const [loadingEstados, setLoadingEstados] = useState(false);
  const [loadingCidades, setLoadingCidades] = useState(false);

  const form = useForm<AlunoFormData>({
    resolver: zodResolver(alunoSchema),
    defaultValues: {
      alunoNome: "",
      alunoMatricula: "",
      cursoId: "",
      alunoEmail: "",
      alunoTelefone: "",
      alunoCep: "",
      alunoEndereco: "",
      alunoCidade: "",
      alunoEstado: "",
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const cep = watch("alunoCep");
  const estado = watch("alunoEstado");

  /**
   * Carrega estados
   */
  useEffect(() => {
    const loadEstados = async () => {
      setLoadingEstados(true);

      try {
        const estados = await IbgeService.buscarEstados();

        setOptionsEstados(estados);
      } catch (error) {
        console.warn("Erro ao carregar estados:", error);
      } finally {
        setLoadingEstados(false);
      }
    };

    loadEstados();
  }, []);

  /**
   * CEP -> ViaCEP + IBGE
   */
  useEffect(() => {
    const loadCep = async () => {
      const cepLimpo = cep?.replace(/\D/g, "");

      if (!cepLimpo || cepLimpo.length !== 8) {
        limparEndereco();
        return;
      }

      try {
        const data = await ViaCepService.buscarCep(cepLimpo);

        if (!data?.uf) {
          limparEndereco();
          return;
        }

        setValue("alunoEndereco", data.logradouro || "");

        const estadoEncontrado = await IbgeService.buscarEstadoPorSigla(
          data.uf,
        );

        if (!estadoEncontrado) {
          return;
        }

        setValue("alunoEstado", estadoEncontrado.value);

        const cidades = await IbgeService.buscarCidades(estadoEncontrado.value);

        setOptionsCidades(cidades);

        const cidadeEncontrada = cidades.find(
          (cidade) =>
            cidade.label.toLowerCase() === data.localidade.toLowerCase(),
        );

        if (cidadeEncontrada) {
          setValue("alunoCidade", cidadeEncontrada.value);
        }
      } catch (error) {
        limparEndereco();

        console.warn("Erro ao buscar CEP:", error);
      }
    };

    loadCep();
  }, [cep, setValue]);

  /**
   * Estado -> Cidades
   */
  useEffect(() => {
    const loadCidades = async () => {
      if (!estado) {
        setOptionsCidades([]);
        return;
      }

      setLoadingCidades(true);

      try {
        const cidades = await IbgeService.buscarCidades(estado);

        setOptionsCidades(cidades);
      } catch (error) {
        console.warn("Erro ao carregar cidades:", error);
      } finally {
        setLoadingCidades(false);
      }
    };

    loadCidades();
  }, [estado]);

  /**
   * Usuário mudou estado manualmente
   */
  const handleEstadoChange = async (estadoId: string) => {
    setValue("alunoEstado", estadoId);

    // limpa cidade antiga
    setValue("alunoCidade", "");

    setLoadingCidades(true);

    try {
      const cidades = await IbgeService.buscarCidades(estadoId);

      setOptionsCidades(cidades);
    } catch (error) {
      console.warn("Erro ao carregar cidades:", error);
    } finally {
      setLoadingCidades(false);
    }
  };

  /**
   * Limpar endereço caso CEP inválido
   */
  const limparEndereco = () => {
    setValue("alunoEndereco", "");
    setValue("alunoEstado", "");
    setValue("alunoCidade", "");

    setOptionsCidades([]);
  };

  /**
   * Create / Update
   */
  const saveAll = async (data: AlunoFormData) => {
    setLoading(true);

    try {
      if (isCreate) {
        await AlunoService.criar(data);
      } else if (alunoId) {
        await AlunoService.atualizar(alunoId, data);
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Carregar aluno para edição
   */
  useEffect(() => {
    if (!alunoId || isCreate) {
      return;
    }

    const carregarAluno = async () => {
      try {
        setLoading(true);

        const dados = await AlunoService.buscarPorId(alunoId);

        if (dados.alunoEstado) {
          const cidades = await IbgeService.buscarCidades(dados.alunoEstado);

          setOptionsCidades(cidades);
        }

        reset(dados);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    carregarAluno();
  }, [alunoId, isCreate, reset, setLoading]);

  return {
    control,
    errors,
    screen,
    handleSubmit,
    saveAll,

    optionsCursos,
    loadingCursos,

    optionsEstados,
    optionsCidades,

    loadingEstados,
    loadingCidades,

    estado,
    handleEstadoChange,
  };
}
