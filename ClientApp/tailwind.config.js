import { defineConfig } from 'vite';
const flowbiteAngularTailwindConfig = require('flowbite-angular/tailwind.config');

export default defineConfig({
  presets: [
    flowbiteAngularTailwindConfig,
  ],
  content: [
    "./src/**/*.{html,scss,ts}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'),
  ],
})

// const { join } = require('path');
// const flowbiteAngularTailwindConfig = require('flowbite-angular/tailwind.config');

// module.exports = {
//   content: [
//     "./src/**/*.{html,ts}",
//     "./node_modules/flowbite/**/*.js",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [
//     require('flowbite/plugin')
//   ],
// }