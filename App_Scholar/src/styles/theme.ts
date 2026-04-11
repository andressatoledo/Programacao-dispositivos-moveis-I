export const lightTheme = {
  mode: 'light',
  colors: {
    background: '#F8FAFC', // cinza bem leve (mais moderno que rosinha)
    surface: '#FFFFFF',

    primary: '#4F46E5', // azul/roxo moderno (indigo)
    detail: '#6366F1', 
    destaque: '#3730A3',

    text: '#0F172A', // preto suave (melhor leitura)
    opaco: '#64748B',

    success: '#16A34A',
    error: '#DC2626',
    warning: '#F59E0B',

    activeTab: '#EEF2FF',
    inactiveTab: '#94A3B8',

    backgroundCard: '#FFFFFF',
    backgroundCardDestaque: '#4F46E51A',

    space: '#E2E8F0',
    backgroundStatus: '#00000010',
  },

  sizes: {
    iconSize: 30,
    iconSizeCard: 16,
    iconSizeValueCard: 18,

    header: { fontSize: 56 },
    subHeader: { fontSize: 32 },
    title: { fontSize: 24, fontWeight: '600', marginBottom: 16 },
    subtitle: { fontSize: 20 },

    secundario: { fontSize: 18 },
    text: { fontSize: 16 },
    smallText: { fontSize: 14 },
    mediumText: { fontSize: 16 },
    largeText: { fontSize: 22 },

    inputHeight: { height: 48 },
    buttonHeight: { height: 48 },
  },
} as const;


export const darkTheme = {
  mode: 'dark',
  colors: {
    background: '#020617', // preto azulado (MUITO mais bonito)
    surface: '#020617',

    primary: '#6366F1', // mais vivo no dark
    detail: '#818CF8',
    destaque: '#4F46E5',

    text: '#E2E8F0',
    opaco: '#94A3B8',

    success: '#22C55E',
    error: '#EF4444',
    warning: '#FBBF24',

    activeTab: '#1E1B4B',
    inactiveTab: '#64748B',

    backgroundCard: '#0F172A',
    backgroundCardDestaque: '#6366F133',

    space: '#1E293B',
    backgroundStatus: '#FFFFFF10',
  },

  sizes: {
    iconSize: 30,
    iconSizeCard: 16,
    iconSizeValueCard: 18,

    header: { fontSize: 56 },
    subHeader: { fontSize: 32 },
    title: { fontSize: 24, fontWeight: '600', marginBottom: 16 },
    subtitle: { fontSize: 20 },

    secundario: { fontSize: 18 },
    text: { fontSize: 16 },
    smallText: { fontSize: 14 },
    mediumText: { fontSize: 16 },
    largeText: { fontSize: 22 },

    inputHeight: { height: 48 },
    buttonHeight: { height: 48 },
  },
} as const;