<template>
  <div class="root">
    <div>contact us</div>
    <div>Thank you - your message has been sent, we’ll be in touch shortly.</div>
  </div>
</template>
<script>
export default {
  name: 'APP',
  data() {
    return {}
  },
  methods: {},
  created() {
  },
  mounted() {
  },
}
</script>
<style lang="less" scoped>

.root {
  padding-top: 0.8rem;

  div {
    text-align: center;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 0.24rem;
    line-height: 0.29rem;
  }

  div + div {
    padding-top: 0.45rem;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 0.16rem;
    line-height: 0.19rem;
  }
}
</style>
