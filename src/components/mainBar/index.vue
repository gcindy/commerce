<template>
  <section class="app-main">
    <transition
      name="fade"
      mode="out-in"
    >
      <router-view></router-view>
    </transition>
  </section>
</template>

<style lang="less">
.app-main {
  min-height: 100%;
  margin-top: 20px;
}
</style>
