<template>
  <div id="index">
    <div class="top">
      <div class="top-search">
        <img src="" alt="">
        <span>有问题，快点我搜索</span>
      </div>
    </div>

    <div class="bottomBtns">
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<style lang="less">
#index {
 .top {
   background: #fff;
  .top-search {
    display: flex;
    align-items: center;
    text-align: left;
    background: #CCCCCC;
    border-radius: .5rem;
    & > img {
      display: inline-block;
      width: 2rem;
      margin-right: 1.3rem;
    }
    & > span {
      font-size: 1.4rem;
      font-family: 'Microsoft YaHei';
      color: #CECECE;
    }
  }
 }

 .cellWrapper {

 }
}
</style>

