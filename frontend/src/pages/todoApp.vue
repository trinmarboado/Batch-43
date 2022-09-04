<template>
  <q-toolbar class="bg-primary text-white">
    <q-btn flat round dense icon="menu" class="q-mr-sm" />
    <q-avatar>
      <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
    </q-avatar>

    <q-toolbar-title>Batch 43 Todo App {{ task }}</q-toolbar-title>

    <q-btn flat round dense icon="whatshot" />
  </q-toolbar>
  <q-input filled v-model="task" label="Task" />
  <q-list bordered separator>
    <q-item clickable v-ripple v-for="todo in todos" :key="todo.id">
      <q-item-section  avatar>
        <q-icon name="signal_wifi_off" />
      </q-item-section>
      <q-item-section>{{ todo.desc }}</q-item-section>
      <q-item-section side>Side</q-item-section>
    </q-item>
  </q-list>

</template>

<script setup>
import { ref } from 'vue';

const t = 'not reactive'

let task = ref('Trin Pogi')

const todos = [
  {
    id: 'asdasdd2q312tghrgy',
    isDone: false,
    desc: 'create a function',
  },
  {
    id: '56h5hrty56',
    isDone: false,
    desc: 'create add button',
  },
  {
    id: 'tr6y457645',
    isDone: false,
    desc: 'discuss reactive',
  }
]

</script>

<style>
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