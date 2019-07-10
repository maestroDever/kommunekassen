<template>
  <div class="action">
    <div v-if="content.type === 'integer'">
      <button
        class="button"
        v-for="one in content.oneOf"
        :key="`${one.const}-${one.active}`"
        @click="handleClick(one.const)"
        :class="one.active ? 'active' : ''"
      >
        {{ one.title }}
      </button>
    </div>
    <div v-else style="width: 100%">
      <input type="number" class="answer-input">
      <span style="display: block; margin: 10px;">mio. kr.</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Action',
  props: ['content'],
  methods: {
    handleClick (id) {
      console.log(id)
    }
  }
}
</script>

<style lang="scss">
  .action {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;

    .answer-input {
      border: none;
      border-bottom: #F0F0F0 solid 3px;
      line-height: 2;
      font-size: 36px;
      text-align: center;
      caret-color: #231F20;
    }
  }
</style>
