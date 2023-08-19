module.exports = {
  important: true,
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  
  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
        '16': 'repeat(16, minmax(0, 1fr))',

        // Complex site-specific column configuration
        '4-custom': '1fr 200px 150px 20px',
        '4-custom1': '100px 1fr 100px 20px',
        '3-custom1': '20px 1fr 20px',

      },

      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        filled: '#ff9933',
        silver: '#ecebff',
        white: '#FFF',
        black: '#000',
        hover: '#00867D',
        default: '#D4D5D9',
        // Primary colors
        // Primary/ colors
        'primary-1': '#ff9933',
        'primary-2': '#C7EBE9',
        'primary-3': '#8CD6D1',
        'primary-4': '#4CBFB8',
        'primary-5': '#00A499',
        'primary-6': '#00867D',
        'primary-7': '#00685E',
        'primary-8': '#005149',
        'primary-9': '#003B35',
        'primary-10': '#002B27',
        // Neutral colors
        'neutral-1': '#FFFFFF',
        'neutral-2': '#606060',
        'neutral-3': '#EBECF0',
        'neutral-4': '#D4D5D9',
        'neutral-5': '#BBBCBF',
        'neutral-6': '#8A8B8C',
        'neutral-7': '#575859',
        'neutral-8': '#414142',
        'neutral-9': '#2A2A2B',
        'neutral-10': '#000D0B',
        // Process colors
        'process-1': '#E5F3F8',
        'process-2': '#C7E5EF',
        'process-3': '#8CCADE',
        'process-4': '#4CACCC',
        'process-5': '#0089B6',
        'process-6': '#007094',
        'process-7': '#005772',
        'process-8': '#004558',
        'process-9': '#00323E',
        'process-10': '#00262D',
        // Secondary colors
        'secondary-1': '#FFF8E8',
        'secondary-2': '#FFEFCD',
        'secondary-3': '#FFDF99',
        'secondary-4': '#FFCD60',
        'secondary-5': '#FFB81C',
        'secondary-6': '#CC9619',
        'secondary-7': '#997415',
        'secondary-8': '#735A13',
        'secondary-9': '#4C4010',
        'secondary-10': '#332F0E',
        // Success colors
        'success-1': '#E5F6E5',
        'success-2': '#C7EAC7',
        'success-3': '#8CD58C',
        'success-4': '#4CBD4C',
        'success-5': '#00A100',
        'success-6': '#008302',
        'success-7': '#006604',
        'success-8': '#005006',
        'success-9': '#003908',
        'success-10': '#002B09',
        // Error colors
        'error-1': '#FEE9EA',
        'error-2': '#FDCED1',
        'error-3': '#FB9CA0',
        'error-4': '#F8646C',
        'error-5': '#F5222D',
        'error-6': '#C91C25',
        'error-7': '#9A151C',
        'error-8': '#7B1117',
        'error-9': '#580C10',
        'error-10': '#42090C',
        // Blue colors
        'blue-1': '#E0F5FF',
        'blue-2': '#BAE7FF',
        'blue-3': '#8AD2FF',
        'blue-4': '#4DB4FF',
        'blue-5': '#1890FF',
        'blue-6': '#096DD9',
        'blue-7': '#005BBD',
        'blue-8': '#0049A3',
        'blue-9': '#003073',
        'blue-10': '#001D4D',
        // Other
        'green-5': '#1AC454',
      },
      margin: {
        3.75: '15px',
      },
      width: {
        75: '300px',
      },

      fontSize: {
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        error: ['12px', '20px'],
        // Display
        heading1: ['40px', { lineHeight: '48px', fontWeight: '600' }],
        heading2: ['34px', { lineHeight: '40px', fontWeight: '600' }],
        heading3: ['28px', { lineHeight: '36px', fontWeight: '600' }],
        heading4: ['24px', { lineHeight: '32px', fontWeight: '600' }],
        heading5: ['20px', { lineHeight: '28px', fontWeight: '600' }],
        // Text
        'body-1-semibold': ['16px', { lineHeight: '24px', fontWeight: '600' }],
        'body-1-medium': ['16px', { lineHeight: '24px', fontWeight: '500' }],
        'body-1-regular': ['16px', { lineHeight: '24px', fontWeight: '400' }],
  
        'body-2-semibold': ['14px', { lineHeight: '22px', fontWeight: '600' }],
        'body-2-medium': ['14px', { lineHeight: '22px', fontWeight: '500' }],
        'body-2-regular': ['14px', { lineHeight: '22px', fontWeight: '400' }],
  
        'body-3-semibold': ['12px', { lineHeight: '20px', fontWeight: '600' }],
        'body-3-medium': ['12px', { lineHeight: '20px', fontWeight: '500' }],
        'body-3-regular': ['12px', { lineHeight: '20px', fontWeight: '400' }],
  
        borderRasius: {
          default: '4px',
        },
      }
    },
  },
  plugins: [],
}

