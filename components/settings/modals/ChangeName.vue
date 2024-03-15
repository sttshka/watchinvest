<template>
  <form @submit.prevent="handleSave" class="flex flex-col gap-10 h-full w-full">
    <div class="text-[28px] !leading-[120%]">Изменить имя</div>
    <div class="text-secondary flex flex-col gap-8">
      <AppInput
        v-model="form.first_name"
        placeholder="Введите новое имя"
        type="text"
        title="Ваше имя"
        :error-message="errors.first_name"
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
  first_name: string;
}>({
  first_name: "",
});

const errors = ref<{
  first_name: string | null;
}>({
  first_name: null,
});

const emit = defineEmits<{
  apply: [first_name: string];
  close: [];
}>();

const usersStore = useUsersStore();
const auth = useAuthStore();

async function handleSave() {
  errors.value = {
    first_name: null,
  };

  const me = await usersStore.updateCredentials(form.value);

  if (me) {
    auth.user.first_name = me.first_name;
    emit("close");
  }

  // if (error?.value?.statusCode === 400) {
  //   error.value?.data?.validation_error.forEach(({ field, message }) => {
  //     errors.value[field] = message;
  //   });
  // }

  // if (data?.value?.data?.me.id > 0) {
  //   emit("close");
  // }
  // emit("close");
}
</script>

<style scoped></style>
