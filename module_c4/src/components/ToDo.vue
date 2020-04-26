<template>
  <div class="container">
    <div class="col-sm-10">
      <h1>Задачи</h1>
      <h3>Выполнено задач: {{ getCompletedVsAll }}</h3>
      <confirmation
        :message="message"
        v-if="showConfirmation"
        @close-window="closeMessageWindow"
      ></confirmation>
      <button
        type="button"
        id="task-add"
        class="btn btn-success btn-sm align-left d-block"
        v-b-modal.todo-modal
        @click="changeMode('add')"
      >
        Добавить задачу
      </button>
      <add-edit-task
        :mode="mode"
        :editedtask="editedtask"
        @update-to-do-list="getTodos"
        @update-message-value="updateMessageValue"
      ></add-edit-task>
      <table class="table table-dark table-stripped table-hover">
        <thead class="thead-light">
          <tr>
            <th>Uid</th>
            <th>Описание</th>
            <th>Выполнена?</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(todo, index) in todos" :key="index">
            <td class="todo-uid">{{ todo.uid }}</td>
            <td>{{ todo.title }}</td>
            <td>
              <span v-if="todo.is_c">Выполнено</span>
              <span v-else>Не выполнено</span>
            </td>
            <td>
              <div class="btn-group" role="group">
                <button
                  type="button"
                  class="btn btn-secondary btn-sm"
                  v-b-modal.todo-modal
                  @click="updateToDo(todo)"
                >
                  Обновить
                </button>
                &nbsp;
                <button
                  type="button"
                  class="btn btn-danger btn-sm"
                  @click="deleteToDo(todo)"
                >
                  X
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import Confirmation from './Confirmation.vue';
import AddEditTask from './AddEditTask.vue';
import taskHandler from '../services/taskServices';

export default {
  data() {
    return {
      todos: [],
      message: '',
      showConfirmation: false,
      mode: 'add',
      editedtask: null,
    };
  },

  computed: {
    getCompletedVsAll() {
      return `${this.todos.filter((item) => item.is_c).length} / ${this.todos.length}`;
    },
  },

  components: {
    confirmation: Confirmation,
    'add-edit-task': AddEditTask,
  },
  methods: {
    getTodos() {
      this.todos = taskHandler.getAllTasks();
    },
    deleteToDo(todo) {
      taskHandler.deleteTask(todo.uid);
      this.message = 'Task was deleted';
      this.showConfirmation = true;
      this.getTodos();
    },
    closeMessageWindow() {
      this.message = '';
      this.showConfirmation = false;
    },
    updateMessageValue(value) {
      this.message = value;
      this.showConfirmation = true;
    },
    changeMode(value) {
      this.mode = value;
    },
    updateToDo(todo) {
      this.changeMode('edit');
      this.editedtask = todo;
    },
  },
  created() {
    this.getTodos();
  },
};
</script>
<style scoped>
button#task-add {
  margin-top: 20px;
  margin-bottom: 20px;
}
h1,
td {
  text-align: left;
}
.todo-uid {
  text-align: right;
}
</style>
