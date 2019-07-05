<template>
  <div class="body">
    <span class="title">
      Scenarie
    </span>
    <span class="subtitle">
      Vælg hvilket scenarie der bliver spillet efter
    </span>
    <div class="action">
      <button class="button active">Kultur</button>
      <button class="button">Vækst</button>
      <button class="button">Natur</button>
      <button class="button">Sunhed</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Body'
}
</script>

<style lang="scss" scoped>
  .body {
    margin-top: 60px;
    margin-right: 25px;
    margin-left: 25px;
    font-family: "DINNextW01-Bold";

    .title {
      display: block;
      color: #231F20;
      font-size: 22px;
    }

    .subtitle {
      display: block;
      color: rgba(0,0,0,0.5);
      font-size: 16px;
    }

    .action {
      display: flex;
      margin-top: 20px;
      height: 100px;
    }
  }
</style>
