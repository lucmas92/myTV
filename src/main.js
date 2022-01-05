import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import './assets/tailwind.css'
import Home from "@/components/Home";
import ChannelDetail from "@/components/ChannelDetail";
import Programmazione from "@/components/Programmazione";

Vue.use(VueRouter)
Vue.config.productionTip = false

Vue.mixin({
    data: function () {
        return {
            get current_date() {
                const current = new Date();
                return `${current.getDate()}-${current.getMonth() + 1}-${current.getFullYear()}`;
            },
            get headers() {
                return {epgguidatv: 'gu1d4tv53gr3t4'};
            }
        }
    },
    methods: {
        getStartTime(time) {
            let d = new Date(time);
            return `${("0" + (d.getHours() )).slice(-2)}:${("0" + (d.getMinutes() + 1)).slice(-2)}`;
        },
    }
})

const routes = [
    {path: '/', component: Home},
    {path: '/programmazione', component: Programmazione},
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
