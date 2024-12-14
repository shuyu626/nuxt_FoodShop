<template>
    <v-btn
        class="w-100 my-2 text-capitalize font-weight-regular"
        :color="color"
        :variant="variant"
        >
        {{ text }}
    </v-btn>
</template>
<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';
interface Props{
    text?: string;
    color?: string;
    variant?: 'text' | 'flat' | 'elevated' | 'outlined' | 'plain';
}
const props = withDefaults(defineProps<Props>(),{
    text: 'Login',
    color: 'primary',
    variant: 'flat',
})
</script>