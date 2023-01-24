
<template>
<svg xmlns="http://www.w3.org/2000/svg" 
    :width="size" 
    :height="size" 
    :viewBox="'0 0' + ' ' + size + ' ' + size" 
    :aria-labelledby="textContent"
    :style="`font-size:clamp(200%, ${size*0.3}px, 500%) ;`"
  >

<defs>
    <path id="logo" :d="`${getLogoPath(size)}`"/>
    <linearGradient id="logoGradient">
      <stop offset="5%" :stop-color="colorStart" />
      <stop offset="95%" :stop-color="colorEnd" />
    </linearGradient>
</defs>
<use x="5%" y="5%" href="#logo" fill="url('#logoGradient')" />
<text id="logo-text" x="50%" y="50%" :fill="pSBC(0.4, colorStart)">{{textContent}}</text>
</svg>
</template>

<script setup>
import { defineProps, ref, toRef, onMounted } from 'vue';
// import { useDisplay } from 'vuetify'
import pSBC from '@/js/colorChanger';
import getLogoPath from '@/js/logoResize';

// const { width } = useDisplay()

const props = defineProps({
    colorStart: {
        type: String,
        default: '#FF0000'
    },
    colorEnd: {
        type: String,
        default: '#0000FF'
    },
    size: {
        type: Number,
        default: 18
    },
    textContent: {
        type: String,
        default: 'Logo'
    }
});

var size = ref(props.size);


var textContent = ref(props.textContent);

</script>


<script>
export default {
    name: 'ArnoLogo',
    emits: ['update:colorStart', 'update:colorEnd', 'update:size'],
    setup(props) {
        var size = ref(props.size);
        var textContent = ref(props.textContent);
        var logoPath = ref(getLogoPath(size.value));
        onMounted(() => {
            var size = props.size;
            toRef(this, 'size', size);
            var logoPath = getLogoPath(size);
            toRef(this, 'logoPath', logoPath);
            window.logoPath = logoPath
        });
        return { size, textContent, logoPath };
    },
    methods: {
        pSBC: pSBC,
        getLogoPath: getLogoPath
    },
}

</script>