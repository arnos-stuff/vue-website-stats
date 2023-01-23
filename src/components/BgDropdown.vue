<script setup>
import { defineEmits } from 'vue'
import { useDisplay } from 'vuetify'
const { mobile, width } = useDisplay()

const emit = defineEmits(['setBgAnim'])

function emitBgAnimEvent(item) {
  emit('setBgAnim', item)
}
</script>

<template>
  <div class="text-center">
    <v-col>
    <v-btn
      color="primary"
      :width="0.2*width"
      :max-width="0.3 * width"
      :prepend-icon="hover ? 'mdi-animation' : 'mdi-animation-outline'"
    >
      {{ mobile ? 'Anim' : 'Pick Background Animation' }}

      <v-dialog
        v-model="dialog"
        activator="parent"
        :max-width="mobile ? 0.9*width : 'fit-content'"
      >
      <v-card title="Set background animation to">
          <v-card-actions>
            <v-spacer></v-spacer>
                <v-row>
                <v-btn
                color="primary"
                :key="i"
                v-for="(item, i) in BgItems"
                @click="emitBgAnimEvent(item)"
                >
                {{ item.title }}
                </v-btn>
                </v-row>
          </v-card-actions>
        </v-card>
        
      </v-dialog>
    </v-btn>
</v-col>
  </div>
</template>

<script>
export default {
    name: 'BgDropdown',
    props: {
        BgItems: {
            type: Array[Object],
            required: true
        },
    },
    data: () => ({
        dialog: false,
    }),
}
</script>