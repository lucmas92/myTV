<template>
  <div class="pt-14">
    <svg v-if="loading" class="animate-spin mx-auto my-16 h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg"
         fill="none"
         viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"></circle>
      <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <div class="flex flex-col gap-6 pb-14" v-if="stasera">
      <section class="channel" v-for="(channel) in stasera" :key="channel['canale']['number']">
        <div class="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 py-2 lg:py-5">
          <div
              class="flex flex-col overflow-hidden bg-gray-200 border rounded shadow-sm lg:flex-row sm:mx-auto">
            <div class="relative lg:w-1/2">
              <img :src="channel['prog']['image']" alt="" class="object-cover w-full lg:absolute h-80 lg:h-full"/>
              <svg class="absolute top-0 right-0 hidden h-full text-gray-200 lg:inline-block" viewBox="0 0 20 104"
                   fill="currentColor">
                <polygon points="17.3036738 5.68434189e-14 20 5.68434189e-14 20 104 0.824555778 104"></polygon>
              </svg>
            </div>
            <div class="flex flex-col justify-center p-8 bg-gray-200 lg:p-16 lg:pl-10 lg:w-1/2">
              <div>
                <p class="inline-block py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">

                  <img :src="'/img/loghi/' + channel['canale']['logo']" class="h-8 mb-3" alt="">

                  {{ getStartTime(channel['prog']['inizio']) }} - {{ getStartTime(channel['prog']['fine']) }}
                </p>
              </div>
              <h5 class="mb-3 text-3xl font-extrabold leading-none sm:text-4xl">
                {{ channel['prog']['title'] }}
              </h5>
              <p class="mb-5 text-gray-800">
                {{ channel['prog']['description'] | truncate(300) }}
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

      </section>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data: function () {
    return {
      'stasera': [],
      'loading': false,
    }
  },
  beforeMount() {
  },
  mounted() {
    this.stasera = this.getListaStasera()
  },
  methods: {
    async getListaStasera() {
      this.stasera = await this.getStasera();
    }
  }
}
</script>