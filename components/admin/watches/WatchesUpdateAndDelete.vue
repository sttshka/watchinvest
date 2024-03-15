<template>
  <div class="flex flex-col gap-2">
    <div
      class="text-[20px] font-bold"
      :class="{
        'text-red': isError,
      }"
    >
      {{ isError && errorMessage ? errorMessage : "Update watch" }}
    </div>

    <div class="flex gap-4">
      <select v-model="selectedBrandId" placeholder="Select brand">
        <option :value="null">Please select one watch</option>
        <option
          v-for="item in getHandbooksForField('watches')"
          :key="item.id"
          :value="item.id"
        >
          {{ item.model_en }} -
          {{ item.id }}
        </option>
      </select>

      <AppButton @click="handleGetWatch">Get watch</AppButton>
      <AppButton @click="handleClear()" dark>Clear</AppButton>
    </div>

    <form
      ref="brandCreation"
      @submit.prevent="handleBrandUpdate"
      class="flex flex-col gap-4"
    >
      <div class="grid grid-cols-4 gap-4">
        <div v-for="field in Object.keys(brandsUpdateForm)">
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
              <div>Loaded {{ brandsUpdateForm[field].length }} images</div>
            </div>
          </template>

          <template v-if="handbooksForFields[field]">
            <select v-model="brandsUpdateForm[field]" :disabled="!brandLoaded">
              <option disabled :value="null">Select {{ field }}</option>
              <option
                v-for="item in getHandbooksForField(field)"
                :key="item.id"
                :value="item.id || item.value"
              >
                {{ item.title_en || item.name_en || item.title }} -
                {{ item.id || item.value }}
              </option>
            </select>
          </template>

          <template v-else-if="field === 'listing_date'">
            aboba
            <input
              type="datetime-local"
              :value="
                useDateFormat(brandsUpdateForm[field], 'YYYY-MM-DDThh:mm').value
              "
              @blur="
                (e) =>
                  (brandsUpdateForm[field] = new Date(
                    e.target.value
                  ).toISOString())
              "
              :name="field"
            />
          </template>

          <input
            v-else
            type="text"
            :placeholder="`…`"
            :disabled="!brandLoaded"
            v-model="brandsUpdateForm[field]"
          />
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <div class="flex gap-4">
          <AppButton :disabled="!brandLoaded || !brand">Update watch</AppButton>
          <AppButton
            v-if="brandLoaded"
            @click="handleDeleteBrand"
            class="!bg-red hover:!bg-red"
            >Delete</AppButton
          >
        </div>
        <div v-if="isLoading">loading</div>
        <div class="text-green" v-if="isSuccess">Success</div>
        <div class="mt-3" v-if="isError && errors.length">
          <pre class="p-6 w-full flex flex-col gap-6">
            <div  v-for="e in errors">{{ e.field }}:  {{ e.message }}</div>  
          </pre>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { Handbook, IWatch, TResponseSingle } from "~/types";
import { useDateFormat } from "@vueuse/core";

const selectedBrandId = ref(null);
const brand = computed(() => selectedBrandId.value);
watch(brand, () => {
  handleClear(true);
});

const emit = defineEmits(["update:modelValue"]);

const brandCreation = ref(null);
const brandsUpdateForm = ref({
  model_en: "string",
  model_ru: "string",
  model_es: "string",
  model_cn: "string",
  purchase_price: 0,
  investment_price: 0,
  currency: 0,
  reference: "string",
  water_resistance: 0,
  body_diameter: 0,
  mechanism_type_en: "auto winding",
  mechanism_type_ru: "автоподзавод",
  mechanism_type_es: "cuerda automática",
  mechanism_type_cn: "自动绕线",
  power_reserve: 0,
  caliber: 0,
  condition_en: "new",
  condition_ru: "новые",
  condition_es: "nuevos",
  condition_cn: "新的",
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
  listing_date: "2023-11-06T05:19:22.973Z",
  location: 0,
  count: 0,
  is_best: true,
  brand_id: 0,
  collection_id: 0,
  body_material_id: 0,
  strap_material_id: 0,
  dial_color_id: 0,
  function_ids: [],
  photos: [],
});

const form = ref<HTMLFormElement>();
const isSuccess = ref(false);
const isError = ref(false);
const errorMessage = ref("");
const isLoading = ref(false);
const errors = ref([]);
const brandLoaded = ref(false);

function onBrandFileChanged(event: Event, field: string) {
  brandsUpdateForm.value[field] = [];
  const target = event.target as HTMLInputElement;

  const files = target.files || [];

  Object.entries(files).forEach((file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      brandsUpdateForm.value[field].push({
        data_url: reader.result?.toString(),
      });
    };

    reader.readAsDataURL(file[1]);
  });
}

async function handleGetWatch() {
  isLoading.value = true;
  brandLoaded.value = false;
  isSuccess.value = false;

  if (!selectedBrandId.value) {
    return;
  }

  const { data, error } = await useApiFetch<TResponseSingle<IWatch>>(
    `watches/${selectedBrandId.value}`,
    {
      method: "GET",
    }
  );

  if (error.value) {
    errorMessage.value = error.value.data.error;
    isError.value = true;
  }

  if (data.value) {
    const brandData = data.value.data;
    if (brandData) {
      const {
        dial_color,
        collection,
        brand,
        body_diameter,
        body_material,
        condition_cn,
        condition_en,
        condition_ru,
        condition_es,
        gender_cn,
        gender_en,
        gender_es,
        gender_ru,
        mechanism_type_cn,
        mechanism_type_en,
        mechanism_type_es,
        mechanism_type_ru,
        model_cn,
        model_en,
        model_es,
        model_ru,
        reference,
        location,
        currency,
        current_nft_address,
        count,
        caliber,
        contract_of_sale_nft,
        atime,
        ctime,
        dtime,
        en,
        holder_fees_percent_nft,
        investment_price,
        is_best,
        listing_bidding_cancellation_nft,
        listing_code,
        listing_date,
        metadata_nft,
        photos,
        power_reserve,
        purchase_price,
        reference_number,
        token_id_nft,
        transfer_fee_percent_nft,
        water_resistance,
        watch_type,
      } = brandData;
      const itemToEdit = {
        dial_color_id: dial_color?.id,
        collection_id: collection?.id,
        body_material_id: body_material?.id,
        brand_id: brand?.id,
        body_diameter,
        condition_cn,
        condition_en,
        condition_ru,
        condition_es,
        gender_cn,
        gender_en,
        gender_es,
        gender_ru,
        mechanism_type_cn,
        mechanism_type_en,
        mechanism_type_es,
        mechanism_type_ru,
        watch_type,
        model_cn,
        model_en,
        model_es,
        model_ru,
        reference,
        location,
        currency,
        caliber,
        current_nft_address,
        count,
        contract_of_sale_nft,
        atime,
        ctime,
        dtime,
        en,
        holder_fees_percent_nft,
        investment_price,
        is_best,
        listing_bidding_cancellation_nft,
        listing_code,
        listing_date,
        metadata_nft,
        photos,
        power_reserve,
        purchase_price,
        reference_number,
        token_id_nft,
        transfer_fee_percent_nft,
        water_resistance,
      };
      delete brandData.id;

      brandsUpdateForm.value = { ...itemToEdit };
      brandLoaded.value = true;
      errorMessage.value = "";
      isError.value = false;
      errors.value = [];
    }
  }

  isLoading.value = false;
}

async function handleBrandUpdate() {
  if (!selectedBrandId.value) {
    return;
  }

  errorMessage.value = "";
  errors.value = [];
  isSuccess.value = false;
  isError.value = false;
  isLoading.value = true;

  const preparedData = {};
  Object.entries(brandsUpdateForm.value).forEach(([key, value]) => {
    if (value != null) {
      preparedData[key] = value;
    }
  });

  const { data, error } = await useApiFetch<TResponseSingle<IWatch>>(
    `watches/${selectedBrandId.value}`,
    {
      method: "POST",
      body: brandsUpdateForm.value,
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
    handleClear();
    isSuccess.value = true;
  }

  isLoading.value = false;
}

async function handleDeleteBrand() {
  if (!selectedBrandId.value) {
    return;
  }

  errorMessage.value = "";
  errors.value = [];
  isSuccess.value = false;
  isError.value = false;
  isLoading.value = true;

  const { data, error } = await useApiFetch<TResponseSingle<IWatch>>(
    `watches/${selectedBrandId.value}`,
    {
      method: "DELETE",
    }
  );

  if (error.value) {
    errorMessage.value = error.value.data.error;
    isError.value = true;
  }

  if (data.value) {
    handleClear();
    isSuccess.value = true;
  }

  isLoading.value = false;
}

function handleClear(noEmit = false) {
  errorMessage.value = "";
  isError.value = false;
  errors.value = [];
  isSuccess.value = false;

  brandLoaded.value = false;
  brandsUpdateForm.value = {
    model_en: "string",
    model_ru: "string",
    model_es: "string",
    model_cn: "string",
    purchase_price: 0,
    investment_price: 0,
    currency: 0,
    reference: "string",
    water_resistance: 0,
    body_diameter: 0,
    mechanism_type_en: "auto winding",
    mechanism_type_ru: "автоподзавод",
    mechanism_type_es: "cuerda automática",
    mechanism_type_cn: "自动绕线",
    power_reserve: 0,
    caliber: 0,
    condition_en: "new",
    condition_ru: "новые",
    condition_es: "nuevos",
    condition_cn: "新的",
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
    listing_date: "2023-11-06T05:19:22.973Z",
    location: 0,
    count: 0,
    is_best: true,
    brand_id: 0,
    collection_id: 0,
    body_material_id: 0,
    strap_material_id: 0,
    dial_color_id: 0,
    function_ids: [],
    photos: [],
  };

  if (!noEmit) {
    emit("update:modelValue", null);
  }
}

const searchStore = useNewSearchStore();
const handbooksForFields = <Record<string, Handbook>>{
  body_material: "body_materials",
  strap_material: "strap_materials",
  watches: "watches",
  dial_color: "dial_colors",
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
</script>

<style scoped></style>
