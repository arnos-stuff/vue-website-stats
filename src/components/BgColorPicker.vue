<template >
  <div class="text-center">
    <v-col>
    <v-btn
      color="primary"
    >
      Pick Background Color N°{{ number }}

      <v-dialog
        v-model="dialog"
        activator="parent"
        max-width="40%"
        width="fit-content"
      >
      <v-card title="Set background color to">
          <v-card-actions>
            <v-container>
                <v-row>
                <v-color-picker
                v-model="pickColor"
                mode="hexa"
                >
                </v-color-picker>
                </v-row>
                <v-row>
                <v-btn
                color="primary"
                @click="setBgColorEvent({color: pickColor, number: number })"
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
import { defineEmits } from 'vue';

const emit = defineEmits(['setBgColor']);

function setBgColorEvent(msg) {
    if (msg.color === null) {
        return;
    }
    console.log('setBgColorEvent', msg);
    emit('setBgColor', msg);
}

</script>

<script>
export default {
    name: 'BgColorPicker',
    props: {
        number: {
            type: String,
            required: true
        }
    },
    mounted() {
        this.colorNumber = this.$props.number;
    },
    data: () => ({
        dialog: false,
        pickColor: null,
        msg: null,
        colorNumber : null,
    }),
}
</script>