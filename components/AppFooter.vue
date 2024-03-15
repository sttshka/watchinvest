<template>
  <div
    class="bg-secondary w-full py-6 mb-40 sm:mb-0 xl:py-[56px] 2xl:py-[80px] text-gray-1 border-t-[32px] border-primary"
  >
    <div class="px-4 mx-auto adaptive-container">
      <!-- content -->
      <div
        class="flex flex-col md:justify-between lg:flex-row gap-6 xl:text-[14px] 2xl:text-base"
      >
        <NuxtLink to="/" >
          <FooterLogo class="text-white hover:text-primary transition-colors" />
        </NuxtLink>

        <ul class="grid grid-cols-2 lg:flex gap-6">
          <li class="lg:min-w-[164px] xl:min-w-[184px] 2xl:min-w-[224px] flex flex-col">
            <span class="text-primary uppercase  mb-6 lg:mb-4 2xl:mb-6">Watches</span>
            <ul class="flex flex-col gap-[8px] md:gap-4 opacity-[0.8]">
              <li class="hover:text-primary cursor-pointer transition-colors">All Watches</li>
              <li class="hover:text-primary cursor-pointer transition-colors">Our Collections</li>
              <li class="hover:text-primary cursor-pointer transition-colors">New Releases</li>
              <li class="hover:text-primary cursor-pointer transition-colors">Best in Сollection</li>
            </ul>
          </li>
          <li class="lg:min-w-[164px] xl:min-w-[184px] 2xl:min-w-[224px] flex flex-col">
            <span class="text-primary uppercase mb-6 lg:mb-4 2xl:mb-6">SERVICES</span>
            <ul class="flex flex-col gap-[8px] md:gap-4 opacity-[0.8]">
              <li class="hover:text-primary cursor-pointer transition-colors">All services</li>
              <li class="hover:text-primary cursor-pointer transition-colors">Extend your warranty</li>
              <li class="hover:text-primary cursor-pointer transition-colors">Contact us</li>
              <li class="hover:text-primary cursor-pointer transition-colors">FAQ</li>
            </ul>
          </li>
          <li class="lg:min-w-[164px] xl:min-w-[184px] 2xl:min-w-[224px] flex flex-col">
            <span class="text-primary uppercase  mb-6 lg:mb-4 2xl:mb-6">COMPANY</span>
            <ul class="flex flex-col gap-[8px] md:gap-4 opacity-[0.8]">
              <li class="hover:text-primary cursor-pointer transition-colors">Careers</li>
              <li class="hover:text-primary cursor-pointer transition-colors">Press</li>
              <li class="hover:text-primary cursor-pointer transition-colors">About Us</li>
              <li class="hover:text-primary cursor-pointer transition-colors">News</li>
            </ul>
          </li>
          <li class="lg:min-w-[184px] xl:min-w-[288px] min-2 2xl:min-w-[338px] col-span-2 flex flex-col">
            <span class="text-primary uppercase  mb-6 lg:mb-4 2xl:mb-6">Personalized support</span>
            <ul class="flex flex-col gap-4 lg:gap-6 font-medium">
              <li class="flex items-center gap-[12px] hover:text-primary cursor-pointer transition-colors">
                <IconPhone class="mb-[3px]" />
                <span>+49 721 96693-900</span>
              </li>
              <li>
                <ul class="flex items-center gap-6">
                  <li class="hover:text-primary cursor-pointer transition-colors"><IconYouTube /></li>
                  <li class="hover:text-primary cursor-pointer transition-colors"><IconFacebook /></li>
                  <li class="hover:text-primary cursor-pointer transition-colors"><IconInstagram /></li>
                  <li class="hover:text-primary cursor-pointer transition-colors"><IconWhatsapp /></li>
                  <li class="hover:text-primary cursor-pointer transition-colors"><IconTelegram /></li>
                </ul>
              </li>
              <li class="flex items-center justify-start gap-2">
                <li><AmericanExpress class="max-w-[66.66px] h-10" /></li>
                <li><Visa class="max-w-[66.66px] h-10" /></li>
                <li><MasterCard class="max-w-[66.66px] h-10" /></li>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!-- divider -->
      <div
        class="h-[1px] w-full bg-gray-1 my-6 xl:my-14 2xl:my-20 opacity-[0.08]"
      ></div>
      <!-- terms of use & policy -->
      <div
        class="flex flex-col md:flex-row justify-between md:items-center gap-4 text-gray-text"
      >
        <div class="text-[14px] lg:text-[15px] 2xl:text-base !leading-[150%]">© 2023 Cryptos Watch. All Rights Reserved</div>
        <ul class="flex gap-3 sm:gap-4 lg:gap-6 text-[14px] lg:text-[15px] 2xl:text-base !leading-[150%]">
          <li class="hover:text-white cursor-pointer transition-colors">Terms of Use</li>
          <li class="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
          <li class="hover:text-white cursor-pointer transition-colors">Cookie Policy</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import FooterLogo from "./icons/FooterLogo.vue";
import IconPhone from "./icons/IconPhone.vue";
import IconFacebook from "./icons/IconFacebook.vue";
import IconInstagram from "./icons/IconInstagram.vue";
import IconWhatsapp from "./icons/IconWhatsapp.vue";
import IconTelegram from "./icons/IconTelegram.vue";
import IconYouTube from "./icons/IconYouTube.vue";

import AmericanExpress from "./icons/AmericanExpress.vue";
import MasterCard from "./icons/MasterCard.vue";
import Visa from "./icons/Visa.vue";
</script>
