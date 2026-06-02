import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/src/contexts/Theme/themeContext';
import { Boletim } from '@/src/types/boletim';
import { Styles } from './styles';

interface CardBoletimProps {
  item: Boletim;
}

export const CardBoletim = ({ item }: CardBoletimProps) => {
  const { theme } = useTheme();
  const styles = Styles(theme);

 
  const getStatusConfig = (status: string) => {
  switch (status) {
    case 'Aprovado':
      return { 
        color: theme.colors.success, 
        bg: `${theme.colors.success}20` 
      };

    case 'Reprovado':
      return { 
        color: theme.colors.error, 
        bg: `${theme.colors.error}20` 
      };

    case 'Em Recuperação':
      return { 
        color: theme.colors.warning, 
        bg: `${theme.colors.warning}20` 
      };

    default:
      return { 
        color: theme.colors.text, 
        bg: theme.colors.backgroundStatus 
      };
  }
};

  const config = getStatusConfig(item.boletimSituacao || '');
  const progress = (item.boletimMedia || 0) / 10;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.disciplina}>{item.disciplina.disciplinaNome}</Text>
        <View style={[styles.badge, { backgroundColor: config.bg }]}>
          <Text style={[styles.badgeText, { color: config.color }]}>
            {item.boletimSituacao}
          </Text>
        </View>
      </View>

      <View style={styles.row}>
        <NotaBox label="Nota 1" value={item.boletimNota1} styles={styles} />
        <NotaBox label="Nota 2" value={item.boletimNota2} styles={styles} />
        <NotaBox label="Média" value={item.boletimMedia || 0} isMedia styles={styles} />
      </View>

      <View style={styles.progressBg}>
        <View 
          style={[
            styles.progressFill, 
            { width: `${progress * 100}%`, backgroundColor: config.color }
          ]} 
        />
      </View>
    </View>
  );
};

const NotaBox = ({ label, value, isMedia, styles }: any) => (
  <View style={[styles.notaBox, isMedia && styles.mediaBox]}>
    <Text style={[styles.notaValue, isMedia && styles.mediaValue]}>
      {Number(value).toFixed(1)}
    </Text>
    <Text style={[
  styles.notaLabel, 
  isMedia && styles.mediaLabel
]}>
  {label}
</Text>
  </View>
);