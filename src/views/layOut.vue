<template>
  <div class="main">
    <side-bar class="sidebar-container"></side-bar>
    <div class="main-container">
      <navBar></navBar>
      <mainBar></mainBar>
    </div>
  </div>
</template>
<script>
import mainBar from "../components/mainBar";
import navBar from "../components/navBar";
import sideBar from "../components/sideBar";
export default {
  components: {
    mainBar,
    navBar,
    sideBar
  }
};
</script>

