<template>
    <v-navigation-drawer
      v-model="close"
      width="320"
      temporary
      location="end"
      style="position: fixed;z-index: 1010;"
    >
      <div
        class="d-flex flex-column justify-space-between"
        style="height: 100%;"
      >
     <div>
          <v-toolbar
            class="px-2 font-weight-bold text-h6"
            density="comfortable"
            color="white"
          >
            <v-icon
              icon="mdi-shopping-outline"
              size="small"
              color="third"
            />
            <span class="mx-2 text-body-1 text-third font-weight-medium"> Item</span>
            <v-spacer />
            <v-btn
              icon="mdi-close"
              color="primary"
              size="small"
              @click="closeSidebar"
            />
          </v-toolbar>
          <v-divider />
          <div
            v-if="cartStore.cartItemCount==0"
            class=" my-15"
          >
            <router-link
              to="/FoodMenu"
              class="text-decoration-none"
            > 
              <div
                class=" text-grey-lighten-1 text-center text-h5 font-weight-medium"
                @click="close=!close"
              >
                Cart is empty!
                <div>
                  Start shopping! <v-icon
                    icon="mdi-cursor-default-click"
                    size="small"
                  />
                </div>
              </div>
            </router-link>
          </div>
          <v-list
            v-for="(item, index) in cartStore.items"
            :key="index"
            class="d-flex flex-row align-center my-3"
          >
            <div class="d-flex flex-column ml-2 text-center">
              <v-btn
                icon="mdi-plus"
                variant="outlined"
                color="primary"
                size="x-small"
                width="28"
                height="28"
                class="mx-auto"
                @click="increaseQuantity(item)"
              />
              <span class="my-2">{{ item.quantity }}</span>
              <v-btn
                icon="mdi-minus"
                variant="outlined"
                color="primary"
                size="x-small"
                width="28"
                height="28"
                class="mx-auto"
                @click="decreaseQuantity(item)"
              />
            </div>
            <div class="d-flex align-center text-left px-4">
              <v-avatar
                rounded
                style="width: 64px;height: 64px;"
              >
                <v-img :src="item.img" />
              </v-avatar>
              <div class="pl-6">
                <h4
                  class="d-inline-block text-truncate"
                  style="max-width: 100px;"
                >
                  {{ item.title }}
                </h4> 
                <p class="text-12 mb-0 text-body-2">
                  ${{ item.price }} x 1
                </p> 
                <h4 class="text-primary">
                  ${{ item.discount }}
                </h4>
              </div>
            </div>
            <div class="me-3 ml-auto">
              <v-btn
                icon="mdi-close"
                color="third"
                size="small"
                variant="text"
                @click="removeFromCart(item)"
              />
            </div>
          </v-list>
        </div>
      
        <div class="px-2">
          <LongButton
            :text="`Checkout Now ($${ cartStore.totalPrice })`"
            @click="checkout"
          />
          <LongButton
            text="VIEW CART"
            variant="outlined"
          />
        </div>
      </div>
    </v-navigation-drawer>
  </template>
<script setup lang="ts">
import type { Products } from '@/types/card';
import { useCartStore } from '@/stores/cart';
import { useSnackbar } from 'vuetify-use-dialog';
const createSnackbar = useSnackbar()

const cartStore = useCartStore();

const props = withDefaults(defineProps<{ modelValue: boolean }>(), {
  modelValue: false 
});

const emit = defineEmits<{
  (e:'update:modelValue', value: boolean):void
}>()

const close = ref<boolean>(props.modelValue)

const closeSidebar = ():void => {
  close.value = false;
};
  
// 商品數量 +1
const increaseQuantity = (item: Products): void => {
  cartStore.updateQuantity(item.title, (item.quantity ?? 0) + 1)
};
  
// 商品數量 -1
const decreaseQuantity = (item: Products): void => {
  if ((item.quantity ?? 0) > 1) {
    cartStore.updateQuantity(item.title, (item.quantity ?? 0) - 1);
  }
};
  
// 刪除商品
const removeFromCart = (item: Products): void => {
  cartStore.removeItem(item.title);
};

// 結帳
const checkout = (): void => {
  if(cartStore.totalPrice){
    createSnackbar({
      showCloseButton: true,
      text: `Total Price: $${cartStore.totalPrice}`,
      snackbarProps: {
        color: 'primary'
      }
    })
  }
};
watch(() => props.modelValue, (newVal: boolean) => {
  close.value = newVal;
});
watch(close, (newVal: boolean) => {
  emit('update:modelValue', newVal);
});
</script>