<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* For IE, Edge and Firefox */
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
<template>
  <div class="flex flex-row w-full overflow-auto overflow-x-scroll scrollbar-hide">
    <div class="w-24 lg:w-36 xl:w-40 flex flex-col justify-center items-center border-black">
    <router-link to="/">
      <h1 class="py-4 text-md w-24 ml-5 md:w-36 font-bold text-center underline border-r-2">
        Home
      </h1>
    </router-link>
    </div>
    <section class="w-full py-4 channels" v-for="(channel,index) in channels"
             :key="channel['canale']['logo']">
      <div class="w-24 lg:w-36 xl:w-40 flex flex-col justify-center items-center border-black">
        <router-link :to="'/channel/'+ index">
          <img :src="'/img/loghi/' + channel['canale']['logo']" class="h-8 mb-3" :alt="channel['canale']['name']">
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  name: 'ChannelsList',
  data: function () {
    return {
      channels: []
    }
  },
  created() {
    this.getListaCanali();
  },
  methods:{
    async getListaCanali(){
      this.channels = await this.getCanali();
    }
  }
}
</script>
