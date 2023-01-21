<template>
  <Suspense>
      <BgGlobe />
  </Suspense>
</template>

<script>
import BgGlobe from './components/BgGlobe.vue';
import { ref } from 'vue'

const bgItems = ref('bgItems');

bgItems.value = [
  'Trunk',
  'Globe',
  'Net',
]

export default {
  name: 'App',
  components: {
    BgGlobe
  },
  props: {
    bgItems: bgItems
    },
    async mounted() {
      console.log('App mounted');
    },
    data() {
      return {
        items: [
          {
            title: 'Globe',
            value: 'gl'
          },
          {
            title: 'Trunk',
            value: 'tk'
          },
          {
            title: 'Network',
            value: 'nt'
          },
        ],
    }
  }
}
</script>
