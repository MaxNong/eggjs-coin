<template>
  <div class="main">
    <headerAside>
      <transition slot="main" name="translate" mode="out-in">
        <router-view></router-view>
      </transition>
    </headerAside>
  </div>
</template>
<style>
  @import "./assets/scss/common.scss";
</style>
<script>
  import headerAside from 'headerAside'
  export default {
    components: {
      headerAside
    }
  }
</script>