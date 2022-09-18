import { boot } from 'quasar/wrappers'
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'

import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.pdfMake.vfs

import wings from 'wings4'

import { reactive } from 'vue'

const wingsApp = wings('http://localhost:3030')

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ( { app, router } ) => {
  // something to do

  app.config.globalProperties.$pdfMake = pdfMake

  app.provide('pdfMake', pdfMake)
  app.use(VueChartkick)

  const todosSrvc = wingsApp.wingsService('tasks')

  app.provide('todosService', todosSrvc)

  app.provide('wingsApp', wingsApp)

  const todos = [
    {
      id: 'asdasdd2q312tghrgy',
      isDone: false,
      desc: 'create a function',
    },
    {
      id: '56h5hrty56',
      isDone: true,
      desc: 'create add button asdasda',
    },
    {
      id: 'tr6y457645',
      isDone: true,
      desc: 'discuss reactive',
    }
  ]
  
  const data = reactive({
    todos,
    user: null
  })


  wingsApp.on('login', ({ user }) => {
    console.log('login', user )
    data.user = user
  
    todosSrvc.reset()
    todosSrvc.init()
  })
  
  wingsApp.on('logout', () => {
    // console.log('login', user )
    data.user = null
  
    data.todos = []
  })

  app.provide('data', data)

})
