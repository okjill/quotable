// static data
const numPerPage = 9;
const url = 'https://gist.githubusercontent.com/okjill/988ae37f63f3126fb4e0d02d9a6cc2ec/raw/0ea236f699ef76f7755528654160fa0924c6b7cd/quotes.json';

new Vue({
  el: '#app',
  data: {
    colorOrder: [
      "blue",
      "green",
      "marigold",
      "orange",
      "pink", 
      "purple",
      "red-orange"
    ],
    currentPage: 1,
    quotes: [],
    searchTerm: '',
    selectedQuoteId: null,
    theme: null
  },
  created() {
    this.fetchQuotes();
  },
  computed: {
    filteredQuotes() {
      let filtered = this.quotes;

      if (this.theme && this.theme !== 'all') {
        filtered = filtered.filter(quote => quote.theme === this.theme);
      }
      
      if (this.searchTerm) {
        filtered = filtered.filter(quote => quote.quote.toLowerCase().includes(this.searchTerm.toLowerCase())); 
      }
      return filtered;
    },
    highlightedQuote() {
      if (this.selectedQuoteId || this.selectedQuoteId === 0) {
        const id = this.selectedQuoteId;
        const color = this.colorOrder[id % this.colorOrder.length];
        document.documentElement.style.setProperty('--highlight-color', `var(--${color})`);

        return {
          context: this.quotes[id].context,
          quote: this.quotes[id].quote,
          source: `– ${this.quotes[id].source},`
        };
      }
    },
    pagination() {
      return Math.ceil(this.filteredQuotes.length / numPerPage);
    },
    visibleQuotes() {
      const start = (this.currentPage * numPerPage) - numPerPage;
      const end = this.currentPage * numPerPage;

      return this.filteredQuotes.slice(start, end);
    },
  },
  methods: {
    async fetchQuotes() {
      await axios.get(url).then(response => {
        return response.data.forEach((item, id) => this.quotes.push({ ...item, id }));
      }).catch(error => { console.log(error); }); 
    },
    filterByTheme(e) {
      // when theme changes, reset pagination and highlighted quote
      this.currentPage = 1;
      this.selectedQuoteId = null;
      this.theme = e.target.value;
    }
  }
});
