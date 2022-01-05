<template>
  <div>
    <div class="flex flex-col gap-6 py-4" v-if="channels">
      <section class="channel" v-for="(channel) in channels" :key="channel['canale']['numero']">
        <div class="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 py-5 lg:py-10">
          <img :src="'https://loghi.guidatvoggi.it/b/' + channel['canale']['logo']" class="h-8 mb-3" alt="">
          <div class="relative bg-gray-300 shadow-md rounded-lg hover:shadow-xl">
            <div class="flex flex-row">
              <section class="h-96 overflow-auto">
                <div class="flex flex-col items-start px-4 py-2">
                  <div class="flex w-full flex-row" v-for="(prog,index) in channel['prog']" :key="index">
                    <div class="w-2/6 md:w-1/6 text-xs md:text-base text-right pr-4">
                      {{ getStartTime(prog['inizio']) }} -
                      {{ getStartTime(prog['fine']) }}
                    </div>
                    <div class="w-4/6 md:w-5/6 flex flex-col">
                      <h2 class="text-lg lg:text-xl">
                        {{ prog['title'] }}
                        <span class="text-sm">({{ prog['category'] }} - {{ prog['genre'] }})</span>
                      </h2>
                      <p class="text-xs lg:text-sm py-4">{{ prog['description'] | truncate(400, '...') }}</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Programmazione',
  data: function () {
    return {
      channels: []
    }
  },
  beforeMount() {
    this.load();
  },
  methods: {
    load() {

      const key = 'canali_' + this.current_date;
      let channels = localStorage.getItem(key);
      if (channels != null) {
        this.channels = JSON.parse(channels)
      } else {
        const url = "https://epgnew.guidatvoggi.it/0";
        let requestOptions = {
          method: 'POST',
          headers: this.headers
        };
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
              this.channels = data['canali'][0]['canali']
              localStorage.setItem(key, JSON.stringify(this.channels));
            });
      }
      this.channels = this.channels.splice(0, 10);

    }
  }
}
</script>