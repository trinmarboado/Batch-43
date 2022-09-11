<template>
  <h3>
    {{ num1 }} + {{ num2 }} =  {{ answer || '' }}
  </h3>
  <q-btn label="get answer" @click="add"/>
</template>

<script setup>
const emit = defineEmits([
  'getAnswer'
])

const props = defineProps({
  num1: {
    type: Number,
    default: 0
  },
  num2: {
    type: Number,
    default: 0
  },
  answer: {
    type: String || Number,
    default: ''
  }
})

function add () {
  const answer = props.num1 + props.num2
  console.log('answer', answer)
  emit('getAnswer', answer)
}
</script>
