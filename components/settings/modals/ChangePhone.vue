<template>
  <form @submit.prevent="handleSave" class="flex flex-col gap-10 h-full w-full">
    <div class="text-[28px] !leading-[120%]">Изменить телефон</div>
    <div class="text-secondary flex flex-col gap-8">
      <AppInput
        v-model="form.phone"
        placeholder="Введите новый телефон"
        type="text"
        title="Ваш телефон"
        :error-message="errors.phone"
      />
    </div>
    <AppButton size="lg" type="submit" class="w-full !max-w-full">
      Сохранить
    </AppButton>
  </form>
</template>

<script setup lang="ts">
import AppInput from "~/components/ui/AppInput.vue";

const form = ref<{
  phone: string;
}>({
  phone: "",
});

const errors = ref<{
  phone: string | null;
}>({
  phone: null,
});

const emit = defineEmits<{
  apply: [phone: string];
  close: [];
}>();

const usersStore = useUsersStore();
const auth = useAuthStore();

async function handleSave() {
  errors.value = {
    phone: null,
  };

  const { error, data } = await usersStore.updatePhone(form.value.phone);

  if (data && auth.user) {
    // auth.user.phone = data.phone;
    emit("close");
  }

  if (error?.statusCode === 400) {
    error?.data?.validation_error.forEach(({ field, message }) => {
      errors.value[field] = message;
    });
  }
}
</script>

<style scoped></style>
