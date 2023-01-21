
<template>
    <v-app
    :theme="theme"
    :bgCurrentAnim="bgCurrentAnim"
    :bgCurrentColorOne="bgCurrentColorOne"
    :bgCurrentColorTwo="bgCurrentColorTwo"
    :bgBackgroundColor="bgBackgroundColor">
      <v-app-bar app>
        <v-col>
          <v-row>
            Change Background Animation
          </v-row>
        </v-col>
        <v-col>
          <v-row>
        <BgDropdown @setBgAnim="changeBgAnim" :BgItems="BgItems" :bgCurrentAnim="bgCurrentAnim"/>
        </v-row>
      </v-col>
        <v-col >
        <BgColorPicker
          @setBgColor="changeBgColor"
          number=1
        />
        </v-col>
        <v-col >
        <BgColorPicker
          @setBgColor="changeBgColor"
          number=2
        />
        </v-col>
        <v-col >
        <BgColorPicker
          @setBgColor="changeBgColor"
          number=3
        />
        </v-col>
      
     <v-col>
        <v-btn
          :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          @click="onClick"
        >Toggle Theme</v-btn>
      </v-col>
      </v-app-bar>
      <v-main class="vanta-bg-container">
        <v-container>
            <h1>Background Animation: {{ bgCurrentAnim.title }}</h1>
            <ul>
                <li v-for="item in BgItems" :key="item">
                    {{ item }}
                </li>
            </ul>
            <h1>Colors</h1>
            <ul>
                <li>Color 1: {{ bgCurrentColorOne }}</li>
                <li>Color 2: {{ bgCurrentColorTwo }}</li>
                <li>Background Color: {{ bgBackgroundColor }}</li>
            </ul>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  <script allowJS="true" setup>
    import { ref } from 'vue'
    import BgDropdown from './BgDropdown.vue';
    import BgColorPicker from './BgColorPicker.vue';

    const theme = ref('dark');

    var bgCurrentAnim = ref({title: 'Globe', value: 'gl'});

    var bgCurrentColorOne = ref('#34c0eb');
    var bgCurrentColorTwo = ref('#8246c7');
    var bgBackgroundColor = ref('#311885');

    function onClick () {
      theme.value = theme.value === 'light' ? 'dark' : 'light'
    }

    function changeBgColor(msg) {

        msg = msg.target ? msg.target : msg;
        console.log('changeBgColor', msg);
        if (msg.number == "1") {
            bgCurrentColorOne.value = msg.color;
        } else if (msg.number == "2") {
            bgCurrentColorTwo.value = msg.color;
        } else if (msg.number == "3") {
            bgBackgroundColor.value = msg.color;
        }


        
        window.VANTA.current.setOptions({
          color: bgCurrentColorOne.value,
          color2: bgCurrentColorTwo.value,
          backgroundColor: bgBackgroundColor.value
        });
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
          color: bgCurrentColorOne.value,
          backgroundColor: bgBackgroundColor.value,
          color2: bgCurrentColorTwo.value,
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
        BgDropdown,
        BgColorPicker
    },
    data() {
        return {
            BgItems: [
                {title: 'Globe', value: 'gl'},
                {title: 'Trunk', value: 'tk'},
                {title: 'Network', value: 'nt'}
            ],
            bgCurrentAnim: {title: 'Globe', value: 'gl'},
            bgCurrentColorOne: '#0afff',
            bgCurrentColorTwo: '#0fff',
            bgBackgroundColor: '#0acff',
            numbers : {
              type: Array,
              default: () => [1, 2, 3]
            }
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
                color: "#34c0eb",
                backgroundColor: "#311885",
                color2: "#8246c7",
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