const App = {
  data() {
    return {
      title: '',
      page: 1,
      total: 0,
      movies: [],
      showObserver: true
    }
  },
  // computed: {
  //   hasTheRest() {
      // 반응형 데이터 기준으로 갱신, 항상 반응형 데이터가 있어야 한다.
      // Getter, (true, false)
  //     return this.total > this.movies.length      
  //   }
  // },
  // mounted() {
  //   const io = new IntersectionObserver(entries => {
  //     entries.forEach(entry => {
  //       if (entry.isIntersecting) {
  //         this.searchMovies()
  //       }
  //     })
  //   })
  //   io.observe(this.$refs.observer);
  // },
  methods: {
    // async searchMovies(isFirst) {
    //   if (isFirst) {
    //     this.movies = []
    //     this.page = 1
    //   }
    //   let res = await fetch(`https://www.omdbapi.com?apikey=7035c60c&s=${this.title}&page=${this.page}`)
    //   res = await res.json()
    //   console.log(res)
    //   const { Search, totalResults } = res
    //   this.movies.push(...Search)
    //   this.page += 1
    //   this.total = Number(totalResults)
    //   this.showObserver = false
    //   await this.$nextTick()
    //   this.showObserver = true
      // setTimeout(() =>{
      //   this.showObserver = true
      // },0)
    // },
    hun(event) {
      console.log(event)
      event.preventDefault()
      return 123
    }
  }
}
Vue.createApp(App).mount('#app')