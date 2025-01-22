<template>
  <h1>Request tracking</h1>
  <div>
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else>
      <table>
        <thead>
        <tr>
          <th>#</th>
          <th>Time</th>
          <th>Type</th>
          <th>Payload</th>
          <th>User</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(tracking, index) in trackings" :key="tracking.id">
          <td>{{ index + 1 }}</td>
          <td>{{ tracking.executionTime }}</td>
          <td>{{ tracking.googleRequestTypeDto.name }}</td>
          <td>{{ tracking.payload }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
const baseUrl = useRuntimeConfig().public.apiBaseUrl;
const {data: trackings, pending, error} = await useFetch(`${baseUrl}/requesttracking`)
</script>
<style scoped>
h1 {
  margin-bottom: 1rem;
  text-align: center;
  font-size: 2rem;
  color: #333;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  font-size: 1rem;
  color: #333;
}

thead {
  background-color: #f4f4f4;
}

th,
td {
  border: 1px solid #ddd;
  text-align: left;
  padding: 8px;
}

th {
  background-color: #007bff;
  color: white;
  text-transform: uppercase;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #f1f1f1;
}
</style>