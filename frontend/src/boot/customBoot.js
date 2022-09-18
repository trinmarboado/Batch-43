import { boot } from 'quasar/wrappers'
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'

import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.pdfMake.vfs

import wings from 'wings4'

const wingsApp = wings('http://localhost:3030')

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ( { app, router } ) => {
  // something to do

  app.config.globalProperties.$pdfMake = pdfMake

  app.provide('pdfMake', pdfMake)
  app.use(VueChartkick)

  app.provide('todosService', wingsApp.wingsService('todos'))

})
