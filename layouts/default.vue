<template>
    <Navbar v-if="showNavbar"/>
    <NuxtPage />
    <Footer />
    <v-btn
    icon="mdi-chevron-up"
    color="primary"
    class="position-fixed"
    style="right: 16px;bottom: 16px;"
    size="small"
    elevation="5"
    @click="scrollTo()"
    />
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute();
const showNavbar = ref<boolean>(true);
// 滾動到頁面頂部
const scrollTo = ():void => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' 
    });
};

// 滾動軸的距離超過視窗一半的時候，出現navbar
const handleScroll = ():void => {
    if (route.path === '/'){
        showNavbar.value = window.scrollY > window.innerHeight / 2;
    }else{
        showNavbar.value = true
    }
}

// 偵測是否為首頁，是的話隱藏navbar
watch(()=> route.path,
(newPath:string)=>{
    if(newPath === '/'){
        showNavbar.value = false
    }else {
        showNavbar.value = true
    }
})
// 元件掛載後監聽滾動軸
onMounted(() => {
    if (route.path === '/') {
        window.addEventListener('scroll', handleScroll);
        handleScroll()
    }
});
// 元件卸載前移除滾動事件監聽
onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>