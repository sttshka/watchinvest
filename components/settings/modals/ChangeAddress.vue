<template>
  <form @submit.prevent="submitForm" class="flex flex-col gap-10 h-full w-full">
    <div class="text-[28px] !leading-[120%]">
      <span v-if="!errorMessage">{{
        props.address.new ? "Добавить адрес" : "Изменить адрес"
      }}</span>
      <span v-else class="text-red">{{ errorMessage }}</span>
    </div>
    <div class="text-secondary flex flex-col gap-8">
      <AppInput
        v-model="form.country"
        placeholder="Страна или регион"
        type="text"
        title="Страна или регион"
        :error-message="errors.country"
      />
      <AppInput
        v-model="form.city"
        placeholder="Город"
        type="text"
        title="Город"
        :error-message="errors.city"
      />
      <AppInput
        v-model="form.address"
        placeholder="Введите улицу и адрес"
        type="text"
        title="Улица и адрес"
        :error-message="errors.address"
      />

      <div class="flex gap-4">
        <AppRadio
          title="Telegram"
          :model-value="form.contactType === 'telegram'"
          @update:modelValue="form.contactType = 'telegram'"
        />
        <AppRadio
          title="Phone"
          :model-value="form.contactType === 'phone'"
          @update:modelValue="form.contactType = 'phone'"
        />
        <AppRadio
          title="Email"
          :model-value="form.contactType === 'email'"
          @update:modelValue="form.contactType = 'email'"
        />
      </div>

      <div class="flex flex-col gap-2">
        <AppInput
          v-model="form.contact"
          placeholder="Введите контакт"
          type="text"
          title="Имя пользователя Telegram"
          :error-message="errors.contact"
        />
        <div class="text-secondary" v-if="props.address.new">
          Выбранный контакт сохранится в кабинете.
        </div>
      </div>
    </div>
    <AppButton
      v-if="!props.address.new"
      size="lg"
      type="submit"
      class="w-full !max-w-full"
    >
      Сохранить
    </AppButton>
    <AppButton
      v-else
      size="lg"
      :loading="loading"
      type="submit"
      class="w-full !max-w-full"
    >
      Добавить
    </AppButton>
  </form>
</template>

<script setup lang="ts">
import AppInput from "~/components/ui/AppInput.vue";
import AppRadio from "~/components/ui/AppRadio.vue";
import { getLocalizedValue } from "~/utils";

const props = defineProps<{
  address: any;
}>();

const form = ref<{
  country: string;
  city: string;
  contactType: "email" | "phone" | "telegram";
  address: string;
  contact: string;
}>({
  country: "",
  city: "",
  address: "",
  contactType: "telegram",
  contact: "",
});

handleInitForm();

const loading = ref(false);
const errorMessage = ref<string | null>(null);

const errors = ref<{
  country: string;
  city: string;
  address: string;
  contactType: string;
  contact: string;
}>({
  country: "",
  city: "",
  address: "",
  contactType: "",
  contact: "",
});

const emit = defineEmits<{
  apply: [name: string];
  close: [];
}>();

const auth = useAuthStore();
const usersStore = useUsersStore();

async function submitForm() {
  errors.value = {
    country: "",
    city: "",
    address: "",
    contactType: "",
    contact: "",
  };
  errorMessage.value = null;
  loading.value = true;
  if (!props.address.new) {
    await handleUpdate();
  } else {
    await handleCreate();
  }
  loading.value = false;
}

async function handleCreate() {
  const preparedData = JSON.parse(JSON.stringify(form.value));
  delete preparedData.new;
  preparedData.is_default = true;

  const { data, error } = await usersStore.createAddress(preparedData);

  if (data) {
    emit("close");
  }

  if (error?.statusCode === 400) {
    if (error.data.error) {
      errorMessage.value = getLocalizedValue(error.data.error);
    }

    error?.data?.validation_error.forEach(({ field, message }) => {
      errors.value[field] = message;
    });
  }
}

async function handleUpdate() {
  const { data, error } = await usersStore.updateAddressCredentials({
    ...form.value,
    id: props.address.id,
  });

  if (data) {
    emit("close");
  }

  if (error?.statusCode === 400) {
    if (error.data.error) {
      errorMessage.value = getLocalizedValue(error.data.error);
    }

    error?.data?.validation_error.forEach(({ field, message }) => {
      errors.value[field] = message;
    });
  }
}

function handleInitForm() {
  form.value.address = props.address.address;
  form.value.city = props.address.city;
  form.value.country = props.address.country;
  form.value.contact = props.address.contact;
}
</script>

<style scoped></style>
