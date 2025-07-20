const {createApp, ref, onMounted} = Vue;

createApp({
    setup() {
        const canali = ref(null);
        const stasera = ref(null);
        const loading = ref(false)


        async function caricaDati() {
            loading.value = true;

            // verifico se i dati sono già stati caricati in localStorage
            const datiLocalStorage = localStorage.getItem('dati');
            console.log('caricamento Dati')
            if (!datiLocalStorage) {
            console.log('dati non in localstorage')

                const res = await fetch('.netlify/functions/apiProxy');
                const data = await res.json();
                console.log('dati ricevuti', data);

                // salvo i dati in localStorage
                localStorage.setItem('canali', JSON.stringify(data['canali']));
                localStorage.setItem('stasera', JSON.stringify(data['stasera'][0]['canali']));
                localStorage.setItem('dati', '1');
            }

            canali.value = JSON.parse(localStorage.getItem('canali'))
            stasera.value = JSON.parse(localStorage.getItem('stasera'))
            console.log('stasera', stasera.value);
            loading.value = false;
        }

        onMounted(async () => {
            await caricaDati();
        });


        return {canali, stasera, loading};
    }
}).mount('#app');
