const fs = require('fs');
const path = require('path');

const entityName = process.argv[2];

if (!entityName) {
  console.log('❌ Informe a entidade');
  process.exit(1);
}

const Entity = capitalize(entityName);

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// 🔥 CONFIG DAS ENTIDADES
const entities = {
  aluno: {
    fields: {
      alunoNome: 'string',
      alunoMatricula: 'string',
      cursoID: 'combo:curso',
      alunoEmail: 'email',
      alunoTelefone: 'string',
      alunoCEP:'string',
      alunoEndereco:'string',
      alunoCidade:'string',
      AlunoEstado:'combo:estados',
    },
    list: {
      title: 'alunoNome',
      description: ['alunoEmail', 'alunoMatricula'],
    },
  },

  professor: {
    fields: {
      professorNome: 'string',
      professorTitulacao: 'string',
      professorAreaAtuacao: 'string',
      professorTempoDocencia: 'number',
      professorEmail: 'email',
    },
    list: {
      title: 'professorNome',
      description: ['professorEmail'],
    },
  },

  curso: {
    fields: {
      cursoNome: 'string',
      cursoPeriodo: ['Manhã', 'Tarde', 'Noite', 'Integral'],
    },
    list: {
      title: 'cursoNome',
      description: ['cursoPeriodo'],
    },
  },

  disciplina: {
    fields: {
      disciplinaNome: 'string',
      disciplinaCargaHoraria: 'number',
      professorID: 'combo:professor',
      cursoID: 'combo:curso',
      disciplinaSemestre:'number',
    },
    list: {
      title: 'disciplinaNome',
      description: ['disciplinaCargaHoraria'],
    },
  },

   boletim: {
    fields: {
      alunoID: 'combo:aluno',
      disciplinaID: 'combo:disciplina',
      boletimNota1: 'number',
      boletimNota2: 'number',
      boletimMedia: 'number',
      boletimSituacao: ['Aprovado', 'Reprovado', 'Em Recuperacao'],
    },
    list: {
      title: 'alunoID',
      description: ['boletimSituacao'],
    },
  },
};

const config = entities[entityName];

// ----------------------
// 🧠 HELPERS
// ----------------------

function zodType(type) {
  if (Array.isArray(type)) {
    return `z.enum([${type.map(v => `'${v}'`).join(', ')}])`;
  }
  if (type === 'email') return `z.string().email()`;
  if (type === 'number') return `z.number()`;
  return `z.string()`;
}

function isCombo(type) {
  return typeof type === 'string' && type.startsWith('combo:');
}

// ----------------------
// 📄 SCHEMA
// ----------------------

function generateSchema() {
  const fields = Object.entries(config.fields)
    .map(([k, t]) => `  ${k}: ${zodType(t)},`)
    .join('\n');

  return `
import { z } from 'zod';

export const ${entityName}Schema = z.object({
${fields}
});

export type ${Entity}FormData = z.infer<typeof ${entityName}Schema>;
`;
}

// ----------------------
// 📄 SERVICE
// ----------------------

function generateService() {
  return `
import { api } from './api';

const ENDPOINT = '/${entityName}s';

export const ${Entity}Service = {
  buscarTodas: async (filtro) => (await api.get(ENDPOINT, { params: filtro })).data,
  buscarPorId: async (id) => (await api.get(\`\${ENDPOINT}/\${id}\`)).data,
  buscarCombo: async () => (await api.get(\`\${ENDPOINT}/combo\`)).data,
  criar: async (data) => (await api.post(ENDPOINT, data)).data,
  atualizar: async (id, data) => (await api.put(\`\${ENDPOINT}/\${id}\`, data)).data,
  excluir: async (id) => api.delete(\`\${ENDPOINT}/\${id}\`),

};
`;
}

// ----------------------
// 🪝 HOOK FORM
// ----------------------

function generateHookForm() {
  return `
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ${entityName}Schema } from '../../../schemas/${entityName}.schema';
import { ${Entity}Service } from '../../../services/${Entity}Service';

export function use${Entity}Form() {
  const form = useForm({
    resolver: zodResolver(${entityName}Schema),
  });

  const save = async (data) => {
    await ${Entity}Service.criar(data);
  };

  return { ...form, save };
}
`;
}

// ----------------------
// 🧾 FORM UI
// ----------------------

function generateForm() {
  const inputs = Object.entries(config.fields)
    .map(([key, type]) => {
      if (isCombo(type)) {
        return `
<Controller
  control={control}
  name="${key}"
  render={({ field }) => (
    <InputCombo
      label="${key}"
      value={field.value}
      onChange={field.onChange}
    />
  )}
/>`;
      }

      return `
<Controller
  control={control}
  name="${key}"
  render={({ field }) => (
    <InputField
      label="${key}"
      value={field.value}
      onChangeText={field.onChange}
    />
  )}
/>`;
    })
    .join('\n');

  return `
import { Controller } from 'react-hook-form';
import { InputField } from '../../components/Form/InputField';
import { InputCombo } from '../../components/Form/InputCombo';
import { Button } from '../../components/Form/Button';
import { Form } from '../../components/Form/Form';
import { use${Entity}Form } from '../../hooks/${Entity}/use${Entity}Form';

export function ${Entity}Form() {
  const { control, handleSubmit, save } = use${Entity}Form();

  return (
    <Form>
      ${inputs}

      <Button
          label={mode === 'create' ? 'Salvar' : 'Atualizar'}
          onPress={handleSubmit(
            data => {
              console.log('SUCESSO', data);
              onSubmitFinal(data);
            },
            errinhos => {
              console.log('ERROS', errinhos);
            },
          )}
          marginTop={2}
        />
    </Form>
  );
}
`;
}

// ----------------------
// 📦 CARTEIRA
// ----------------------

function generateCarteira() {
  return `
import { View } from 'react-native';
import { useEffect } from 'react';
import { use${Entity} } from '../../hooks/${Entity}/use${Entity}';
import { Carteira, CarteiraItem } from '../../components/Form';

export function ${Entity}() {
  const { dados, buscarCarteira } = use${Entity}();

  useEffect(() => {
    buscarCarteira();
  }, []);

  return (
    <View>
      <Carteira title="${Entity}">
        {dados.map(item => (
          <CarteiraItem
            key={item.id}
            title={item.${config.list.title}}
            description={${config.list.description.map(d => `item.${d}`).join(' + " • " + ')}}
          />
        ))}
      </Carteira>
    </View>
  );
}
`;
}

// ----------------------
// 💾 WRITE
// ----------------------

function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
  console.log('✅', file);
}

// ----------------------
// 🚀 EXEC
// ----------------------

write(`src/schemas/${entityName}.schema.ts`, generateSchema());
write(`src/services/${Entity}Service.ts`, generateService());
write(`src/hooks/${Entity}/use${Entity}Form.ts`, generateHookForm());
write(`src/screens/${Entity}/${Entity}Form.tsx`, generateForm());
write(`src/screens/${Entity}/${Entity}.tsx`, generateCarteira());

console.log(`\n🔥 CRUD FULL de ${Entity} gerado com sucesso!`);