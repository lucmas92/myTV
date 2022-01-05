<template>
  <div id="app">
    <div class="text-center flex flex-col items-center w-9 ">
      <div class="text-center flex py-1 border px-2 py-1 " @click="goBack" v-if="this.$route.path !== '/'">
        <img src="/back.png" class="h-4 cursor-pointer" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BackButton',
  methods: {
    goBack() {
      this.$router.back();
    }
  }
}
</script>
