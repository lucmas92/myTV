<template>
  <div class="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 py-2 lg:py-5"
       v-if="channel">
    <article class="space-y-8 py-4 dark:bg-gray-700 text-gray-200">
      <div class="space-y-6">
        <h1 class="text-4xl font-bold md:tracking-tight md:text-5xl">{{ channel['prog']['title'] }}</h1>
        <div
            class="bg-gray-200 py-1 text-black flex flex-col items-start justify-between w-full md:flex-row md:items-center dark:text-gray-400">
          <div class="flex items-center md:space-x-2">
            <img src="/watch.png" alt=""
                 class="w-4 h-4 border rounded-full dark:bg-gray-700 dark:border-gray-700">
            <p class="text-sm">{{ getStartTime(channel['prog']['inizio']) }} • {{
                getStartTime(channel['prog']['fine'])
              }}</p>
          </div>
          <div class="mt-3 text-sm md:mt-0">{{ channel['prog']['durata'] }} min •
            {{ channel['prog']['genre'] }} • {{ channel['prog']['category'] }}
          </div>
        </div>
      </div>
      <div class="dark:text-coolGray-100">
        <p>
          {{ channel['prog']['description'] }}
        </p>
      </div>
    </article>
    <div class="rounded-lg h-64 overflow-hidden">
      <img alt="content" class="object-cover object-center h-full w-full" :src="channel['prog']['image']">
    </div>
    <div>
      <div class="space-y-2 text-gray-300" v-if="channel['prog']['actor']">
        <h4 class="text-lg font-semibold">Attori</h4>
        <ul class="ml-4 space-y-1 list-disc">
          <li v-for="(actor,index) in channel['prog']['actor'].split(', ')" :key="index">
            <a href="#" class="hover:underline">{{ actor }}</a>
          </li>
        </ul>
      </div>
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
  mounted() {
    this.loadChannel();
  },
  methods: {
    loadChannel() {
      const key = 'prima_serata_' + this.current_date;
      let channels = localStorage.getItem(key);
      if (channels != null) {
        channels = JSON.parse(channels);
        this.channel = channels[this.number]
      }
    }
  }
}
</script>
