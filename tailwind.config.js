/* eslint-env es6 */
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#FFFFFF',
        secondary: 'rgba(255,255,255,0.7)',
        success: '#00FF66',
        link: '#996BFF',
        error: '#FF6060',
        'surface-transparent': 'rgba(243, 217, 255, 0.12)',
        'surface-transparent-01': 'rgba(243, 217, 255, 0.16)',
        'surface-disabled': 'rgba(0, 0, 0, 0.32)',
        'surface-secondary': 'rgba(255, 222, 107, 0.12)',
      },
      backgroundImage: {
        'img-secondary': "url('/assets/img/bg-secondary.png')",
        'img-booster-purchase': "url('/assets/img/booster-purchase-bg.png')",
        'gradient-primary':
          'linear-gradient(334.63deg, rgba(153, 153, 153, 0) -7.7%, rgba(255, 255, 255, 0.1) -6.22%, rgba(255, 255, 255, 0.1) 27.11%, rgba(255, 255, 255, 0.1) 49.53%, rgba(153, 153, 153, 0) 90.97%, rgba(153, 153, 153, 0) 90.97%), linear-gradient(94.18deg, #010D52 -45.03%, #32249B -0.31%, #6D28CC 38.45%, #8726E1 64.07%, #9145C9 85.25%, #9350BE 105.46%)',
        'silver': 'linear-gradient(180deg, #E2E2E2 -41.67%, #ADADAD 90.66%)',
      },
      height: {
        17: '4.25rem',
      },
      width: {
        22: '5.5rem',
      },
      screens: {
        taller: { raw: '(min-height: 664px)' },
        short: { raw: '(max-height: 663px)' },
      },
    },
  },
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        '.primary-text-gradient': {
          'background-image':
            'linear-gradient(325.7deg, rgba(153, 153, 153, 0) -4.91%, rgba(255, 255, 255, 0.3) -3.02%, rgba(255, 255, 255, 0.3) 39.58%, rgba(255, 255, 255, 0.3) 92.44%, rgba(153, 153, 153, 0) 121.19%, rgba(153, 153, 153, 0) 121.19%), linear-gradient(94.18deg, #010D52 -45.03%, #32249B -17.88%, #6D28CC 15.39%, #8726E1 64.07%, #9145C9 85.25%, #9350BE 105.46%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
          'text-fill-color': 'transparent',
        },
        '.gold-text-gradient': {
          'background-image':
            'linear-gradient(180deg, #FFF8B5 -41.67%, #FFDE6B 90.66%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
          'text-fill-color': 'transparent',
        },
        '.h1, .h1-reg, .h1-digit, .h1-digit-reg': {
          'font-family': 'Montserrat, sans-serif',
          'font-style': 'normal',
          'font-weight': '600',
          'font-size': '3rem',
          'line-height': '100%',
          'letter-spacing': '-0.03em',
        },
        '.h1-reg': {
          'font-weight': '400',
        },
        '.h1-digit, .h1-digit-reg': {
          'font-family': 'Roboto, sans-serif',
          'letter-spacing': '-0.02em',
        },
        '.h1-digit-reg': {
          'font-weight': '400',
        },
        '.h2, .h2-reg, .h2-digit, .h2-digit-reg': {
          'font-family': 'Montserrat, sans-serif',
          'font-style': 'normal',
          'font-weight': '600',
          'font-size': '2rem',
          'line-height': '100%',
          'letter-spacing': '-0.03em',
        },
        '.h2-reg': {
          'font-weight': '400',
        },
        '.h2-digit, .h2-digit-reg': {
          'font-family': 'Roboto, sans-serif',
          'letter-spacing': '-0.02em',
        },
        '.h2-digit-reg': {
          'font-weight': '400',
        },
        '.h3, .h3-reg, .h3-digit, .h3-digit-reg': {
          'font-family': 'Montserrat, sans-serif',
          'font-style': 'normal',
          'font-weight': '600',
          'font-size': '1.375rem',
          'line-height': '120%',
          'letter-spacing': '-0.03em',
        },
        '.h3-reg': {
          'font-weight': '400',
        },
        '.h3-digit, .h3-digit-reg': {
          'font-family': 'Roboto, sans-serif',
          'letter-spacing': '-0.02em',
        },
        '.h3-digit-reg': {
          'font-weight': '400',
        },
        '.h4, .h4-reg, .h4-digit, .h4-digit-reg': {
          'font-family': 'Montserrat, sans-serif',
          'font-style': 'normal',
          'font-weight': '600',
          'font-size': '1rem',
          'line-height': '100%',
          'letter-spacing': '-0.03em',
        },
        '.h4-reg': {
          'font-weight': '400',
        },
        '.h4-digit, .h4-digit-reg': {
          'font-family': 'Roboto, sans-serif',
          'letter-spacing': '-0.02em',
        },
        '.h4-digit-reg': {
          'font-weight': '400',
        },
        '.label, .label-reg, .label-digit, .label-digit-reg': {
          'font-family': 'Montserrat, sans-serif',
          'font-style': 'normal',
          'font-weight': '700',
          'font-size': '0.625rem',
          'line-height': '140%',
          'letter-spacing': '-0.03em',
        },
        '.label-reg': {
          'font-weight': '500',
        },
        '.label-digit, .label-digit-reg': {
          'font-family': 'Roboto, sans-serif',
          'letter-spacing': '-0.02em',
        },
        '.label-digit-reg': {
          'font-weight': '500',
        },
      });
    }),
  ],
};
