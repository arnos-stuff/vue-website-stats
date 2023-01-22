<template>
  <Suspense>
      <BgAnimMainPage />
  </Suspense>
</template>

<script>
import BgAnimMainPage from './components/BgAnimMainPage.vue';

export default {
  name: 'App',
  components: {
    BgAnimMainPage
  },
  props: {
    },
    async mounted() {
      console.log('App mounted');
    },
}
</script>