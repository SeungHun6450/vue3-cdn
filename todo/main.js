import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js'
import Sortable from 'https://cdn.skypack.dev/sortablejs';

const App = {
  template: /*html */ `
  <input v-model="title" @keydown.enter="addTodo" />
    <ul ref="todoList">
      <todo-item 
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @update-title="todo.title = $event"
        @delete-todo="deleteTodo">
      </todo-item>  
    </ul>
  `
  ,
  data() { 
    return {
      title: '',
      todos: []
    }
  },
  watch: {
    todos: {
      handler() {
        this.saveTodos()
      },
      deep: true
    }
  },
  created() {
    this.fetchTodos()
  },
  mounted(){
    this.initSortable()
  },
  methods: {
    fetchTodos() {
      this.todos = JSON.parse(localStorage.getItem('todos')) || []
    },
    saveTodos() {
      localStorage.setItem('todos', JSON.stringify(this.todos))
    },
    reorderTodos(oldIndex, newIndex) {
      // const clone = this.todos[oldIndex]
      const clone = { ...this.todos[oldIndex] }
      this.todos.splice(oldIndex, 1)
      this.todos.splice(newIndex, 0, clone)
    },
    addTodo() {
      if(!this.title.trim()) {
        return
      }
      this.todos.push({
        id: nanoid(),
        // id: this.todos.length,
        title: this.title
      })
      this.title = '';
    },
    deleteTodo(todoToDelete) {
      const index = this.todos.findIndex(item => item.id === todoToDelete.id);
      this.todos.splice(index, 1);
    },
    updateTitle(todo, event) {
      console.log(event)
      todo.title = event
    },
    initSortable() {
      new Sortable(this.$refs.todoList, {
        handle: 'li .handle', // 드래그 핸들이 될 요소의 선택자를 입력합니다.
        delay: 50, // 클릭이 밀리는 것을 방지하기 위해 약간의 지연 시간을 추가합니다.
        animation: 0, // 정렬할 때 애니메이션 속도(ms)를 지정합니다.
        forceFallback: true, // 다양한 환경의 일관된 Drag&Drop(DnD)을 위해 HTML5 기본 DnD 동작을 무시하고 내장 기능을 사용합니다.
        // 요소의 DnD가 종료되면 실행할 핸들러(함수)를 지정합니다.
        onEnd: event => {
          console.log(event)
          this.reorderTodos(event.oldIndex, event.newIndex)
        }
      })
    }
  }
}

const TodoItem = {
  template: /* HTML */ `
    <li>
      <div class="handle">::</div>
      <template v-if="!editMode"> 
        <span class="title">
          {{ todo.title }}
        </span>
        <the-button 
          color="orange"
          @click.stop="onEditMode">
          수정!
        </the-button>
        <the-button
          color="danger" 
          @click="deleteTodo">
          삭제
        </the-button>
      </template>
      <template v-else> 
        <div @click.stop>
          <input 
            ref="titleInput"
            :value="title" 
            @input="title = $event.target.value"
            @keydown.enter="offEditMode(), updateTitle()"
            @keydown.esc="offEditMode" />
          <the-button
            color="primary"
            @click="offEditMode(), updateTitle()">
            확인!
          </the-button>
          <the-button @click="offEditMode">
            취소!
          </the-button>
        </div>
      </template>
    </li>
  `,
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      title: '',
      editMode: false
    }
  },
  methods: {
    async onEditMode() {
      this.editMode = true
      this.title = this.todo.title
      window.addEventListener('click', this.offEditMode)
      await this.$nextTick()
      this.$refs.titleInput.focus()
    },
    offEditMode() {
      this.editMode = false
      window.removeEventListener('click', this.offEditMode)
    },
    updateTitle() {
      this.$emit('update-title', this.title)
    },
    deleteTodo() {
      this.$emit('delete-todo', this.todo)
    }
  }
};

const TheButton = {
  template: /* html */ `
    <button 
      :style="style"
      class="btn">
      <slot></slot>
    </button>
  `,
  props: {
    color: {
      type: String
    }
  },
  computed: {
    style() {
      switch(this.color) {
        case 'danger':
          return{
            backgroundColor: 'red',
            color: '#fff'
          }
        case 'primary' :
          return {
            backgroundColor: 'royalblue',
            color: '#fff'
          }
        default: 
          return {
            backgroundColor: this.color
          }
      }
    }
  }
}

const app = Vue.createApp(App);
app.component('todo-item', TodoItem);
app.component('the-button', TheButton)
app.mount('#app');