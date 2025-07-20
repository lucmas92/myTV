const { createApp, ref } = Vue;

createApp({
  setup() {
    const titolo = ref('Vue + Netlify Functions');
    const dati = ref(null);

    async function caricaDati() {
      const res = await fetch('/.netlify/functions/apiProxy');
      dati.value = await res.json();
    }

    return { titolo, dati, caricaDati };
  }
}).mount('#app');
