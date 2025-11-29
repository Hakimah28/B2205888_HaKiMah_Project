<template>
  <div id="app">
    <!-- Navbar -->
    <Navbar />

    <!-- Nội dung chính -->
    <main class="main-content">
      <router-view></router-view>
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style src="./assets/styles.css"></style>
