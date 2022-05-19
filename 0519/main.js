const App = {
  data() {  // 1. data를 함수로 사용하지 않으면 재사용할 때 데이터가 꼬인다
    return {
      // 2. 팩토리함수: 참조형 데이터를 반환하는 함수
      // 4. 데이터는 단방향 데이터 바인딩이다. 메소드를 통해 양방향 해줘야 한다.
      title: 'Hello~',
      checked: true,
      radio: '',
    }
  },
  methods: {
    changeInput(event) {
      console.log(event.target.value)
      this.title = event.target.value
    }
  }
}

// 3. component는 재사용을 전제로 한다.
Vue
  .createApp(App)
  .mount('#app')