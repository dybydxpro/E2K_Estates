const { join } = require('path');
const flowbiteAngularTailwindConfig = require('flowbite-angular/tailwind.config');

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}