<template >
  <div class="text-center">
    <v-col align-self="start">
    <v-btn
      variant="text"
      prepend-icon="mdi-brush"
      :color="number === 3 ? 'primary' : 'secondary'"
      @click.stop="dialog = true"
      :height="mobile ? 0.2 * height : 'fit-content'"
    >
      {{ number === 3 ? (mobile ? 'BG' : 'Set Background Color') : (mobile ? 'Anim' : 'Set Animation Color #' + number) }}
      <br v-if="mobile">
      {{ number === 3 ? (mobile ? 'Color' : '') : (mobile ? 'Color': '') }}
      <br v-if="mobile">
      {{ number === 3 ? (mobile ? '' : '') : (mobile ? ('#' + number) : '') }}
      <v-dialog
        v-model="dialog"
        v-bind:eager="true"
        :max-width="mobile ? width : 'fit-content'"
        :width="mobile ? 0.95*width : 'fit-content'"
        ref = "dialogRef"
      >
      <v-card :title="cardTitle">
          <v-card-actions>
            <v-container>
                <v-row>
                <v-color-picker
                v-model="pickColor"
                mode="hexa"
                @input="$emit('update:bgColor', $event.target.value)"
                >
                </v-color-picker>
                </v-row>
                <v-row>
                <v-btn
                variant="text"
                @click="setBgColorEvent({color: pickColor, number: number}) ; dialog = false"
                >
                Set Color
                </v-btn>
                </v-row>
            </v-container>
          </v-card-actions>
        </v-card>
        
      </v-dialog>
    </v-btn>
</v-col>
  </div>
</template>

<script allowJS="true" setup>
import { defineEmits, defineProps, defineExpose, ref} from 'vue';
import { useDisplay } from 'vuetify'
const emit = defineEmits(['setBgColor', 'update:bgColor']);

const { mobile, width, height } = useDisplay()
const props = defineProps({
    number: {
        type: Number,
        required: true
    },
    hover: {
        type: Boolean,
        required: false
    },
    title: {
        type: String,
        required: true
    }
});

var title = ref(props.title);
var number = ref(props.number);
var exposed = {};


switch (number.value) {
  case("1"):
    exposed = {
      titleOne: title
    };
    break;
  case("2") :
    exposed = {
      titleTwo: title
    };
    break;
  case("3") :
    exposed = {
      titleBackground: title
    };
    break;
  default:
    exposed = {
      title: title
    };
}

defineExpose(exposed);

var cardTitle = 'Set Color #' + props.number;


function setBgColorEvent(msg) {
    if (msg.color === null) {
        return;
    }
        
    console.log('sent setBgColorEvent', msg);
    emit('setBgColor', msg);
}



</script>

<script>
export default {
    name: 'BgColPickRow',
    
    data: () => ({
        dialog: false,
        pickColor: null,
        msg: null,
        colorNumber : null,
        
    }),
    
}
</script>