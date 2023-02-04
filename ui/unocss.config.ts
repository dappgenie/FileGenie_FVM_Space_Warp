import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { presetAnu, presetIconExtraProperties } from 'anu-vue'
import { presetThemeDefault } from '@anu-vue/preset-theme-default'

export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-2.5 text-sm font-semibold inline-block cursor-pointer disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
    ['background', 'bg-[#ffffff] dark:bg-[#0c0d0f]'],
    ['background-secondary', 'bg-[#ededed] dark:bg-[#15171b] transition-colors-1000'],
    ['overlay', 'z-20 absolute w-screen top-0 left-0 h-full bg-[#595F6A]/70 dark:bg-[#232C3D]/70 backdrop-blur-sm'],
    ['text-color-primary', 'text-black dark:text-white'],
    ['text-color-secondary', 'text-[#7C7878] dark:text-[#bbbbbb]'],
    ['form-color', 'text-black dark:text-gray-100'],
    ['form-bg', 'bg-gray-200 dark:bg-gray-800'],
    ['group-bg', 'bg-gray-300 dark:bg-blue-800'],
    ['border-color', 'border-gray-400 dark:border-gray-500'],
    ['dropdown-item', 'px-4 py-2 flex cursor-pointer w-full rounded-lg transition duration-200 ease-in-out hover:shadow-btn-hover dark:hover:shadow-btn-dark-hover text-sm text-gray-800 dark:text-gray-100']
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: presetIconExtraProperties,
    }),
    // anu-vue preset
    presetAnu(),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  include: [/.*\/anu-vue\.js(.*)?$/, './**/*.vue', './**/*.md'],
    theme: {
    colors: {
      'primary': '#697BA1',
      'secondary': '#95A6C9',
      'neutral': '#5E5E5E',
      'header': '#2E3C56',
      'card-light': '#DDE7FC',
    },
    gridAutoColumn: {
      drawer: 'max-content auto',
    },
    boxShadow: {
      'navbar': '-2px -7px 13px #FFFFFF, 3px 0px 5px #404040',
      'navbar-dark': '-2px -7px 13px #1C2434, 3px 0px 5px #404040',
      'btn': '-1px -1px 0px #FFFFFF, -2px -4px 5px #FFFFFF, 3px 4px 5px rgba(60, 60, 60, 0.25), 3px 3px 4px #CAD7F3, -1px 0px 5px #CAD7F3',
      'btn-hover': 'inset -1px -1px 0px #FFFFFF, inset 0px 1px 1px #FFFFFF, inset 1px 2px 2px rgba(60, 60, 60, 0.25), inset 3px 3px 2px #CAD7F3, inset -1px 0px 0px #CAD7F3',
      'btn-dark': '-1px -1px 2px #595E66, -2px -4px 4px #31353B, 3px 4px 4px rgba(60, 60, 60, 0.25), 3px 3px 4px #31353B, -1px 0px 4px #31353B',
      'btn-dark-hover': ' inset -1px -1px 0px #31353B, inset 1px 1px 1px #15171B, inset 1px 2px 2px rgba(60, 60, 60, 0.25), inset 3px 3px 2px #1C2434, inset -1px 0px 0px #1C2434',
      'selected': 'inset 19px 196px 5px rgba(255, 255, 255, 0.19), inset 1px 4px 9px 1px rgba(51, 59, 81, 0.44)',
      'selected-dark': 'inset 3px 1px 7px rgba(252, 252, 252, 0.15), inset 1px 0px 10px rgba(29, 33, 44, 0.28), inset 0px 4px 3px 1px rgba(0, 0, 0, 0.45)',
      'text-box': 'inset 3px 3px 4px #C6C9D0, inset -3px -3px 4px #FFFFFF',
      'text-box-dark': 'inset 3px 3px 0px #141A26, inset -3px -3px 0px #242E42',
      'card-box': ' inset -7px -6px 2px #FFFFFF, inset -5px -6px 28px #FFFFFF, inset 6px 7px 4px #B0BBD6, inset 12px 14px 34px 1px rgba(133, 133, 133, 0.25)',
      'card-box-dark': 'inset -2px -3px 13px #000000, inset 1px 3px 9px 1px rgba(133, 133, 133, 0.25)',
    },
  },
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: 'prose prose-sm m-auto text-left'.split(' '),
})
