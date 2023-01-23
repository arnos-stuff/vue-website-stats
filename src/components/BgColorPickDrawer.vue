<template>
    <v-list>
    <v-list-item
      :title="hover ? (mobile ? 'Background' : 'Customize the background') : ''"
      :subtitle="hover ? (mobile ? 'Anim & Colors' : 'Change Animation & Colors') : ''"
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
          :title="mobile ? titleOne : 'Color #1'"
          />
      </v-row>
      
    </v-list-item>
    <v-list-item>
      <v-row>

      <BgColPickRow
        :number=2
        @setBgColor="PropagateEmit"
        :title="mobile ? titleTwo : 'Color #2'"/>
      </v-row>
    </v-list-item>
    <v-list-item>
      <BgColPickRow
        :number=3
        @setBgColor="PropagateEmit"
        :title="mobile ? titleBackground : 'BG Color'"
        />
    </v-list-item>
  </v-list>
</template>

<script allowJS="true" setup>
import BgColPickRow from './BgColPickRow.vue';
import { defineEmits, defineProps, ref } from 'vue';
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()

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