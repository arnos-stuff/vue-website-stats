<template>
    <v-app :theme="theme" id="vanta">
      <v-app-bar>
        <v-select @change="reloadBackground">
            <v-list-item
                :key="item"
                @click="changeBgAnimation(item)"
                >
                <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
            
        </v-select>
        <v-spacer></v-spacer>
        
        <v-btn
          :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          @click="onClick"
        >Toggle Theme</v-btn>
      </v-app-bar>
      <v-main >
        <div ref="bgref" class="bgdiv">
        <v-container fill-height >Content area</v-container>
        </div>
      </v-main>
    </v-app>
  </template>
  
  <script allowJS="true" setup>
    import { ref } from 'vue'
    import NET from "vanta/dist/vanta.net.min";
    const theme = ref('white');

    function onClick () {
      theme.value = theme.value === 'light' ? 'dark' : 'light'
    }
    // function guessIfRootAnim() {
    //     var url = window.location.href;
    //     var numSlashes = url.split('/').length - 1;
    //     return numSlashes === 1;
    // }

    function changeBgAnimation(item) {
        console.log('changeBgAnimation', item);
        var url = window.location.href;
        url = url.replace(new RegExp("$http[s]?://[a-z]{2}/"), `https://${item}/`);
        window.location.href = url;
    }
</script>

<script>
    export default {
        name: 'BgNet',
        props: {},
        async mounted() {
            console.log('BgNet mounted');
            // window is only avaiable on browser

            this.vantaEffect = NET({
                // this.$refs.bgref
                el: "#vanta",
                mouseControls: true,
                touchControls: true,
                minHeight: 200.0,
                minWidth: 200.0,
                xOffset: 0,
                size: 1
            });
        },
    }
</script>