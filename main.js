// 컴포넌트
const App = {
  data() {
    return {
      // (반응형) 데이터들을 작성
      // (반응성을 가진 데이터 = 반응형 데이터 = 데이터의 반응성 => 데이터가 바뀌면 화면이 자동으로 바뀌는 것)
      message: 'Hello Vue!'
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