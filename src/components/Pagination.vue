<template>
  <div class="items-center space-y-2 text-xs sm:space-y-0 sm:space-x-3 sm:flex text-white w-full flex justify-center">
    <span class="block" v-if="max_page">Page {{ current_page }} of {{ max_page }}</span>
    <div class="space-x-1">
      <button title="previous" type="button" @click="prev_page"
              class="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow hover:bg-gray-700">
        <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"
             stroke-linejoin="round" class="w-4">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <button title="next" type="button" @click="next_page"
              class="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow hover:bg-gray-700">
        <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"
             stroke-linejoin="round" class="w-4">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    n_elements: Number,
  },
  data: function () {
    return {
      current_page: 1,
      max_page: null
    }
  },
  beforeMount() {
    this.max_page = Math.ceil(this.n_elements / 10);
    let page = localStorage.getItem('current_page');
    if (page == null) {
      page = 1;
      localStorage.setItem('current_page', 1);
    }
    this.current_page = page
  },
  watch: {
    current_page: function (val) {
      localStorage.setItem('current_page', val);
      this.$emit('page_changed')
    },
  },
  methods: {
    next_page() {
      if (this.current_page < this.max_page) {
        this.current_page = parseInt(this.current_page) + 1;
      }
    },
    prev_page() {
      if (this.current_page > 1) {
        this.current_page = parseInt(this.current_page) - 1;
      }
    },
  }
}
</script>