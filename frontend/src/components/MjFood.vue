<template>
  <h3>{{ name }}'s Foods {{ foodsLeft }}</h3>
  <ul>
    <li v-for="(food, i) in model" :key="'food' + i">
     {{ food }} <button @click="eat(i)">eat</button>
    </li>
  </ul>
</template>
<script setup>
  import { ref, computed } from 'vue'

  const props = defineProps({
    list: {
      default: ['manok']
    },
    name: {
      type: String,
      default: 'MJ',
      required: true
    }
  })

  const emit = defineEmits(['ate'])

  const model = ref([...props.list])

  function eat(i) {
    const ateFood = model.value[i]

    console.log('ateFood', model.value[i], ateFood)
    // Object.assign({}, model.value)
    model.value.splice(i, 1)
    emit('ate', ateFood)
  }


  const foodsLeft = computed(() => {
    return model.value.length + ' left'
  }) 
</script>
