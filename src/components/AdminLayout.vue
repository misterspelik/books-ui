<template>
  <div class="app-wrapper">
    <div class="sidebar-container">
      <navbar />
    </div>
    <div class="main-container">
      <section class="app-main">
        <transition name="fade-transform" mode="out-in">
        <!-- or name="fade" -->
        <!-- <router-view :key="key"></router-view> -->
        <router-view class="app-container" />
        </transition>
    </section>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar'

export default {
  name: 'AdminLayout',
  components: {
    Navbar
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  position: relative;
  overflow: hidden;
}

.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

</style>
