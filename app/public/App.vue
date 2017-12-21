<template>
    <div class="main">
        <transition name="translate" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>
<style>
    @import "./assets/scss/common.scss"
</style>
<script>
  export default {
  }
</script>