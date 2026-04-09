export const lightTheme = {
  mode: 'light',
  colors: {
    background: '#FFF5F7', 
    surface: '#FFFFFF',
    
    primary: '#8B1E3F',
    detail: '#B23A48', 
    destaque: '#5A0F24', 
    
    text: '#2A0E12',
    opaco: '#8A6B73',

    success: '#2E7D32',
    error: '#C62828',
    warning: '#ED6C02',

    activeTab: '#FDECEF',
    inactiveTab: '#9ca3af',

    backgroundCard: '#faf1f1',
    backgroundCardDestaque: '#8B1E3F1A',
    space: '#F3DDE2',
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
    background: '#14080B', // quase preto com vinho
    surface: '#0a0506',

    primary: '#5A0F24', // vinho mais vivo no dark
    detail: '#8B1E3F',
    destaque: '#5A0F24',

    text: '#F5E9EC',
    opaco: '#A88A91',

    success: '#235025',
    error: '#EF5350',
    warning: '#FFA726',

    activeTab: '#8B1E3F',
    inactiveTab: '#9ca3af',

    backgroundCard: '#1E0F14',
    backgroundCardDestaque: '#B23A4833',
    space: '#2A141A',

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