// import { useEffect, useState } from 'react';
// import { Estado, Cidade, LocalidadeService } from '../../services/localidadeService';
// import { ComboOption } from '@/src/types/Outros/ComboOption';

// export function useLocalidade() {

//   const [estados, setEstados] = useState<ComboOption[]>([]);
//     const [cidades, setCidades] = useState<ComboOption[]>([]);

//   const carregarEstados = async () => {
//   const data = await LocalidadeService.listarEstados();
//   setEstados(data);
// };

// const carregarCidades = async (estadoId: number) => {
//   const data = await LocalidadeService.listarCidades(estadoId);
//   setCidades(data);
// };

//   useEffect(() => {
//     carregarEstados();
//   }, []);

//   return {
//     estados,
//     cidades,
//     loadingEstados,
//     loadingCidades,
//     carregarCidades,
//   };
// }