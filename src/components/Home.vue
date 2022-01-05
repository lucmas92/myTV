<template>
  <div>
    <div class="flex flex-row w-full overflow-auto overflow-x-scroll" v-if="canali">
      <section class="w-full bg-gray-800 py-4 channels" v-for="(canale) in canali" :key="canale['canale']['number']">
        <div class="w-24 lg:w-36 xl:w-40 flex flex-col justify-center items-center border-black">
          <img :src="'https://loghi.guidatvoggi.it/w/' + canale['canale']['logo']" class="h-8 mb-3" alt="">
        </div>
      </section>
    </div>
    <div class="flex flex-col gap-6" v-if="stasera">
      <pagination  @page_changed="load" :n_elements="total_elements"></pagination>
      <section class="channel" v-for="(channel,index) in stasera" :key="channel['canale']['number']">
        <div class="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 py-5 lg:py-10">
          <div
              class="flex flex-col max-w-screen-lg overflow-hidden bg-gray-200 border rounded shadow-sm lg:flex-row sm:mx-auto">
            <div class="relative lg:w-1/2">
              <!--        <img src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260" alt="" class="object-cover w-full lg:absolute h-80 lg:h-full" />-->
              <img :src="channel['prog']['image']" alt="" class="object-cover w-full lg:absolute h-80 lg:h-full"/>
              <svg class="absolute top-0 right-0 hidden h-full text-gray-200 lg:inline-block" viewBox="0 0 20 104"
                   fill="currentColor">
                <polygon points="17.3036738 5.68434189e-14 20 5.68434189e-14 20 104 0.824555778 104"></polygon>
              </svg>
            </div>
            <div class="flex flex-col justify-center p-8 bg-gray-200 lg:p-16 lg:pl-10 lg:w-1/2">
              <div>
                <p class="inline-block py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
                  <img :src="'https://loghi.guidatvoggi.it/b/' + channel['canale']['logo']" class="h-8 mb-3" alt="">

                  {{ getStartTime(channel['prog']['inizio']) }} - {{ getStartTime(channel['prog']['fine']) }}
                </p>
              </div>
              <h5 class="mb-3 text-3xl font-extrabold leading-none sm:text-4xl">
                {{ channel['prog']['title'] }}
              </h5>
              <p class="mb-5 text-gray-800">
                {{ channel['prog']['description'] }}
              </p>
              <div class="flex items-center">
                <router-link :to="'/channel/'+index"
                             class="inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-black bg-indigo-200 transition duration-200 rounded shadow-md focus:shadow-outline focus:outline-none"
                >
                  Read more
                </router-link>
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
      <pagination v-if="stasera.length > 3"  @page_changed="load" :n_elements="total_elements"></pagination>
    </div>


  </div>
</template>

<script>
import Pagination from "@/components/Pagination";

export default {
  name: 'Home',
  components: {Pagination},
  data: function () {
    return {
      canali: [],
      stasera: [],
      current_date: null,
      total_elements: 1,
    }
  },
  beforeMount() {
    this.page = localStorage.getItem('page');
    this.load();
  },
  methods: {
    load() {

      const current = new Date();
      this.current_date = `${current.getDate()}-${current.getMonth() + 1}-${current.getFullYear()}`;

      const key = 'canali_' + this.current_date;
      const key2 = 'stasera_' + this.current_date;

      let canali = localStorage.getItem(key);
      let stasera = localStorage.getItem(key2);
      if (canali != null && stasera != null) {
        this.canali = JSON.parse(canali)
        this.stasera = JSON.parse(stasera)
      } else {
        const url = "https://epgnew.guidatvoggi.it/1";
        const requestOptions = {
          method: 'POST',
          headers: this.headers
        };
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
              this.canali = data['canali'][0]['canali']
              localStorage.setItem(key, JSON.stringify(this.canali));
              this.stasera = data['stasera'][0]['canali']
              localStorage.setItem(key2, JSON.stringify(this.stasera));
            });
      }

      this.total_elements = this.stasera.length;
      let page = localStorage.getItem('current_page');
      if (page == null) {
        page = 1;
      }
      this.stasera = this.stasera.splice(0 + (10 * (page - 1)), 10);
    }
  }
}
</script>