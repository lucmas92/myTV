<template>
  <div class="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 pt-14" v-if="channel">
    <div class="w-full lg:w-3/4 xl:w-2/3" v-for="prog in channel['prog']" v-bind:key="prog['title'] + prog['inizio']">
      <article class="space-y-8 py-4 dark:bg-gray-700 text-gray-200">
        <div class="space-y-6">
          <div class="flex flex-row justify-between">
            <h2 @click="show(prog)" class="cursor-pointer text-xl font-bold md:tracking-tight md:text-2xl hover:text-black">
              {{ prog['title'] }}

              <div class="mt-3 text-sm md:mt-0 font-extralight">
                {{ prog['genre'] }} • {{ prog['category'] }}
              </div>
            </h2>
            <div class="flex items-center md:space-x-2">
              <img src="/watch.png" alt=""
                   class="w-4 h-4 border rounded-full dark:bg-gray-700 dark:border-gray-700">
              <p class="text-sm">
                {{ getStartTime(prog['inizio']) }}
                •
                {{ getStartTime(prog['fine']) }}
                ({{ prog['durata'] }} min)
              </p>
            </div>
          </div>
        </div>
        <div class="hidden flex flex-col lg:flex-row bg-white" :id="hash(prog['title'] + prog['inizio'])">
          <div class="rounded-lg aspect-w-16 aspect-h-9 lg:aspect-none w-full lg:w-1/2">
            <img alt="content" class="w-full h-full object-center object-cover" :src="prog['image']">
          </div>
          <div class="dark:text-coolGray-100 text-black text-sm p-5 dark:bg:gray-700w-full lg:w-1/2">
            <p>
              {{ prog['description'] }}
            </p>
          </div>
        </div>
      </article>
    </div>
  </div>

</template>

<script>

export default {
  name: 'ChannelDetail',
  data: function () {
    return {
      number: null,
      channel: null
    }
  },
  beforeMount() {
    this.number = this.$route.params.number;
  },
  created() {
    this.getCanale();
  },
  methods: {
    async getCanale() {
      let channels = await this.getCanali();
      this.channel = channels[this.number];
    },
    hash(text) {
      const md5 = require('md5');
      return md5(text);
    },
    show(prog) {
      const md5 = require('md5');
      const id = md5(prog['title'] + prog['inizio']);
      const toggle = document.getElementById(id).classList.contains('hidden');
      if (toggle) {
        document.getElementById(id).classList.remove('hidden');
      } else {
        document.getElementById(id).classList.add('hidden');
      }
    }
  }
}
</script>
