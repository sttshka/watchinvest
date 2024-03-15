<template>
  <form @submit.prevent="handleSave" class="flex flex-col gap-10 h-full w-full">
    <div class="text-[28px] !leading-[120%]">Изменить пароль</div>
    <div class="text-secondary flex flex-col gap-8">
      <AppInput
        v-model="form.password_old"
        placeholder="Введите текущий пароль"
        type="text"
        title="Текущий пароль"
        :error-message="errors.password_old"
      />

      <AppInput
        v-model="form.confirmPassword"
        placeholder="Введите новый пароль"
        type="text"
        title="Новый пароль"
        :error-message="errors.confirmPassword"
      />

      <AppInput
        v-model="form.password"
        placeholder="Повторите новый пароль"
        type="text"
        title="Повторите новый пароль"
        :error-message="errors.password"
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
  password_old: string;
  password: string;
  confirmPassword: string;
}>({
  password_old: "",
  password: "",
  confirmPassword: "",
});
const errors = ref<{
  password_old: string | null;
  password: string | null;
  confirmPassword: string | null;
}>({
  password_old: null,
  password: null,
  confirmPassword: null,
});

const emit = defineEmits<{
  close: [];
  apply: [value: { password_old: string; password: string }];
}>();

const usersStore = useUsersStore();
const auth = useAuthStore();

async function handleSave() {
  errors.value = {
    password_old: null,
    password: null,
    confirmPassword: null,
  };

  const { data, error } = await usersStore.updatePassword({
    password_old: form.value.password_old,
    password: form.value.password,
  });

  if (error?.statusCode === 400) {
    error.data?.validation_error.forEach(({ field, message }) => {
      errors.value[field] = message;
    });
  }

  if (data) {
    emit("close");
  }
}
</script>

<style scoped></style>
