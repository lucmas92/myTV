import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import './assets/tailwind.css'
import Home from "@/components/Home";
import ChannelDetail from "@/components/ChannelDetail";

Vue.use(VueRouter)
Vue.config.productionTip = false

Vue.mixin({
    data: function () {
        return {
            'key': 'programmiTV',
        }
    },
    methods: {
        /**
         * Metodo che ritorna l'ora di inizio e fine di un programma
         * @param time
         * @returns {string}
         */
        getStartTime(time) {
            let d = new Date(time);
            return `${("0" + (d.getHours())).slice(-2)}:${("0" + (d.getMinutes() + 1)).slice(-2)}`;
        },
        current_date() {
            const current = new Date();
            return `${current.getDate()}-${current.getMonth() + 1}-${current.getFullYear()}`;
        },
        headers() {
            return {epgguidatv: 'gu1d4tv53gr3t4'};
        },
        async getCanali() {
            let data = await this.getData();
            return data['canali'];
        },
        async getStasera() {
            let data = await this.getData();
            return data['stasera'];
        },
        async setCacheDataFromApi() {
            const url = "https://epgnew.guidatvoggi.it/0";
            const requestOptions = {
                method: 'POST',
                headers: this.headers()
            };
            let response = await fetch(url, requestOptions);

            let data = await response.json();

            let today = new Date().getDate()
            let json_data = {
                [today]: {
                    'canali': data['canali'][0]['canali'],
                    'stasera': data['stasera'][0]['canali'],
                    'seconda_serata': data['seconda-serata'][0]['canali']
                }
            };
            localStorage.setItem(this.key, JSON.stringify(json_data));
        },
        async resetCacheDataFromApi() {
            // localStorage.removeItem(this.key);
            await this.setCacheDataFromApi();
        },
        async getData() {
            let data = JSON.parse(localStorage.getItem(this.key));
            let today = new Date().getDate()

            // se non c'è la chiave in chace, creo tutto da 0
            if (data === null) {
                await this.setCacheDataFromApi()
                data = JSON.parse(localStorage.getItem(this.key));
            } else {
                // se c'è la chiave, verifico che i dati salvati siano quelli di oggi, altrimenti cancello tutto e ricreo la cache
                if (!(today in data)) {
                    await this.resetCacheDataFromApi();
                    data = JSON.parse(localStorage.getItem(this.key));

                }
            }
            return data[today]
        }
    }


})

const routes = [
    {path: '/', component: Home},
    {path: '/channel/:number', component: ChannelDetail},
]

let filter = function (text, length, clamp) {
    clamp = clamp || '...';
    let node = document.createElement('div');
    node.innerHTML = text;
    let content = node.textContent;
    return content.length > length ? content.slice(0, length) + clamp : content;
};

Vue.filter('truncate', filter);

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
    routes // short for `routes: routes`
})

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
