<template>
    <v-card
        class="mx-auto"
    >
        <v-img
        :src="props.src"
        class="position-relative"
        cover
        />
        <!-- 打折標籤 -->
        <span
        v-if="disc"
        class="position-absolute top-0 left-0 mt-5 bg-primary rounded-e-xl text-center"
        style="height: 32px;width: 95px;line-height: 32px;font-size: 14px;"
        >Flat 30% Off</span>
        <v-card-item>
        <v-card-title>
            <slot name="title" />
        </v-card-title>
        <template v-if="desc">
            <div class="d-flex my-2">
            <h3
                class="font-weight-black"
                style="max-width: 160px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;"
            >
                {{ title }}
            </h3>
            <!-- 評價 -->
            <v-icon
                icon="mdi-star"
                size="small"
                color="yellow-darken-3"
                class="ml-auto"
            />
            <span
                class="font-weight-bold"
                style="font-size: 14px;white-space: nowrap;"
            >{{ star }}
                <span class="font-weight-regular">/5</span>
            </span>
            </div>
            <v-card-text class="text-third pa-0">
            <h3 class="font-weight-regular text-body-2">
                <span
                style="color:#d23f57;"
                class="font-weight-medium"
                >{{ price }}</span>
                • Cofee, set menu • 15 - 20 min
            </h3>
            </v-card-text>
        </template>
        </v-card-item>
    </v-card>
</template>
<script setup lang="ts">
interface Props{
    title?: string;
    src?: string;
    disc?: boolean;
    desc?: boolean;
    star?: number;
    price? :string;
}
const props = withDefaults(defineProps<Props>(),{
    title: '',
    src: 'https://foodhub-nuxt.vercel.app/_nuxt/img/15.15c95d2.jpg',
    disc: false,
    desc: true,
    star: 4.5,
    price: '$20'
})
</script>