<template>
  <div class="flex flex-col gap-2">
    <div
      class="text-[20px] font-bold"
      :class="{
        'text-red': isError,
      }"
    >
      {{ isError && errorMessage ? errorMessage : "Create watch" }}
    </div>

    <form
      ref="brandCreation"
      @submit.prevent="handleWatchCreation"
      class="flex flex-col gap-4"
    >
      <div class="grid grid-cols-3 gap-4">
        <div v-for="(field, i) in Object.keys(watchCreationForm)" :key="i">
          <div>{{ field }}:</div>
          <template v-if="field === 'photos'">
            <div class="flex flex-col gap-4">
              <input
                type="file"
                multiple
                @change="onBrandFileChanged($event, field)"
                accept="image/*"
                capture
              />
              <div>Loaded {{ watchCreationForm[field].length }} images</div>
            </div>
          </template>
          <template v-else-if="handbooksForFields[field]">
            <select v-model="watchCreationForm[field]">
              <option disabled :value="null">Select {{ field }}</option>
              <option
                v-for="item in getHandbooksForField(field)"
                :key="item.id"
                :value="item.id || item.value"
              >
                {{ item.title_en || item.value_en || item.title }} -
                {{ item.id || item.value }}
              </option>
            </select>
          </template>

          <template v-else-if="field === 'listing_date'">
            <input
              type="datetime-local"
              :value="
                useDateFormat(watchCreationForm[field], 'YYYY-MM-DDThh:mm')
                  .value
              "
              @blur="
                (e) =>
                  (watchCreationForm[field] = new Date(
                    e.target.value
                  ).toISOString())
              "
              :name="field"
            />
          </template>

          <input v-else type="text" v-model="watchCreationForm[field]" />
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <AppButton>Create new watch</AppButton>
        <div v-if="isLoading">loading</div>
        <div v-if="isSuccess">New brand created</div>
        <div class="mt-3" v-if="isError && errors.length">
          <pre class="p-6 w-full flex flex-col gap-6">
            <div v-for="(e, i) in errors" :key="i">{{ e.field }}:  {{ e.message }}</div>  
          </pre>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useDateFormat } from "@vueuse/core";
import { Handbook, IBrand, IWatch, TResponse, TResponseSingle } from "~/types";
const brandCreation = ref(null);
const watchCreationForm = ref({
  brand_id: 0,
  model_en: "",
  model_ru: "",
  model_es: "",
  model_cn: "",
  purchase_price: 0,
  investment_price: 0,
  currency: 0,
  reference: "",
  water_resistance: 0,
  body_diameter: 0,
  mechanism_type_en: "nodata",
  mechanism_type_ru: "нет данных",
  mechanism_type_es: "sin datos",
  mechanism_type_cn: "没有数据",
  power_reserve: 0,
  caliber: 0,
  condition_en: "nodata",
  condition_ru: "нет данных",
  condition_es: "sin datos",
  condition_cn: "没有数据",
  watch_type: 0,
  current_nft_address: "string",
  contract_of_sale_nft: "string",
  token_id_nft: 0,
  metadata_nft: 0,
  holder_fees_percent_nft: 0,
  transfer_fee_percent_nft: 0,
  listing_bidding_cancellation_nft: 0,
  gender_en: "unisex",
  gender_ru: "унисекс",
  gender_es: "unisexo",
  gender_cn: "男女通用的",
  reference_number: "string",
  listing_code: "string",
  listing_date: "2023-11-03T10:30:50.433Z",
  location: 0,
  count: 0,
  is_best: false,
  collection_id: 1,
  body_material_id: 37,
  strap_material_id: 49,
  dial_color_id: 22,
  function_ids: [],
  photos: [],
});

const searchStore = useNewSearchStore();

const handbooksForFields = <Record<string, Handbook>>{
  body_material_id: Handbook.body_materials,
  strap_material_id: Handbook.strap_materials,
  brand_id: Handbook.brands,
  dial_color_id: Handbook.dial_colors,
  mechanism_type_en: Handbook.mechanism_types_en,
  mechanism_type_cn: Handbook.mechanism_types_cn,
  mechanism_type_es: Handbook.mechanism_types_es,
  mechanism_type_ru: Handbook.mechanism_types_ru,
  condition_en: Handbook.conditions_en,
  condition_ru: Handbook.conditions_ru,
  condition_es: Handbook.conditions_es,
  condition_cn: Handbook.conditions_cn,
  gender_en: Handbook.genders_en,
  gender_ru: Handbook.genders_ru,
  gender_es: Handbook.genders_es,
  gender_cn: Handbook.genders_cn,
  collection_id: Handbook.collections,
  function_ids: Handbook.functions,
};

function getHandbooksForField(field: string) {
  if (handbooksForFields[field]) {
    const foundHandbook = handbooksForFields[field];
    return searchStore.handbooks[foundHandbook];
  }
  return [];
}

const form = ref<HTMLFormElement>();
const isSuccess = ref(false);
const isError = ref(false);
const errorMessage = ref("");
const isLoading = ref(false);
const errors = ref([]);

function onBrandFileChanged(event: Event, field: string) {
  watchCreationForm.value[field] = [];
  const target = event.target as HTMLInputElement;

  const files = target.files || [];

  Object.entries(files).forEach((file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      watchCreationForm.value[field].push({
        data_url: reader.result?.toString(),
      });
    };

    reader.readAsDataURL(file[1]);
  });
}
async function handleWatchCreation() {
  errorMessage.value = "";
  errors.value = [];
  isSuccess.value = false;
  isError.value = false;
  isLoading.value = true;

  const { data, error } = await useApiFetch<TResponseSingle<IWatch>>(
    "watches",
    {
      method: "POST",
      body: watchCreationForm.value,
    }
  );
  if (error.value) {
    errorMessage.value = error.value.data.error;
    if (error.value.data.validation_error) {
      errors.value = error.value.data.validation_error;
    }

    isError.value = true;
  }

  if (data.value) {
    isSuccess.value = true;
    watchCreationForm.value = {
      brand_id: 0,
      model_en: "",
      model_ru: "",
      model_es: "",
      model_cn: "",
      purchase_price: 0,
      investment_price: 0,
      currency: 0,
      reference: "",
      water_resistance: 0,
      body_diameter: 0,
      mechanism_type_en: "nodata",
      mechanism_type_ru: "нет данных",
      mechanism_type_es: "sin datos",
      mechanism_type_cn: "没有数据",
      power_reserve: 0,
      caliber: 0,
      condition_en: "nodata",
      condition_ru: "нет данных",
      condition_es: "sin datos",
      condition_cn: "没有数据",
      watch_type: 0,
      current_nft_address: "string",
      contract_of_sale_nft: "string",
      token_id_nft: 0,
      metadata_nft: 0,
      holder_fees_percent_nft: 0,
      transfer_fee_percent_nft: 0,
      listing_bidding_cancellation_nft: 0,
      gender_en: "unisex",
      gender_ru: "унисекс",
      gender_es: "unisexo",
      gender_cn: "男女通用的",
      reference_number: "string",
      listing_code: "string",
      listing_date: "2023-11-03T10:30:50.433Z",
      location: 0,
      count: 0,
      is_best: false,
      collection_id: 1,
      body_material_id: 37,
      strap_material_id: 49,
      dial_color_id: 22,
      function_ids: [],
      photos: [],
    };
  }

  isLoading.value = false;
}
</script>

<style scoped></style>
