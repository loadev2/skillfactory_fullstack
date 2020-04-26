const taskHandler = {};

taskHandler.TASK_STORAGE_NAME = 'TASK-STORAGE';
taskHandler.LAST_ID_NAME = 'LAST-TASK-ID';
taskHandler.LAST_ID = 1;
taskHandler.currentTasksList = [];
taskHandler.getAllTasks = () => {
  if (taskHandler.currentTasksList.length === 0) {
    if (localStorage.getItem(taskHandler.TASK_STORAGE_NAME) !== null) {
      taskHandler.currentTasksList = JSON.parse(
        localStorage.getItem(taskHandler.TASK_STORAGE_NAME),
      );
    }
  }
  if (localStorage.getItem(taskHandler.LAST_ID_NAME) !== null) {
    taskHandler.LAST_ID = localStorage.getItem(taskHandler.LAST_ID_NAME);
  }
  return taskHandler.currentTasksList;
};

taskHandler.addTask = (task) => {
  taskHandler.currentTasksList.push({
    uid: taskHandler.LAST_ID,
    title: task.title,
    is_c: !!task.is_completed,
  });
  taskHandler.LAST_ID = +taskHandler.LAST_ID + 1;
  taskHandler.updateLocalStorageTasksState();
};

taskHandler.editTask = (id, task) => {
  taskHandler.currentTasksList = taskHandler.currentTasksList.map((item) => {
    if (item.uid === id) {
      const newItem = {};
      newItem.uid = id;
      newItem.title = task.title;
      newItem.is_c = !!task.is_completed;
      return newItem;
    }
    return item;
  });
  taskHandler.updateLocalStorageTasksState();
};

taskHandler.deleteTask = (id) => {
  taskHandler.currentTasksList = taskHandler.currentTasksList.filter(
    (item) => item.uid !== id,
  );
  taskHandler.updateLocalStorageTasksState();
};

taskHandler.getCompletedVsAll = () => `${taskHandler.currentTasksList.filter((item) => item.is_c).length} / ${
  taskHandler.currentTasksList.length
}`;

taskHandler.updateLocalStorageTasksState = () => {
  console.log(taskHandler.currentTasksList);
  localStorage.setItem(
    taskHandler.TASK_STORAGE_NAME,
    JSON.stringify(taskHandler.currentTasksList),
  );
  localStorage.setItem(taskHandler.LAST_ID_NAME, taskHandler.LAST_ID);
};

export default taskHandler;
