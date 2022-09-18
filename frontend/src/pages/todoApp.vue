<template>
  <q-toolbar class="bg-primary text-white">
    <q-btn flat round dense icon="menu" class="q-mr-sm" />
    <q-avatar>
      <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
    </q-avatar>

    <q-toolbar-title>Batch 43 Todo App {{ task }}</q-toolbar-title>

    <q-btn flat round dense icon="whatshot" />
  </q-toolbar>
  <div class="row q-gutter-sm q-ma-sm">
    <q-input filled
      class="col"
      :modelValue="task"
      @keyup.enter="add"
      @update:modelValue="updateTaskText" label="Task" />
    <q-btn @click="add" icon="add" label="add" />
  </div>
  <q-list id="forPrint" bordered separator>
    <q-item clickable v-ripple v-for="(todo, i) in filteredTodos" :key="todo.id">
      <q-item-section  avatar>
        <q-checkbox :modelValue="todo.isDone" @click="updateStatus(todo._id, todo.isDone)" />
      </q-item-section>
      <q-item-section
        :class="{ 'text-grey strike-through': todo.isDone }"
      >
        {{ i }}
        <q-input v-if="editing === i" v-model="todo.desc"
          @keyup.enter="updateDesc(todo._id, todo.desc), editing = -1"
          @keyup.esc="editing = -1, todo.desc = tempDesc"
          @blur="editing = -1, todo.desc = tempDesc" />
        <span v-else @dblclick="editing = i, tempDesc = todo.desc">{{ todo.desc }}</span>
      </q-item-section>
      <q-item-section side>
        <q-btn @click="removeTodo(todo._id)" round size="sm" dense icon="delete" color="red" />
      </q-item-section>
    </q-item>
  </q-list>
  <div class="q-pa-md row">
    {{ itemsLeft.length }} item{{ itemsLeft.length > 2 ? 's': '' }} left
    <div class="col column">
      <q-btn-group push class="self-center">
        <q-btn @click="view = 'all'" :color="view === 'all' ? 'yellow': ''" glossy text-color="black" push label="All" active />
        <q-btn @click="view = 'active'" :color="view === 'active' ? 'yellow': ''"  glossy text-color="black" push label="Active" />
        <q-btn @click="view = 'completed'" :color="view === 'completed' ? 'yellow': ''" glossy text-color="black" push label="Completed" />
      </q-btn-group>
    </div>
    <q-btn @click="data.todos = itemsLeft" label="clear completed" />
  </div>

  <!-- <area-chart :data="{'2021-01-01': 11, '2021-01-02': 6}"></area-chart> -->

  <!-- <column-chart :data="[['Sun', 32], ['Mon', 46], ['Tue', 28]]"></column-chart> -->
  <div>
    <pie-chart :donut="true" :data="[['active', itemsLeft.length], ['completed', data.todos.length - itemsLeft.length]]"></pie-chart>

    <q-btn round icon="import_contacts" @click="generatePDF('open')" />
    <q-btn round icon="download" @click="generatePDF('download')" />
    <q-btn round icon="print" @click="generatePDF('print')" />
    <q-btn round icon="water_drop" @click="ink" />
  </div>
  

  <AddComp :num1="246" :num2="123" :answer="answer" @getAnswer="(val) => answer = val" />

  <!-- {{ foods }}
  <mj-food :list="foods" name="Trin" @ate="logAteFood"/> -->
</template>

<script setup>
import { ref, reactive, computed, inject } from 'vue';
// import mjFood from 'src/components/MjFood.vue';
import AddComp from 'src/components/AddComp.vue';
// import AddComp from 'src/components/AddComp.vue';

import print from 'ink-html'

const pdfMake = inject('pdfMake')

const answer = ref('unknown')

let tempDesc = ''

const foods = ref([
  'sinigang',
  'adobo',
  'mongo',
  'ice cream'
])

const view = ref('all')

function logAteFood (val) {
  console.log('MJ ate', val)
  for (const food of foods.value) {
    console.log('forof', food)
  }

  // for (const index in foods.value) {
  //   console.log('forin', index)
  //   if (foods.value[index] ===  val) {
  //     foods.value.splice(index, 1)
  //     return
  //   }
  // }

  // map, foreach, some, reduce

  const index = foods.value.findIndex(food => food === val)
  foods.value.splice(index, 1)
}

const editing = ref(-1)

let task = ref('Trin Pogi')

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
  todos
})

const todosSrvc = inject('todosService')

todosSrvc.on('dataChange', (todos) => {
  data.todos = [...todos]
})

todosSrvc.init()

const find = async () => {
  const result = await todosSrvc.find({
    query: {
      isDone: true,
      $skip: 1
    }
  })
  console.log('result', result)
}

find()



const itemsLeft = computed(() => {
  return data.todos.filter(t => !t.isDone)
})

const filteredTodos = computed(() => {
  switch (view.value) {
    case 'active':
      return itemsLeft.value
    case 'completed':
      return data.todos.filter(t => t.isDone)
    default:
      return data.todos
  }
})

const updateDesc = (i, newDesc) => {
  todosSrvc.patch(i, {
    desc: newDesc
  })
}

const updateTaskText = (val) => task.value = val

async function add () {
  // data.todos.unshift({
  //   id: Date.now(),
  //   isDone: false,
  //   desc: task.value,
  // })

  await todosSrvc.create({
    isDone: false,
    desc: task.value,
  })

  console.log('new Todos', todos)

  task.value = ''
}

const removeTodo = (i) => todosSrvc.remove(i) // data.todos.splice(i, 1)

const updateStatus = (i, status) => {
  // data.todos[i].isDone = !status

  todosSrvc.patch(i, {
    isDone: !status,
  })
}

function generatePDF (method) {
  const dd = {
    content: [
      {
        table: {
          body: [
            ['status', 'count'],
            ['active', itemsLeft.value.length],
            ['completed', data.todos.length - itemsLeft.value.length]
          ]
        }
      }
    ]
  }
  pdfMake.createPdf(dd)[method]()
}

function ink () {
  print(document.querySelector('#forPrint'))
}

</script>

<style>
.strike-through {
  text-decoration: line-through;
}
.title {
  color: pink;
  background-color: orange;
}
#title {
  color: red
}
h6 {
  color: blue
}
</style>