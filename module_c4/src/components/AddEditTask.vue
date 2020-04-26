<template>
  <div>
    <b-modal ref="addTodoModal" id="todo-modal" :title="formTitle" hide-footer>
      <b-form @submit="onSubmit" @reset="onReset" class="w-100">
        <b-form-group
          id="form-description-group"
          label="Описание:"
          label-for="form-description-input"
        >
          <b-form-input
            id="form-description-input"
            type="text"
            v-model="addTodoForm.title"
            required
            placeholder="Завести задачу"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-complete-group">
          <b-form-checkbox-group
            v-model="addTodoForm.is_completed"
            id="form-checks"
          >
            <b-form-checkbox value="true">Задача выполнена?</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
        <b-button type="submit" variant="primary">{{ buttonName }}</b-button>
        <b-button type="reset" variant="danger">Сброс</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import taskHandler from '../services/taskServices';

export default {
  props: ['editedtask', 'mode', 'message', 'showConfirmation'],
  data() {
    return {};
  },

  computed: {
    addTodoForm() {
      if (this.editedtask && this.mode === 'edit') {
        return {
          title: this.editedtask.title,
          is_completed: this.editedtask.is_c,
        };
      }
      return {
        title: '',
        is_completed: [],
      };
    },

    formTitle() {
      if (this.mode === 'edit') {
        return `Отредактировать задачу: ${this.editedtask.title}`;
      }
      return 'Добавить задачу';
    },
    buttonName() {
      if (this.mode === 'edit') {
        return 'Обновить';
      }
      return 'Добавить';
    },
  },

  methods: {
    resetForm() {
      this.addTodoForm.title = '';
      this.addTodoForm.is_completed = [];
    },
    onSubmit(event) {
      event.preventDefault();
      this.$refs.addTodoModal.hide();
      const requestData = {
        title: this.addTodoForm.title,
        is_completed: this.addTodoForm.is_completed[0],
      };
      this.$emit('update-message-value', 'New task was created');
      if (this.mode === 'edit') {
        taskHandler.editTask(this.editedtask.uid, requestData);
      } else {
        taskHandler.addTask(requestData);
      }
      this.$emit('update-to-do-list');
      this.resetForm();
    },
    onReset(event) {
      event.preventDefault();
      this.$refs.addTodoModal.hide();
      this.resetForm();
    },
  },
};
</script>

<style scoped></style>
