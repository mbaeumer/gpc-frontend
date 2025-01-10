<template>
  <h1>Locations</h1>
  <div>
    <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else>
      <table>
        <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Entrance</th>
          <th>Rest room</th>
          <th>Seating</th>
          <th>Address</th>
          <th>API code</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(location, index) in locations" :key="location.id">
          <td>{{ index + 1 }}</td>
          <td>{{ location.name }}</td>
          <td>{{ location.accessibleEntrance }}</td>
          <td>{{ location.accessibleRestRoom }}</td>
          <td>{{ location.accessibleSeating }}</td>
          <td>{{ location.formattedAddress }}</td>
          <td>{{ location.googleApiCode }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
const {data: locations, pending, error} = await useFetch('http://localhost:8080/locations')
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