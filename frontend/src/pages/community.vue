<script setup lang="ts">
const users = ref([]);
import expressService from "../services/expressQueries"

// Fetch data asynchronously
const fetchUsers = async () => {
  const response = await expressService.getUsers();
  users.value = response.data;
};
fetchUsers();
</script>
<template>
    <div>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.username }}
      </li>
    </ul>
    </div>
</template>