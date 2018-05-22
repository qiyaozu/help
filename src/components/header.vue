<template>
  <div class="demo-header">
    <img src="static/images/icon/left.png" alt="" @click="back">{{title}}
  </div>
</template>

<script>
  export default {
    data() {
      return {
       title: '手绘插画合集'
      }
    },
    methods: {
      back() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="less">
.demo-header {
  position: relative;
  height: 4rem;
  line-height: 4rem;
  background: #323232;
  font-size: 1.8rem;
  font-weight: bold;
  font-family: 'PingFang-SC-Bold';
  color: #fff;
  & > img {
    position: absolute;
    left: 1.5rem;
    top: 1.1rem;
    width: 2rem;
    height: auto;
  }
}
</style>

