<template>
  <div class="dropdown-container">
    <label for="hotspot-select">Filter by Hotspot:</label>
    <select id="hotspot-select" v-model="selectedHotspot" @change="onDropdownChange">
      <option value="all">All</option>
      <option v-for="hotspot in hotspots" :key="hotspot.id" :value="hotspot.id">
        {{ hotspot.name }}
      </option>
    </select>
    <button
        @click="syncLocations"
        :disabled="selectedHotspot === 'all'"
        class="sync-button"
    >
      Sync Locations
    </button>
  </div>

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
import { ref, onMounted } from "vue";
import { useNuxtApp } from "#app";

// Data references
const results = ref([]);
const hotspots = ref([]);
const locations = ref([]);
const selectedHotspot = ref("all"); // Default to "All"

// Fetch hotspots for the dropdown
const fetchHotspots = async () => {
  const { $axios } = useNuxtApp();
  const baseUrl = useRuntimeConfig().public.apiBaseUrl;

  try {
    const response = await $axios.get(`${baseUrl}/hotspots`);
    hotspots.value = response.data; // Adjust this based on your response structure
  } catch (error) {
    console.error("Error fetching hotspots:", error);
    alert("Failed to fetch hotspots.");
  }
};

// Event handler for dropdown change
const onDropdownChange = async() => {
  console.log("Selected hotspot ID:", selectedHotspot.value);
  const baseUrl = useRuntimeConfig().public.apiBaseUrl;
  if (selectedHotspot.value === "all") {
    console.log("All hotspots selected. Fetching all locations...");
    try {
      const { $axios } = useNuxtApp();
      const response = await $axios.get(`${baseUrl}/locations`);
      locations.value = response.data; // Populate the table with the response data
      console.log("Locations fetched successfully:", results.value);
    } catch (error) {
      console.error("Error fetching locations:", error);
      alert("Failed to fetch locations.");
    }
  } else {
    try {
      const { $axios } = useNuxtApp();

      const response = await $axios.get(`${baseUrl}/locations/hotspot/${selectedHotspot.value}`);
      locations.value = response.data; // Populate the table with the filtered results
      console.log("Filtered locations fetched successfully:", results.value);
    } catch (error) {
      console.error(`Error fetching locations for hotspot ID ${selectedHotspot.value}:`, error);
      alert(`Failed to fetch locations for hotspot ID ${selectedHotspot.value}.`);
    }
  }
};

const syncLocations = async () => {
  console.log("Syncing locations for hotspot ID:", selectedHotspot.value);
  try {
    const { $axios } = useNuxtApp();
    //pending.value = true;

    // Find the selected hotspot's details
    const selectedHotspotDetails = hotspots.value.find(
        (hotspot) => hotspot.id === selectedHotspot.value
    );
    console.log("details: " + selectedHotspotDetails)

    if (!selectedHotspotDetails) {
      console.error("Hotspot details not found.");
      alert("Failed to sync locations: Hotspot details not found.");
      return;
    }

    // Prepare the payload
    const payload = {
      id: selectedHotspot.value,
      longitude: selectedHotspotDetails.longitude,
      latitude: selectedHotspotDetails.latitude,
    };

    console.log("payload: " + payload)

    // Make the POST request
    const baseUrl = useRuntimeConfig().public.apiBaseUrl;
    const response = await $axios.post(`${baseUrl}/locations/sync`, payload);
    console.log("Sync successful:", response.data);
    locations.value = response.data
  } catch (err) {
    console.error("Error syncing locations:", err);
    alert("Failed to sync locations.");
  } finally {
    //pending.value = false;
  }
};

onMounted(() => {
  fetchHotspots();
});
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