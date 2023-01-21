<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['setBgAnim'])

function emitBgAnimEvent(item) {
  emit('setBgAnim', item)
}
</script>
<template>
    <div class="text-center">
                <v-btn
                color="primary"
                :key="i"
                v-for="(item, i) in BgItems"
                @click="emitBgAnimEvent(item)"
                >
                Set Background to {{ item.title }}
                </v-btn>
        </div>
</template>

<script>
export default {
    name: 'BgDropdown',
    props: {
        BgItems: {
            type: Array[Object],
            required: true
        }
    },
}
</script>