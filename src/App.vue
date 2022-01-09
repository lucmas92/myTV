<template>
  <div id="app" class="bg-gray-800 min-h-screen">
    <div class="fixed w-full z-20 flex flex-row items-center px-4 py-4 shadow-lg bg-indigo-900 text-white">
      <back-button></back-button>
      <router-link to="/">
        <h1 class="text-md w-24 ml-5 md:w-36 font-bold text-center"><span class="hidden lg:inline">
          Stasera </span>MyTV
<!--      <button @click="clearStorage">clear</button>-->
        </h1>
      </router-link>
      <div class="w-full">
        <router-link to="/"
                     class="text-sm mx-4 h-auto lg:text-sm hover:underline">
          Home
        </router-link>
        <router-link to="/programmazione"
                     class="text-sm mx-4 h-auto lg:text-sm hover:underline">
          Progr. Completa
        </router-link>
      </div>
    </div>

    <router-view class="pt-14"></router-view>
  </div>
</template>

<script>
import BackButton from "@/components/BackButton";

export default {
  name: 'App',
  components: {BackButton},
  methods:{
    clearStorage(){
      const key = 'canali_' + this.current_date;
      const key2 = 'prima_serata_' + this.current_date;
      localStorage.removeItem(key)
      localStorage.removeItem(key2)
    }
  }
}
</script>
