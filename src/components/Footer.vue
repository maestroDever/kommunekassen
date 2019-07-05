<template>
  <div class="footer">
    <div class="action">
      <button class="button left hidden">dummy</button>
      <button class="button right active">Start</button>
    </div>
    <div class="progress-bar"></div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss" scoped>
  .footer {
    margin-left: 15px;
    margin-right: 15px;

    .action {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
      margin: 0 4px;

      .right {
        grid-column-start: 5;
      }
    }

    .progress-bar {
      width: 100%;
      height: 20px;
      background-color: #D8D8D8;
      margin-top: 10px;
    }
  }
</style>
