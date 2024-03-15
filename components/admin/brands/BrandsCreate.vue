<template>
  <div class="flex flex-col gap-2">
    <div
      class="text-[20px] font-bold"
      :class="{
        'text-red': isError,
      }"
    >
      {{ isError && errorMessage ? errorMessage : "Create brand" }}
    </div>

    <form
      ref="brandCreation"
      @submit.prevent="handleBrandCreation"
      class="flex flex-col gap-4"
    >
      <div class="grid grid-cols-4 gap-4">
        <div v-for="field in Object.keys(brandsCreationForm)">
          <div>{{ field }}:</div>
          <template v-if="field === 'image'">
            <input
              type="file"
              @change="onBrandFileChanged($event)"
              accept="image/*"
              capture
            />
          </template>
          <template
            v-else-if="
              field === 'is_jewelry' ||
              field === 'is_watches' ||
              field === 'is_accessories'
            "
          >
            <input
              type="checkbox"
              v-model="brandsCreationForm[field]"
              :name="field"
              id=""
            />
          </template>

          <input v-else type="text" v-model="brandsCreationForm[field]" />
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <AppButton>Create new brand</AppButton>
        <div v-if="isLoading">loading</div>
        <div v-if="isSuccess">New brand created</div>
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
const brandCreation = ref(null);
const brandsCreationForm = ref({
  title_en: "",
  title_ru: "",
  title_es: "",
  title_cn: "",
  description_en: "",
  description_ru: "",
  description_es: "",
  description_cn: "",
  is_jewelry: false,
  is_watches: false,
  is_accessories: false,
  image: {
    data_url: "",
  },
});
const file = ref<File | null>();
const form = ref<HTMLFormElement>();
const isSuccess = ref(false);
const isError = ref(false);
const errorMessage = ref("");
const isLoading = ref(false);
const errors = ref([]);

function onBrandFileChanged(event: Event) {
  var reader = new FileReader();
  const target = event.target as HTMLInputElement;

  if (target && target.files) {
    reader.onloadend = () => {
      brandsCreationForm.value.image.data_url = reader.result;
    };
    reader.readAsDataURL(target.files[0]);
  }
}
async function handleBrandCreation() {
  errorMessage.value = "";
  errors.value = [];
  isSuccess.value = false;
  isError.value = false;
  isLoading.value = true;

  const { data, error } = await useApiFetch<TResponseSingle<IBrand>>(
    "brands/",
    {
      method: "POST",
      body: brandsCreationForm.value,
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
    brandsCreationForm.value = {
      title_en: "",
      title_ru: "",
      title_es: "",
      title_cn: "",
      description_en: "",
      description_ru: "",
      description_es: "",
      description_cn: "",
      is_jewelry: false,
      is_watches: false,
      is_accessories: false,
      image: {
        data_url: "",
      },
    };
  }

  isLoading.value = false;
}
</script>

<style scoped></style>
