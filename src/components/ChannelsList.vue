<template>
  <div class="flex flex-row w-full overflow-auto overflow-x-scroll" v-if="channels">
    <section class="w-full py-4 channels" v-for="(channel,index) in channels"
             :key="channel['canale']['logo']">
      <div class="w-24 lg:w-36 xl:w-40 flex flex-col justify-center items-center border-black">
        <router-link :to="'/channel2/'+ index">
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
    let c = localStorage.getItem(this.key1);
    this.channels = JSON.parse(c);

  }
}
</script>
