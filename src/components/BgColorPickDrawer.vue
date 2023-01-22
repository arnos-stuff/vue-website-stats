<template>
    <v-list>
    <v-list-item
      :title="hover ? 'Customize the background' : ''"
      :subtitle="hover ? 'Change Animation & Colors' : ''"
      :prepend-icon="hover ? 'mdi-palette' : 'mdi-palette-outline'"
    >
  </v-list-item>
  </v-list>

  <v-divider></v-divider>
  <v-list nav>
    <v-list-item>
      <v-row>
        <BgColPickRow
          :number=1
          @setBgColor="PropagateEmit"
          :title="titleOne"
          />
      </v-row>
      
    </v-list-item>
    <v-list-item>
      <v-row>

      <BgColPickRow
        :number=2
        @setBgColor="PropagateEmit"
        :title="titleTwo"/>
      </v-row>
    </v-list-item>
    <v-list-item>
      <BgColPickRow
        :number=3
        @setBgColor="PropagateEmit"
        :title="titleBackground"
        />
    </v-list-item>
  </v-list>
</template>

<script allowJS="true" setup>
import BgColPickRow from './BgColPickRow.vue';
import { defineEmits, defineProps, ref, watch } from 'vue';

const emit = defineEmits([
  'setBgColor', 'update:hover',
  'update:titleOne', 'update:titleTwo',
  'update:titleBackground', 'update:click'
]);

const props = defineProps({
  hover: {
    type: Boolean,
    required: true
  },
  titleOne: {
    type: String,
    required: true
  },
  titleTwo: {
    type: String,
    required: true
  },
  titleBackground: {
    type: String,
    required: true
  },
});

var titleOne = ref(props.titleOne);
var titleTwo = ref(props.titleTwo);
var titleBackground = ref(props.titleBackground);
var hover = ref(props.hover);

watch(hover, (newVal, oldVal) => {
  updateFields();
  emit('update:hover', newVal);
});
watch(titleOne, (newVal, oldVal) => {
  emit('update:titleOne', newVal);
});
watch(titleTwo, (newVal, oldVal) => {
  emit('update:titleTwo', newVal);
});
watch(titleBackground, (newVal, oldVal) => {
  emit('update:titleBackground', newVal);
});
watch(props, (newVal, oldVal) => {
  titleOne.value = newVal.titleOne;
  titleTwo.value = newVal.titleTwo;
  titleBackground.value = newVal.titleBackground;
  hover.value = newVal.hover;
});

function updateFields() {

  titleOne.value = titleOne.value === '' ? 'Set Color #1' : '';
  titleTwo.value = titleTwo.value === '' ? 'Set Color #2' : '';
  titleBackground.value = titleBackground.value === '' ? 'Set Background Color' : '';

  emit('update:titleOne', titleOne);
  emit('update:titleTwo', titleTwo);
  emit('update:titleBackground', titleBackground);
}


const PropagateEmit = (msg) => {
  emit('setBgColor', msg);
}

</script>

<script>
export default {
    name: 'BgColorPickDrawer',
    data: () => ({
        dialogOne: false,
        dialogTwo: false,
        dialogBack: false,
        pickColorOne: null,
        pickColorTwo: null,
        pickColorBack: null,
        msg: null,
    }),
    mounted() {
    },
    methods: {
      hoverOn() {
        this.$emit('update:hover', true);
      },
      hoverOff() {
        this.$emit('update:hover', false);
      },
    }
}
</script>