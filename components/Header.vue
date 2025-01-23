<template>
  <header>
    <nav>
      <ul>
        <li><NuxtLink to="/hotspots">Hotspots</NuxtLink></li>
        <li><NuxtLink to="/locations">Locations</NuxtLink></li>
        <li><NuxtLink to="/requesttracking">Requests</NuxtLink></li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
// Add any logic here if needed in the future
</script>

<style scoped>
header {
  background-color: #f8f9fa;
  padding: 1rem;
}
nav ul {
  list-style: none;
  display: flex;
  gap: 1rem;
  margin: 0;
  padding: 0;
}
nav li {
  font-size: 1.2rem;
}
nav a {
  text-decoration: none;
  color: #007bff;
}
nav a:hover {
  text-decoration: underline;
}
</style>
