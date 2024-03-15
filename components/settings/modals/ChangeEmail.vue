<template>
  <form @submit.prevent="handleSave" class="flex flex-col gap-10 h-full w-full">
    <div class="text-[28px] !leading-[120%]">Изменить email</div>
    <div class="text-secondary flex flex-col gap-8">
      <AppInput
        v-model="form.email"
        placeholder="Введите новый электронный адрес"
        type="text"
        title="Ваш email"
        :error-message="errors.email"
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
  email: string;
}>({
  email: "",
});

const errors = ref<{
  email: string | null;
}>({
  email: null,
});

const emit = defineEmits<{
  apply: [email: string];
  close: [];
}>();

const usersStore = useUsersStore();
const auth = useAuthStore();

async function handleSave() {
  errors.value = {
    email: null,
  };

  const { error, data } = await usersStore.updateEmail(form.value.email);

  if (data && auth.user) {
    auth.user.email = data.email;
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
