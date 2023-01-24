
<template>
    <v-app
    :theme="theme"
    :bgCurrentAnim="bgCurrentAnim"
    :bgCurrentColorOne="bgCurrentColorOne"
    :bgCurrentColorTwo="bgCurrentColorTwo"
    :bgBackgroundColor="bgBackgroundColor"
    :drawer="drawer"
    >
    <v-layout>
      <v-app-bar app :width="width">
        <v-col align-self="center" :width="0.2*width" :max-width="width * 0.3">
        <BgDropdown @setBgAnim="changeBgAnim" :BgItems="BgItems" :bgCurrentAnim="bgCurrentAnim"/>
        </v-col>
        <v-col align-self="center" :width="0.2*width">
        <v-btn
          :prepend-icon="theme === 'light' ? 'mdi-palette' : 'mdi-palette-outline'"
          @click.stop="drawer = !drawer"
        > {{ mobile ? 'Pick BG' : 'Customize Background' }}</v-btn>
          
          </v-col>
          <v-col align-self="center" :width="0.2*width" :max-width="width * 0.3">
        <v-btn
          :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          @click.stop="onClick"
          :max-width="width * 0.3"
          width="10vw"
          :min-width="width * 0.1"

        >{{ mobile ? 'Theme' : 'Pick a Color Theme' }}</v-btn>
      </v-col>
      </v-app-bar>

      <v-navigation-drawer
        v-model:model-value="drawer"
        rail
        :rail-width="mobile ? width * 0.4 : width * 0.2"
        >

        <BgColorPickDrawer
          @setBgColor="changeBgColor"
          v-model:hover="hover"
          v-model:titleOne="titleOne"
          v-model:titleTwo="titleTwo"
          v-model:titleBackground="titleBackground"
          @update:titleOne.stop="titleOne = $event.target.value"
          @update:titleTwo.stop="titleTwo = $event.target.value"
          @update:titleBackground.stop="titleBackground = $event.target.value"
        ></BgColorPickDrawer>
      </v-navigation-drawer>
      <!-- end of app bar  -->
      

    
      <v-main class="vanta-bg-container">
        
        <v-container>
          <v-responsive width="100vw" height="eval(0.098 * 100vh)">
          <v-col></v-col>
          <v-col></v-col>
          <div class="text-center">
            <v-responsive max-width="eval(0.7 * 100vw)" width="eval(0.5 * 100vw)">
          <v-card
            class="text-center"
            width="fit-content"
            position="relative"
            margin="1vw"
            >
            
          
            <v-text-field
              label="Current Parameters"
              outlined
              :color="bgCurrentColorOne"
              :bg-color="bgCurrentColorTwo"
              :active=false
              center
              density="comfortable"
              >
            <h1 >Background Animation: {{ bgCurrentAnim.title }}</h1>
          </v-text-field>
          <h4> Parameter list </h4>
          <v-text-field
        
              outlined
              :color="bgCurrentColorTwo"
              :bg-color="bgCurrentColorOne"
              :active=false
              center
              density="comfortable"
              
              >
            <ul>
                <li v-for="item in BgItems" :key="item">
                    Background anim: {{ item.title }} (code: {{ item.value }})
                </li>
            </ul>
          </v-text-field>
          <v-text-field
        
              outlined
              :color="bgCurrentColorOne"
              :bg-color="bgBackgroundColor"
              center
              :active=false
              density="comfortable"
              >
            Colors:
          </v-text-field>
            
              
            <ul>
                <li>Color 1: {{ bgCurrentColorOne }}</li>
                <li>Color 2: {{ bgCurrentColorTwo }}</li>
                <li>Background Color: {{ bgBackgroundColor }}</li>
            </ul>
    
            
            <v-text-field
              label="Debug"
              outlined
              :color="bgCurrentColorTwo"
              :bg-color="bgCurrentColorOne"
              :active=false
              center
              density="comfortable"
              >
            <h1>Drawer:</h1>
            </v-text-field>
            <ul>
                <li>Title #1 : {{ titleOne }}</li>
                <li>Title #2 : {{ titleTwo }}</li>
                <li>Title #3 : {{ titleBackground }}</li>
                <li>hover {{ hover }}</li>
                <li>drawer {{ drawer }}</li>
            </ul>
           
   
          </v-card>
        </v-responsive>
        </div>
      </v-responsive>
        </v-container>
        <ArnoLogo
          v-model:size="size"
          v-model:mobile="mobile"
          v-model:color-start="bgCurrentColorOne"
          v-model:color-end="bgCurrentColorTwo"
          text-content="Ts"
          @update:size.stop="size = $event.target.value"
          id="arno-logo-id"
          ></ArnoLogo>
      </v-main>
    </v-layout>
    </v-app>
  </template>
  
  <script allowJS="true" setup>
    import { ref, defineProps } from 'vue'
    import BgDropdown from './BgDropdown.vue';
    import BgColorPickDrawer from './BgColorPickDrawer.vue';
    import ArnoLogo from './icons/ArnoLogo.vue';
    import { useDisplay } from 'vuetify'

    const { width, mobile } = useDisplay()
    
    const props = defineProps(
      {
        hover: {
          type: Boolean,
          default: false
        },
        drawer: {
          type: Boolean,
          default: false
        },
        theme: {
          type: String,
          default: 'dark'
        },
      }
    )

    const theme = ref(props.theme);

    var bgCurrentAnim = ref({title: 'Globe', value: 'gl'});

    var bgCurrentColorOne = ref('#34c0eb');
    var bgCurrentColorTwo = ref('#8246c7');
    var bgBackgroundColor = ref('#311885');

    var titleOne = ref('Set Color #1');
    var titleTwo = ref('Set Color #2');
    var titleBackground = ref('Set Color #3');

    var hover = ref(props.hover);
    var drawer = ref(props.drawer);


    function onClick () {
      theme.value = theme.value === 'light' ? 'dark' : 'light'
    }

    function changeBgColor(msg) {

        msg = msg.target ? msg.target : msg;
        console.log('changeBgColor', msg);
        if (eval(msg.number) == 1) {
            bgCurrentColorOne.value = msg.color;
            if (bgCurrentAnim.value.value == 'tk') {
              bgCurrentColorTwo.value = bgCurrentColorOne.value;
            }
        } else if (eval(msg.number) == 2) {
            bgCurrentColorTwo.value = msg.color;
            if (bgCurrentAnim.value.value == 'tk') {
                bgCurrentColorTwo.value = bgCurrentColorOne.value;
            }
        } else if (eval(msg.number) == 3) {
            bgBackgroundColor.value = msg.color;
        }
        

        if (bgCurrentAnim.value.value == 'tk') {
          RenewBgAnim(bgCurrentAnim.value);
        }
        else {
          window.VANTA.current.setOptions({
          color: bgCurrentColorOne.value,
          color2: bgCurrentColorTwo.value,
          backgroundColor: bgBackgroundColor.value
          });
        }
        window.vantaEffect = window.VANTA.current;
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
    name: 'BgAnimMainPage',
    components: {
        BgDropdown,
        BgColorPickDrawer,
        ArnoLogo
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
            },
            hover: false,
            navHovered: false,
            drawer: false,
            colorStart: '#0afff',
            colorEnd: '#0fff',
            colorMiddle: '#0acff',
            size: 50,
      }
    },
    emits: ['setDrawer', 'setBgAnim', 'setBgColor'],

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
}
    
</script>