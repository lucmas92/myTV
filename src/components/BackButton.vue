<template>
    <div class="text-center flex flex-col items-center w-9">
      <div class="text-center flex py-1 border px-2 py-1 cursor-pointer hover:bg-gray-200 " @click="goBack" v-if="this.$route.path !== '/'">
        <img src="/back.png" class="h-4" alt="">
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
