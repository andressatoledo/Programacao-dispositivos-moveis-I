import { CardCadastro } from '../../src/components/CardCadastros';
import { Form } from '../../src/components/Form/Form';

export function Cadastros() {
  return (
    <Form title="Cadastros">
      <CardCadastro
        icon="fuel"
        title="Abastecimentos"
        subtitle="Abastecimentos realizados"
        count={10}
         routeName='Curso'
      />
      <CardCadastro
        icon="truck"
        title="Caminhões"
        subtitle="Frota de veículos"
        count={1}
         routeName='Curso'
      />
      <CardCadastro
        icon="weight"
        title="Cargas"
        subtitle="Tipos de cargas"
        count={3}
        routeName='Curso'
      />
     
    </Form>
  );
}
