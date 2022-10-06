<template>
  <div id="app" class="bg-gray-900 min-h-screen"
       onselectstart="return false;" >
    <div class="hidden fixed w-full z-20 flex flex-row items-center px-4 py-4 shadow-lg bg-indigo-900 text-white">
      <router-link to="/">
        <h1 class="text-md w-24 ml-5 md:w-36 font-bold text-center"><span class="hidden lg:inline">
          Stasera </span>MyTV
        </h1>
      </router-link>
      <div class="w-full">
        <router-link to="/" class="text-sm mx-4 h-auto lg:text-sm hover:underline">
          Home
        </router-link>
      </div>
    </div>
    <channels-list class="z-10 bg-gray-600 fixed pt-0"></channels-list>
    <router-view class="pt-32" :key="$route.fullPath"></router-view>
  </div>
</template>

<script>

import ChannelsList from "@/components/ChannelsList";

export default {
  components: {ChannelsList},
  name: 'App',
  mounted() {
  },
  methods: {}
}
</script>
