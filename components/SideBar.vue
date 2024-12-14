<template>
    <v-navigation-drawer
        v-model="close"
        width="320"
        temporary
        style="position:fixed;height: 100%;"
    >
        <v-toolbar
        class="px-2 font-weight-bold text-h6 bg-white"
        style="height: 45px;"
        >
        <span class="mx-3 text-body-1 font-weight-black text-grey-darken-3">Navbar</span>
        <v-spacer />
        <v-btn
            size="small"
            color="third"
            icon="mdi-close"
            @click="closeSidebar()"
        />
        </v-toolbar>

        <v-list v-model:opened="open">
        <template
            v-for="(menu, index) in drawMenus"
            :key="index"
        >
            <v-list-group :value="menu.title">
            <!-- 顯示分組標題和圖標 -->
            <template #activator="{ props }">
                <v-list-item
                color="primary"
                v-bind="props"
                :prepend-icon="menu.icon"
                :title="menu.title"
                />
            </template>

            <!-- 顯示分組中的項目 -->
            <router-link
                class="text-decoration-none text-third"
                to="/ResturantTwoColumn"
            >
                <v-list-item
                v-for="(item, idx) in menu.items"
                :key="idx"
                :title="item"
                :value="item"
                color="primary"
                @click="close = !close"
                />
            </router-link>
            </v-list-group>
        </template>
        </v-list>
    </v-navigation-drawer>
</template>
<script setup lang="ts">
interface Menu{
    title:string;
    icon:string;
    items:string[];
}

interface Props{
    modelValue?:boolean
}
const open = ref<string>('Dashboards')
const drawMenus = computed<Menu[]>(() => {
return [
    { title:'Dashboards', icon:'mdi-view-dashboard-variant-outline', items:['Review', 'Photos', 'Order List', 'Order History', 'Followers', 'Bookmarks']},
    { title:'Resturant', icon:'mdi-silverware-fork-knife', items:['Food Menu', 'Resturant Two Column', 'Search Restaurant']}
]
})

const props = withDefaults(defineProps<Props>(),{
    modelValue:false
})
const emit = defineEmits<{
    (e:'update:modelValue',value: boolean):void;
}>()
const close = ref<boolean>(props.modelValue)

const closeSidebar = ():void => {
    close.value = true;
};


watch(() => props.modelValue, (newVal:boolean) => {
    close.value = newVal;
});
watch(close, (newVal:boolean) => {
    emit('update:modelValue', newVal);
});

</script>