<template>
  <div>
    <h1>Hotspot Search</h1>
    <div class="search-container">
      <input
          type="text"
          v-model="searchQuery"
          placeholder="Enter search term"
          class="search-input"
      />
      <button @click="performSearch" class="search-button">Search</button>
    </div>
    <table v-if="results.length > 0" class="results-table">
      <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Address</th>
        <th>Longitude</th>
        <th>Latitude</th>
        <th>API code</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(result, index) in results" :key="result.id">
        <td>{{ index + 1 }}</td>
        <td>{{ result.name }}</td>
        <td>{{ result.address }}</td>
        <td>{{ result.longitude }}</td>
        <td>{{ result.latitude }}</td>
        <td>{{ result.googleApiCode }}</td>
        <td>
          <button @click="submitHotspot(result)">Submit</button>
        </td>
      </tr>
      </tbody>
    </table>
    <p v-else-if="searchPerformed" class="no-results">No results found.</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import {useNuxtApp} from "#app";

const searchQuery = ref("");
const results = ref([]);
const searchPerformed = ref(false);

const performSearch = async () => {
  if (searchQuery.value.trim() === "") {
    alert("Please enter a search term.");
    return;
  }

  try {
    const { $axios } = useNuxtApp();
    const baseUrl = useRuntimeConfig().public.backendUrl;
    const response = await $axios.get(`${baseUrl}/hotspots/search`, {
      params: { query: searchQuery.value },
    });
    results.value = response.data; // Adjust based on the response structure
    searchPerformed.value = true;
  } catch (error) {
    console.error("Error fetching search results:", error);
    alert("An error occurred while searching. Please try again.");
    results.value = [];
    searchPerformed.value = true;
  }
};

const createHotspotRequestBody = (hotspot) => ({
  name: hotspot.name,
  address: hotspot.address,
  longitude: hotspot.longitude,
  latitude: hotspot.latitude,
  googleApiCode: hotspot.googleApiCode,
});
const submitHotspot = async (hotspot) => {
  const { $axios } = useNuxtApp(); // Use the Axios plugin
  const requestBody = createHotspotRequestBody(hotspot);
  const {backendUrl} = useRuntimeConfig().public;
  console.log(backendUrl)

  try {
    const response = await $axios.post(`${backendUrl}/hotspots`, requestBody);
    alert(`Hotspot submitted successfully: ${response.data.message}`);
  } catch (error) {
    console.error("Error submitting hotspot:", error);
    alert("Failed to submit hotspot. Please try again.");
  }
};
</script>

<style scoped>
h1 {
  margin-bottom: 1rem;
  text-align: center;
  font-size: 2rem;
  color: #333;
}

.search-container {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.search-input {
  padding: 0.5rem;
  font-size: 1rem;
  width: 300px;
}

.search-button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.search-button:hover {
  background-color: #0056b3;
}

.results-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.results-table th,
.results-table td {
  border: 1px solid #ddd;
  text-align: left;
  padding: 8px;
}

.results-table th {
  background-color: #007bff;
  color: white;
  text-transform: uppercase;
}

.results-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.results-table tr:hover {
  background-color: #f1f1f1;
}

.no-results {
  text-align: center;
  margin-top: 1rem;
  color: #777;
  font-size: 1.2rem;
}
</style>
