<template>
  <div class="flex flex-col gap-3 lg:gap-4 2xl:gap-6">
    <div
      class="text-secondary text-14px :text-[17px] font-medium xl:text-[18px] 2xl:text-[28px] !leading-[120%]"
    >
      Title Table
    </div>
    <div>
      <div class="grid grid-cols-3">
        <!-- table header -->
        <div v-for="title in props.titles" :key="title"
             class="h-[34px] xl:h-[45px] py-2 px-3 lg:py-3 lg:px-4 border-[1px] border-gray-1 text-[12px] lg:text-[14px] text-gray-text !leading-[150%]"
        >
          {{title}}
        </div>
      </div>
      <div v-for="(item, index) in props.tableData" :key="index">
        <div class="grid grid-cols-3">

          <!-- table body -->
          <!-- first -->
          <div
            class="h-[40px] xl:h-[50px] 2xl:h-[54px] py-2 px-3 lg:py-3 lg:px-4 border-[1px] border-gray-1 text-base xl:text-[17px] 2xl:text-[20px] text-secondary !leading-[150%]"
          >
            {{item.period}}
          </div>
          <div
            :class="[!item.chrono.includes('-') ? 'text-green' : item.chrono === '-' ? 'text-secondary' : 'text-red']"
            class="h-[40px] xl:h-[50px] 2xl:h-[54px] py-2 px-3 lg:py-3 lg:px-4 border-[1px] border-gray-1 text-base xl:text-[17px] 2xl:text-[20px] !leading-[150%] "
          >
            {{item.chrono !== '-' ? item.chrono + '%' : item.chrono}}
          </div>
          <div
            :class="[!item.watch.includes('-') ? 'text-green' : item.watch === '-' ? 'text-secondary' : 'text-red']"
            class="h-[40px] xl:h-[50px] 2xl:h-[54px] py-2 px-3 lg:py-3 lg:px-4 border-[1px] border-gray-1 text-base xl:text-[17px] 2xl:text-[20px] !leading-[150%]"
          >
            {{item.watch !== '-' ? item.watch + '%' : item.watch}}
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
const props = defineProps<{titles: string[], tableData: {period: string, chrono: string, watch: string}[]}>()
</script>

<style scoped></style>
