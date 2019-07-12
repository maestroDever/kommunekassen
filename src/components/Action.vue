<template>
  <div class="action">
    <div v-if="content.type === 'integer'">
      <button
        class="button"
        v-for="one in content.oneOf"
        :key="`${one.const}-${one.active}`"
        @click="handleAnswer(one.const)"
        :class="one.active ? 'active' : ''"
        ref="actionElement"
      >
        {{ one.title }}
      </button>
    </div>
    <div v-else style="width: 100%">
      <input type="number" class="answer-input" @input="handleAnswer(-1)" v-model="answer">
      <span style="display: block; margin: 10px;">mio. kr.</span>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Action',
  props: ['content'],
  data () {
    return {
      answer: null
    }
  },
  methods: {
    ...mapActions(['setAnswer']),
    handleAnswer (ans) {
      if (ans >= 0) {
        this.setAnswer(ans)
      } else {
        this.setAnswer(this.answer)
      }
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
