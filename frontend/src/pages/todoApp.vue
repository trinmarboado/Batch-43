<template>
  <q-toolbar class="bg-primary text-white">
    <q-btn flat round dense icon="menu" class="q-mr-sm" />
    <q-avatar>
      <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
    </q-avatar>

    <q-toolbar-title>Batch 43 Todo App</q-toolbar-title>

    <q-btn flat round dense icon="whatshot" />
  </q-toolbar>
  <q-input filled modelValue="" label="Filled" />
  <q-list bordered separator>
    <q-item clickable v-ripple>
      <q-item-section avatar>
        <q-icon name="signal_wifi_off" />
      </q-item-section>
      <q-item-section>Active</q-item-section>
      <q-item-section side>Side</q-item-section>
    </q-item>
    <q-item clickable v-ripple>
      <q-item-section avatar>
        <q-icon name="signal_wifi_off" />
      </q-item-section>
      <q-item-section>Active</q-item-section>
      <q-item-section side>Side</q-item-section>
    </q-item>
  </q-list>

</template>

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