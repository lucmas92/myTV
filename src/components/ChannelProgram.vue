<template>
  <div class="px-6 mx-auto space-y-12 pb-12" v-if="channel">
    <div class="flex flex-col lg:flex-row pt-6 text-gray-700 justify-center items-start">
      <div class="w-full lg:w-1/2 text-center">
        <div v-if="prima_serata">
          <div class="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 py-5 lg:py-10">
            <div
                class="flex flex-col max-w-screen-lg overflow-hidden bg-gray-200 border rounded shadow-sm lg:flex-row sm:mx-auto">
              <div class="relative lg:w-1/2">
                <img :src="prima_serata['prog']['image']" alt="" class="object-cover w-full lg:absolute h-64 lg:h-80 lg:h-full"/>
                <svg class="absolute top-0 right-0 hidden h-full text-gray-200 lg:inline-block" viewBox="0 0 20 104"
                     fill="currentColor">
                  <polygon points="17.3036738 5.68434189e-14 20 5.68434189e-14 20 104 0.824555778 104"></polygon>
                </svg>
              </div>
              <div class="flex flex-col justify-center p-1 bg-gray-200 lg:p-2 lg:pl-5 lg:w-2/3">
                <div>
                  <p class="inline-block py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
                    {{ getStartTime(prima_serata['prog']['inizio']) }} - {{ getStartTime(prima_serata['prog']['fine']) }}
                  </p>
                </div>
                <h5 class="mb-3 text-lg font-extrabold leading-none sm:text-xl">
                  {{ prima_serata['prog']['title'] }}
                </h5>
                <p class="mb-5 text-sm text-gray-800">
                  {{ prima_serata['prog']['description'] | truncate(50) }}
                </p>
                <div class="flex items-center">
                  <a target="_blank" v-if="channel['prog']['trailer']"
                     :href="'https://www.youtube.com/watch?v=' + channel['prog']['trailer']['id']" aria-label=""
                     class="inline-flex items-center font-semibold">
                    Trailer
                    <svg class="inline-block w-3 ml-2" fill="currentColor" viewBox="0 0 12 12">
                      <path
                          d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-1/2 text-center">
        <div v-if="seconda_serata">
          <div class="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 py-5 lg:py-10">
            <div
                class="flex flex-col max-w-screen-lg overflow-hidden bg-gray-200 border rounded shadow-sm lg:flex-row sm:mx-auto">
              <div class="relative lg:w-1/2">
                <img :src="seconda_serata['prog']['image']" alt="" class="object-cover w-full lg:absolute h-64 lg:h-80 lg:h-full"/>
                <svg class="absolute top-0 right-0 hidden h-full text-gray-200 lg:inline-block" viewBox="0 0 20 104"
                     fill="currentColor">
                  <polygon points="17.3036738 5.68434189e-14 20 5.68434189e-14 20 104 0.824555778 104"></polygon>
                </svg>
              </div>
              <div class="flex flex-col justify-center p-1 bg-gray-200 lg:p-2 lg:pl-5 lg:w-2/3">
                <div>
                  <p class="inline-block py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
                    {{ getStartTime(seconda_serata['prog']['inizio']) }} - {{ getStartTime(seconda_serata['prog']['fine']) }}
                  </p>
                </div>
                <h5 class="mb-3 text-lg font-extrabold leading-none sm:text-xl">
                  {{ seconda_serata['prog']['title'] }}
                </h5>
                <p class="mb-5 text-sm text-gray-800">
                  {{ seconda_serata['prog']['description'] | truncate(50) }}
                </p>
                <div class="flex items-center">
                  <a target="_blank" v-if="channel['prog']['trailer']"
                     :href="'https://www.youtube.com/watch?v=' + channel['prog']['trailer']['id']" aria-label=""
                     class="inline-flex items-center font-semibold">
                    Trailer
                    <svg class="inline-block w-3 ml-2" fill="currentColor" viewBox="0 0 12 12">
                      <path
                          d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 py-5 lg:py-10">
      <img :src="'/img/loghi/' + channel['canale']['logo']" class="h-8 mb-3" alt="">
      <div class="relative bg-gray-300 shadow-md rounded-lg hover:shadow-xl">
        <div class="flex flex-row">
          <section>
            <div class="flex flex-col items-start px-4 py-2">
              <div class="flex w-full flex-row" v-for="(prog,index) in channel['prog']" :key="index">
                <div class="w-2/6 md:w-1/6 text-xs md:text-sm text-right pr-4">
                  {{ getStartTime(prog['inizio']) }} -
                  {{ getStartTime(prog['fine']) }}
                </div>
                <div class="w-4/6 md:w-5/6 flex flex-col">
                  <h2 class="text-lg font-bold lg:text-xl">
                    {{ prog['title'] }}
                    <span class="text-sm">({{ prog['category'] }} - {{ prog['genre'] }})</span>
                  </h2>
                  <p class="text-xs lg:text-sm text-gray-500 py-4">{{ prog['description'] | truncate(400, '...') }}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ChannelProgram',
  data: function () {
    return {
      number: null,
      channel: null,
      prima_serata: null,
      seconda_serata: null
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
      const key = 'canali_' + this.current_date;
      const key2 = 'prima_serata_' + this.current_date;
      const key3 = 'seconda_serata_' + this.current_date;
      let channels = localStorage.getItem(key);
      let prima_serata = localStorage.getItem(key2);
      let seconda_serata = localStorage.getItem(key3);
      console.log(seconda_serata)
      if (channels != null) {
        channels = JSON.parse(channels);
        this.channel = channels[this.number]
      }
      if (prima_serata != null) {
        prima_serata = JSON.parse(prima_serata);
        this.prima_serata = prima_serata[this.number]
      }
      if (seconda_serata != null) {
        seconda_serata = JSON.parse(seconda_serata);
        console.log(seconda_serata[this.number]['prog']);
        this.seconda_serata = seconda_serata[this.number]
      }
    }
  }
}
</script>
