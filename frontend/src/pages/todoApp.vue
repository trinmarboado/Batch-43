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
  <q-list bordered separator>
    <q-item clickable v-ripple v-for="(todo, i) in filteredTodos" :key="todo.id">
      <q-item-section  avatar>
        <q-checkbox :modelValue="todo.isDone" @click="updateStatus(i, todo.isDone)" />
      </q-item-section>
      <q-item-section
        :class="{ 'text-grey strike-through': todo.isDone }"
      >
        {{ i }}
        <q-input v-if="editing === i" v-model="todo.desc" @keyup.esc="editing = -1" @blur="editing = -1" />
        <span v-else @dblclick="editing = i">{{ todo.desc }}</span>
      </q-item-section>
      <q-item-section side>
        <q-btn @click="removeTodo(i)" round size="sm" dense icon="delete" color="red" />
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

  <AddComp :num1="123" :num2="123" :answer="answer" @getAnswer="(val) => answer = val" />

  <!-- {{ foods }}
  <mj-food :list="foods" name="Trin" @ate="logAteFood"/> -->
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
// import mjFood from 'src/components/MjFood.vue';
import AddComp from 'src/components/AddComp.vue';
// import AddComp from 'src/components/AddComp.vue';

const answer = ref('unknown')

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

const updateTaskText = (val) => task.value = val

function add () {
  data.todos.unshift({
    id: Date.now(),
    isDone: false,
    desc: task.value,
  })

  console.log('new Todos', todos)

  task.value = ''
}

const removeTodo = (i) => data.todos.splice(i, 1)

const updateStatus = (i, status) => {
  data.todos[i].isDone = !status
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