<template>
    <v-app :theme="theme" :bgCurrentAnim="bgCurrentAnim">
      <v-app-bar app>
        <BgDropdown @setBgAnim="changeBgAnim" :BgItems="BgItems" :bgCurrentAnim="bgCurrentAnim"/>
        <v-spacer></v-spacer>
        
        <v-btn
          :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          @click="onClick"
        >Toggle Theme</v-btn>
      </v-app-bar>
      <v-main class="vanta-bg-container">
        <v-container>
            <h1>Background Animation: {{ bgCurrentAnim.title }}</h1>
            <ul>
                <li v-for="item in BgItems" :key="item">
                    {{ item }}
                </li>
            </ul>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script allowJS="true" setup>
    import { ref } from 'vue'
    import BgDropdown from './BgDropdown.vue';

    const theme = ref('dark');

    var bgCurrentAnim = ref({title: 'Globe', value: 'gl'});

    function onClick () {
      theme.value = theme.value === 'light' ? 'dark' : 'light'
    }

    function changeBgAnim(item) {
        var oldAnim = bgCurrentAnim.value;
        item = item.target ? item.target : item;
        console.log('changeBgAnimation', item);
        bgCurrentAnim.value = item;
        console.log(`Changed from ${oldAnim.title} to ${bgCurrentAnim.value.title}`);
        RenewBgAnim(item);
    }

    function RenewBgAnim(item) {
          console.log('RenewBgAnim Watcher:', item);
          var code = item.value ? item.value : item;

          let ANIM = null;
          let spacing = 20;
          let chaos = 1.5;

          switch (code) {
              case 'gl':
                  ANIM = GLOBE;
                  break;
              case 'nt':
                  ANIM = NET;
                  break;
              case 'tk':
                  ANIM = TRUNK;
                  spacing = 0;
                  chaos = 1.0;
                  break;
              default:
                  ANIM = GLOBE;
                  break;
          }
          const oldVanta = window.VANTA.current;
          window.VANTA.current = ANIM.default({
          // this.$refs.bgref
          el: ".vanta-bg-container",
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x0afff,
          backgroundColor: 0x0fff,
          points: 7.00,
          maxDistance: 23.00,
          spacing: spacing,
          chaos: chaos,
      });
      oldVanta.destroy();
      }



</script>

<script>
var GLOBE = await import('vanta/dist/vanta.globe.min.js');
var NET = await import('vanta/dist/vanta.net.min.js');
var TRUNK = await import('vanta/dist/vanta.trunk.min.js');

export default {
    name: 'BgGlobe',
    props: {
    },
    components: {
        BgDropdown
    },
    data() {
        return {
            BgItems: [
                {title: 'Globe', value: 'gl'},
                {title: 'Trunk', value: 'tk'},
                {title: 'Network', value: 'nt'}
            ],
            bgCurrentAnim: {title: 'Globe', value: 'gl'},
        }
    },
    created() {
        console.log('App created');
        this.$watch('bgCurrentAnim', (newVal, oldVal) => {
            console.log('bgCurrentAnim changed', newVal, oldVal);
            if (newVal === oldVal || newVal == null || self.vantaEffect == null) {
              return;
            }
            self.RenewBgAnim(newVal);
        }, {deep: true, immediate: true});
    },
    async mounted() {
        console.log('App mounted');
        // window is only avaiable on browser
        if (self.vantaEffect == null || self.VANTA.current == null) {
            this.vantaEffect = GLOBE.default({
                el: ".vanta-bg-container",
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color: 0x0afff,
                backgroundColor: 0x0fff,
                points: 7.00,
                maxDistance: 23.00,
                spacing: 20.00
            });
        }
    },
    beforeUnmount() {
        if (this.vantaEffect) this.vantaEffect.destroy()
    },
    methods: {
      RenewBgAnim(item) {
          console.log('RenewBgAnim Watcher:', item);
          var code = item.value ? item.value : item;

          let ANIM = null;

          switch (code) {
              case 'gl':
                  ANIM = GLOBE;
                  break;
              case 'nt':
                  ANIM = NET;
                  break;
              case 'tk':
                  ANIM = TRUNK;
                  break;
              default:
                  ANIM = GLOBE;
                  break;
          }

          this.VANTA.current = ANIM.default({
          // this.$refs.bgref
          el: ".vanta-bg-container",
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x0afff,
          backgroundColor: 0x0fff,
          points: 7.00,
          maxDistance: 23.00,
          spacing: 20.00
      });
      }
  },
}
    
</script>