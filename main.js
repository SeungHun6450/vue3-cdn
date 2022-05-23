// 컴포넌트
const App = {
  // 반응형 데이터 || 반응성을 가진 데이터, 함수여야 한다.
  data() {
    return {
      title:'Hello~', 
    }
  },
  computed: {
    reversedMsgComputed: {
      get() { // Getter
        return this.msg.split('').reverse().join('')
      },
      set(value) {  // Setter
        console.log('Computed Setter: ', value)
      }
    }
  },
  methods: {
    reverseMsgMethod() {
      return this.title.split('').reverse().join('')
    }
  }
};

Vue.createApp(App).mount('#app');
