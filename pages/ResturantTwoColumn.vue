<template>
  <v-container>
    <v-breadcrumbs
      :items="items"
      class="pl-0 mt-12 mb-5 text-body-2"
    >
      <template #divider>
        <v-icon icon="mdi-chevron-right" />
      </template>
    </v-breadcrumbs>
    <v-tabs
      v-model="tab"
      color="primary"
    >
      <v-tab
        value="Delivery"
        class="text-capitalize"
      >
        Delivery
      </v-tab>
      <v-tab
        value="Dining Out"
        class="text-capitalize"
      >
        Dining Out
      </v-tab>
      <v-tab
        value="Nightlife"
        class="text-capitalize"
      >
        Nightlife
      </v-tab>
      <v-spacer />
      <v-btn
        text="RESET"
        color="primary"
        @click="clear()"
      />
    </v-tabs>

    <v-card-text>
      <v-tabs-window
        v-model="tab"
      >
        <v-tabs-window-item
          v-for="item in tabName"
          :key="item"
          :value="item"
        >
          <v-row>
            <v-col
              cols="12"
              class="d-flex flex-row"
            >
              <div
                class="d-none d-md-flex flex-column "
                style="width: 280px;border-right: 1px solid #BDBDBD;"
              >
                <h4>Categories</h4>
                <div
                  v-for="label in labels"
                  :key="label"
                >
                  <v-checkbox
                    v-model="selectedCategories"
                    :label="label"
                    :value="label"
                    density="comfortable"
                    hide-details
                    style="height: 30px;"
                  />
                </div>
                <h4 class="mt-5">
                  Star
                </h4>
                <div
                  v-for="i in [5, 4, 3, 2, 1]"
                  :key="i"
                >
                  <v-checkbox
                    v-model="selectedStar"
                    :label="`${i}+`"
                    :value="i"
                    density="comfortable"
                    hide-details
                    style="height: 30px;"
                  />
                </div>
                <h4 class="mt-5">
                  Sort By
                </h4>
                <div>
                  <v-radio-group
                    v-for="radio in radios"
                    :key="radio"
                    v-model="selectedSortBy"
                    column
                    density="comfortable"
                    hide-details
                  >
                    <v-radio
                      color="primary"
                      :label="radio"
                      :value="radio"
                    />
                  </v-radio-group>
                </div>
                <h4 class="mt-5">
                  Cost per person
                </h4>
                <div class="my-15 pl-4">
                  <v-range-slider
                    v-model="range"
                    step="10"
                    color="primary"
                    thumb-label="always"
                    width="180"
                    thumb-size="10"
                    track-size="2"
                  />
                </div>
              </div>
              
              <div class="px-10 px-md-0 px-lg-10 w-100">
                <v-col
                  cols="12"
                  class="d-md-none"
                >
                  <v-btn
                    prepend-icon="mdi-menu"
                    text="Categories"
                    color="primary"
                    @click="drawer = !drawer"
                  />
                  <v-navigation-drawer
                    v-model="drawer"
                    class="pa-4"
                    temporary
                    style="z-index: 1100;"
                  >
                    <div
                      class="d-flex flex-column"
                    >
                      <h4>Categories</h4>
                      <div
                        v-for="label in labels"
                        :key="label"
                      >
                        <v-checkbox
                          v-model="selectedCategories"
                          :label="label"
                          :value="label"
                          density="comfortable"
                          hide-details
                          style="height: 30px;"
                        />
                      </div>
                      <h4 class="mt-5">
                        Star
                      </h4>
                      <div
                        v-for="i in 5"
                        :key="i"
                      >
                        <v-checkbox
                          v-model="selectedStar"
                          :label="`${i}+`"
                          :value="i"
                          density="comfortable"
                          hide-details
                          style="height: 30px;"
                        />
                      </div>
                      <h4 class="mt-5">
                        Sort By
                      </h4>
                      <div>
                        <v-radio-group
                          v-for="radio in radios"
                          :key="radio"
                          v-model="selectedSortBy"
                          column
                          density="comfortable"
                          hide-details
                        >
                          <v-radio
                            color="red"
                            :label="radio"
                            :value="radio"
                          />
                        </v-radio-group>
                      </div>
                      <h4 class="mt-5">
                        Cost per person
                      </h4>
                      <div class="my-15 pl-4">
                        <v-range-slider
                          v-model="range"
                          step="10"
                          color="primary"
                          thumb-label="always"
                          width="180"
                          thumb-size="10"
                          track-size="2"
                        />
                      </div>
                    </div>
                  </v-navigation-drawer>
                </v-col>
                <v-col cols="12">
                  <h3 class="mb-5">
                    184 Delivery Restaurants in New York
                  </h3>
                </v-col>
                <v-col cols="12">
                  <v-row>
                    <v-col
                      v-if="isEmpty"
                      cols="12"
                      class="text-center"
                    >
                      <h1 class="text-grey-lighten-1 text-h2 font-weight-medium my-15">
                        No products match your filter criteria
                      </h1>
                    </v-col>
                    <v-col
                      v-for="card in filteredCards"
                      :key="card.title"
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <NuxtLink
                        to="/FoodMenu"
                        class="text-decoration-none"
                      >
                        <Card
                          :src="card.img"
                          :title="card.title"
                          :star="card.star"
                          :price="`$${card.price}`"
                          :disc="card.discount"
                        />
                      </NuxtLink>
                    </v-col>
                  </v-row>
                </v-col>
              </div>
            </v-col>
          </v-row>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card-text>
  </v-container>
</template>
<script setup lang="ts">
import type { Products } from '@/types/card';

interface Items{
  title:string;
  disabled:boolean;
  href?:string;
}

const items = ref<Items[]>([
  {
    title: 'Home',
    disabled: false,
    href: '/',
  },
  {
    title: 'New York',
    disabled: false,
    href: '/',
  },
  {
    title: 'Resturants',
    disabled: true
  }
]);

const tab= ref<string>('Delivery');
const tabName = ref<string[]>([
  'Delivery',
  'Dining Out',
  'Nightlife'
])
const labels = ref<string[]>([
  'sushi',
  'salad',
  'dessert'
]);
const radios = ref<string[]>([
  'Prise',
  'A-Z',
  'Star'
]);
const range = ref<number[]>([0,100]);

const cards = ref<Products[]>([
  {img:'https://foodhub-nuxt.vercel.app/_nuxt/img/15.15c95d2.jpg',title:'Starbucks',category:'salad', star:4, price:50, OnSale:true},
  {img:'https://foodhub-nuxt.vercel.app/_nuxt/img/16.bbc24cb.jpg',title:'Sushi',category:'sushi', star:4.3, price:75, OnSale:true},
  {img:'https://foodhub-nuxt.vercel.app/_nuxt/img/19.a1e7280.jpg',title:'Salad',category:'salad', star:5, price:95, OnSale:false},
  {img:'https://foodhub-nuxt.vercel.app/_nuxt/img/20.ce4b89f.jpg',title:'Mughal Masala',category:'salad', star:3.4, price:60, OnSale:true},
  {img:'https://foodhub-nuxt.vercel.app/_nuxt/img/22.c99d20e.jpg',title:'Red Chillies',category:'dessert', star:3.8, price:100, OnSale:true},
  {img:'https://imgs.699pic.com/images/600/169/053.jpg!list1x.v2',title:'Cookie',category:'dessert', star:4.4, price:30, OnSale:false}
]);
const drawer = ref<boolean>(false)
const selectedCategories = ref<string[]>([]);
const selectedSortBy = ref<string>('Prise')
const selectedStar = ref<number[]>([]);
const isEmpty = ref<boolean>(false)

// 依條件篩選商品
const filteredCards = computed<Products[]>(() => {
  const filtered = cards.value.filter(card => {
    const categoryMatches = selectedCategories.value.length === 0 || selectedCategories.value.includes(card.category)
    const starMatches = selectedStar.value.length === 0 || selectedStar.value.some(star => (card.star ?? 0) >= star)
    const priceMatches = card.price >= range.value[0] && card.price <= range.value[1]
    return categoryMatches && starMatches && priceMatches;
  });
  
  if (selectedSortBy.value === 'Prise') {
    return filtered.sort((a, b) => a.price - b.price) // 價格排序 升序
  } else if (selectedSortBy.value === 'A-Z') {
    return filtered.sort((a, b) => a.title.localeCompare(b.title)); // 字符串比較
  } else if (selectedSortBy.value === 'Star') {
    return filtered.sort((a, b) => (b.star ?? 0) - (a.star ?? 0)) // 星星排序
  }
  return filtered;
});

const clear = ():void =>{
  selectedCategories.value = []
  selectedStar.value = []
  range.value = [0,100]
  selectedSortBy.value = 'Prise'
}
watch(filteredCards, (newFiltered:Products[]) => { // 確認符合條件的商品是否為空
  if (newFiltered.length === 0) {
    isEmpty.value = true;
  } else {
    isEmpty.value = false;
  }
});
</script>
<style scoped>
::v-deep .v-slider-thumb__label{
  height: 35px;
  width: 35px;
  background: #d23f57;
  border: 1px solid #d23f57;
  border-radius: 50% 50% 0 50%;
  transform:translateY(-20%) translateY(-5px) translateX(-50%) rotate(45deg) !important;
}

::v-deep .v-slider-thumb__label::before {
  display: none;
}
::v-deep .v-slider-thumb__label div{
  transform:rotate(-45deg) !important;
}
</style>