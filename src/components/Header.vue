<template>
  <div class="header">
    <div class="header--top">
      <img src="../assets/images/logo.png" alt="Logo" class="header--top__logo">
      <span class="header--top__slogan">
        Kan du styre din by og blive genvalgt?
      </span>
    </div>
    <div class="header--bottom">
      <img src="../assets/images/icons/icon_scenarios.png" alt="ICON" class="header--bottom__icon">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="scss" scoped>
  .header {
    width: 566px;
    text-emphasis: center;

    &--top {
      background-color: #231F20;
      height: 265px;

      &__logo {
        margin-top: 26px;
      }

      &__slogan {
        display: block;
        margin-top: 9px;
        color: rgba(255,255,255,0.5);
        font-family: "DINNextW01-Bold";
        font-size: 18px;
        line-height: 25px;
        text-align: center;
      }
    }

    &--bottom {
      height: 40px;
      background-color: #413B3D;

      &__icon {
        border-radius: 50%;
        position: relative;
        top: -30px;
      }
    }
  }
</style>
