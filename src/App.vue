<template>
  <Suspense>
      <BgGlobe />
  </Suspense>
</template>

<script>
import BgGlobe from './components/BgGlobe.vue';

export default {
  name: 'App',
  components: {
    BgGlobe
  },
  props: {
    },
    async mounted() {
      console.log('App mounted');
    },
}
</script>