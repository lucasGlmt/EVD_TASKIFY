<template>
    <div class="task-container">
        <h3>Liste des tâches</h3>
        <div class="row">
            <div class="col">
                <form @submit.prevent="addTask" class="mb-4" id="add-task-form">
                    <div class="form-group">
                        <label for="task-name">Nom de la tâche</label>
                        <input id="task-name" v-model="newTaskName" placeholder="Sauver le monde" class="form-control" />
                    </div>
                </form>
                <div>
                    <div class="form-check" v-for="task of tasks" :key="task.id">
                        <input class="form-check-input" type="checkbox" value="" :id="task.id" v-bind="task.done" @change="() => toogle(task.id)">
                        <label class="form-check-label" :for="task.id">
                            {{ task.name }}
                        </label>
                    </div>
                </div>
            </div>
            <div class="col">
                <h5>Statistiques</h5>
                <div class="stats">
                    <div class="progress" id="pg-container" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                        <div class="progress-bar" id="pg-val" :style="`width: ${computePercentage()}%`"></div>
                    </div>
                </div>
                <div class="options">
                    <h5>Options</h5>
                    <button :disabled="tasks.length === 0" class="btn btn-danger" id="reset-btn" @click="reset">Remettre à zero</button>
                </div>
            </div>
        </div>
    </div>
   
   
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Task } from '../models/Task';

const tasks = ref([] as Task[]);
let newTaskName = ""

const addTask = () => {
    if (!newTaskName) return;
    tasks.value.push(Task.create(newTaskName));
    newTaskName = "";
}

const toogle = (id: string) => {
    const index = tasks.value.findIndex(x => x.id === id);
    tasks.value[index].done = !tasks.value[index].done; 
}

const computePercentage = () => {
    const numberDone = tasks.value.filter(x => x.done === true).length;
    return (numberDone / tasks.value.length) * 100;
}

const reset = () => {
    tasks.value = [];
}
</script>

<style scoped>
.task-container {
    margin-top: 20px;
}

.options {
    margin-top: 10px;
}
</style>