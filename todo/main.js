import { nanoid } from 'https://cdn.jsdelivr.net/npm/nanoid/nanoid.js'

const App = {
  data() { 
    return {
      title: '',
      todos: [
        {id: nanoid(), title:'ABC'},
        {id: nanoid(), title:'XYZ'},
      ],
      editMode: false
    }
  },
  methods: {
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
    onEditMode() {
      this.editMode = true
    },
    deleteTodo(todoToDelete) {
      const index = this.todos.findIndex(item => item.id === todoToDelete.id);
      this.todos.splice(index, 1);
    },
    updateTitle(todo, event) {
      console.log(event)
      todo.title = event
    }
  }
}

const TodoItem = {
  template: /* HTML */ `
  <li>
    <span v-if="!editMode">
      {{ todo.title }}
    </span>
    <input 
      v-else 
      :value="todo.title" 
      @input="inputTitle" />
    <button 
      v-if="!editMode" 
      @click="onEditMode">
      수정!
    </button>
    <button 
      v-else 
      @click="offEditMode">
      확인!
    </button>
    <button @click="deleteTodo">
      삭제!
    </button>
  </li>
  `,
  props: {
    todo: Object
  },
  data() {
    return {
      title: '컴포넌트',
      editMode: false
    }
  },
  methods: {
    onEditMode() {
      this.editMode = true
    },
    offEditMode() {
      this.editMode = false
    },
    inputTitle(event) {
      this.$emit('update-title', event.target.value)
    },
    deleteTodo() {

    }
  }
};

const app = Vue.createApp(App);
app.component('todo-item', TodoItem);
app.mount('#app');