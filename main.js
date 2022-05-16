// 컴포넌트
const App = {
  // 반응형 데이터 || 반응성을 가진 데이터, 함수여야 한다.
  data() {
    return {
      // (반응형) 데이터들을 작성
      // (반응성을 가진 데이터 = 반응형 데이터 = 데이터의 반응성 => 데이터가 바뀌면 화면이 자동으로 바뀌는 것)
      title:'',
      page: 1,
      movies: [],
      msg: 'Hun?!'
      // message: 'Hello Vue!'
    }
  },
  // 계산된 데이터
  computed: {
    // Getter
    customMovies() {
      return this.movies.map(movie => {
        return {
          poster: movie.Poster,
          title: movie.Title,
          id: movie.imdbID
        }
      })
    },
    reversedMsg: {
      get() { // Getter
        return this.msg.split('').reverse().join('')
      },
      set(value) {  // Setter
        console.log('Computed Setter: ', value)
      }
    }
  },
  watch: {
    movies(newValue, oldValue) { 
      console.log('new :', newValue)
      console.log('old :', oldValue)
    }
  },
  methods: {
    // 함수들, this를 사용할 것이므로 화살표 함수가 아닌 일반 함수를 사용한다.
    async searchMovies(isFirst) {
      if (isFirst) {
        this.movies= [];
        this.page = 1
      }
      let res = await fetch(`https://www.omdbapi.com/?apikey=7035c60c&s=${this.title}&page=${this.page}`)
      res = await res.json();
      console.log(res)
      const { Search, totalResults } = res
      // 10개의 배열 값을 movies 배열에 담는다.
      // 배열의 대괄호를 떼고 넣어야 하므로 전개연산자 ...을 써준다
      this.movies.push(...Search)
      this.page += 1
      console.log(this.movies)
    }
  }
};

Vue.createApp(App).mount('#app');


// javascript에서는 데이터는 바뀌지만 화면이 바뀌지 않는다.

// const message = 'Hello Vue?'
// const h1El = document.querySelector('h1')
// h1E1.textContent = message

// h1El.addEventListener('click', () => {
//   message = 'Heropy??'
//   h1El.textContent = message
//   console.log(message)
// })

class Name {
  constructor(first, last) {
    this.first = first
    this.last = last
  }
  get fulName() {
    return `${this.first} ${this.last}` 
  }
  set fulName(value){
    console.log('Setter :', value)
  }
}

const n = new Name('Hun', 'Byeon')
console.log(n.fulName)
n.fulName = '12312312'