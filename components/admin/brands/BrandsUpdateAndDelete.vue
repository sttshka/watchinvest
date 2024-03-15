<template>
  <div class="flex flex-col gap-2">
    <div
      class="text-[20px] font-bold"
      :class="{
        'text-red': isError,
      }"
    >
      {{ isError && errorMessage ? errorMessage : "Update brand" }}
    </div>

    <div class="flex gap-4">
      <select v-model="selectedBrandId" placeholder="Select brand">
        <option disabled value="">Please select one brand</option>
        <option
          v-for="brand in searchStore.handbooks[Handbook.brands]"
          :key="brand.id"
          :value="brand.id"
        >
          {{ brand.title_en }} - {{ brand.id }}
        </option>
      </select>
      <AppButton @click="handleGetBrand">Load selected brand data</AppButton>
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
          <template v-if="field === 'image'">
            <input
              :disabled="!brandLoaded"
              type="file"
              @change="onBrandFileChanged($event)"
              accept="image/*"
              capture
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
          <AppButton :disabled="!brandLoaded || !selectedBrandId"
            >Update brand</AppButton
          >
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
import { IBrand, TResponseSingle } from "~/types";
import { Handbook } from "~/types";
const searchStore = useNewSearchStore();
const selectedBrandId = ref(null);

const brandCreation = ref(null);
const brandsUpdateForm = ref({
  title_en: "",
  title_ru: "",
  title_es: "",
  title_cn: "",
  description_en: "",
  description_ru: "",
  description_es: "",
  description_cn: "",
  image: {
    data_url: "",
  },
});

const form = ref<HTMLFormElement>();
const isSuccess = ref(false);
const isError = ref(false);
const errorMessage = ref("");
const isLoading = ref(false);
const errors = ref([]);
const brandLoaded = ref(false);

function onBrandFileChanged(event: Event) {
  var reader = new FileReader();
  const target = event.target as HTMLInputElement;

  if (target && target.files) {
    reader.onloadend = () => {
      brandsUpdateForm.value.image.data_url = reader.result;
    };
    reader.readAsDataURL(target.files[0]);
  }
}

async function handleGetBrand() {
  isLoading.value = true;
  brandLoaded.value = false;
  isSuccess.value = false;

  if (selectedBrandId.value == null) {
    return;
  }

  const { data, error } = await useApiFetch<TResponseSingle<IBrand>>(
    `brands/${selectedBrandId.value}`,
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
    delete brandData.id;
    brandsUpdateForm.value = brandData;
    brandLoaded.value = true;
    errorMessage.value = "";
    isError.value = false;
    errors.value = [];
  }

  isLoading.value = false;
}

async function handleBrandUpdate() {
  if (selectedBrandId.value == null) {
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

  const { data, error } = await useApiFetch<TResponseSingle<IBrand>>(
    `brands/${selectedBrandId.value}`,
    {
      method: "POST",
      body: brandsUpdateForm.value,
    }
  );
  if (error.value) {
    errorMessage.value = error.value.data.error;
    errors.value = error.value.data.validation_error;

    isError.value = true;
  }

  if (data.value) {
    handleClear();
    isSuccess.value = true;
  }

  isLoading.value = false;
}

async function handleDeleteBrand() {
  if (selectedBrandId == null) {
    return;
  }

  errorMessage.value = "";
  errors.value = [];
  isSuccess.value = false;
  isError.value = false;
  isLoading.value = true;

  const { data, error } = await useApiFetch<TResponseSingle<IBrand>>(
    `brands/${selectedBrandId.value}`,
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
  selectedBrandId.value = null;

  brandLoaded.value = false;
  brandsUpdateForm.value = {
    title_en: "",
    title_ru: "",
    title_es: "",
    title_cn: "",
    description_en: "",
    description_ru: "",
    description_es: "",
    description_cn: "",
    image: {
      data_url: "",
    },
  };
  console.log({ noEmit });

  if (!noEmit) {
    console.log("cleared");
  }
}
</script>

<style scoped></style>
