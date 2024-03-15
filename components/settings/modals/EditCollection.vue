<template>
  <form @submit.prevent="handleSave" class="flex flex-col gap-10 h-full w-full">
    <div class="text-[28px] !leading-[120%]">Редактировать колекцию</div>
    <div class="text-secondary flex flex-col gap-8">
      <AppInput
        v-model="form.title"
        placeholder="Введите название"
        type="text"
        title="Название"
        :error-message="errors.title"
      />
      <AppInput
        v-model="form.description"
        placeholder="Введите описание"
        type="textArea"
        title="Описание"
        :error-message="errors.description"
      />
    </div>
    <AppButton
      :loading="loading"
      size="lg"
      type="submit"
      class="w-full !max-w-full"
    >
      Сохранить
    </AppButton>
  </form>
</template>

<script setup lang="ts">
import AppInput from "~/components/ui/AppInput.vue";
import { ICollection } from "~/types";
import { getLocalizedValue } from "~/utils";

const props = defineProps<{
  collection: ICollection;
  loading: boolean;
}>();

const form = ref<{
  title: string;
  description: string;
}>({
  title: getLocalizedValue(props.collection.title) ?? "",
  description: getLocalizedValue(props.collection.description) ?? "",
});

const errors = ref<{
  title: string;
  description: string;
}>({
  title: "",
  description: "",
});

const emit = defineEmits<{
  close: [];
}>();

const collectionsStore = useCollectionsStore();
const pageStore = usePageStore();

async function handleSave() {
  errors.value = {
    title: "",
    description: "",
  };

  const value = `value_${pageStore.currentLanguage.slug}`;

  await collectionsStore.editCollection({
    id: props.collection.id,
    title: {
      ...props.collection.title,
      [value]: form.value.title,
    },
    description: {
      ...props.collection.description,
      [value]: form.value.description,
    },
  });
  console.log("closed!");

  emit("close");
}
</script>

<style scoped></style>
