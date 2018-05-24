<template>
  <div id="index">
    <div class="top">
      <div class="top-search" @click="jump('/search')">
        <img src="static/images/icon/search.png" alt="">
        <span>有问题，快点我搜索</span>
      </div>
    </div>

    <div class="cellWrapper">
      <div class="cell scale-1px" v-for="(item, index) in dataList" :key="index" @click="jump('/dirlist', item.id)">
        <div class="left text_ellipsis2" v-text='item.content'></div>
        <img src="static/images/icon/right.png" alt="">
      </div>
    </div>

    <div class="bottomBtns">
      <div @click="jump('/tickling')">
        <img src="static/images/icon/tickling.png" alt="">
        反馈意见
      </div>
      <div>
        <img src="static/images/icon/server.png" alt="">
        400客服
      </div>
    </div>
  </div>
</template>

<script>
import { interFace } from '@/settings.js'
  export default {
    data() {
      return {
        dataList: []
      }
    },
    created() {
      // TODO 测试
      localStorage.setItem('userId',
      'FAQQGs87CQVUliy/ztb89VbWafwjYVJJwxESw4izV53L5ZLYVcCrliYO+Jm1T5tUGkDDhWOfskoa8stxugdzF8fk+Qvo/FVOFa0t3Fe4RxRFJfsSEgjrRf6VOjcB6uMV7gVNmEpPCw32H9XVjKy+xrn0WzSlsgLl4ja0jSKg6/Q=')
      // let userId = getCookies('user', 'userId') || 0
      // 问题与回答列表
      this.chPost(`${interFace}/QA/GetQaList`, {
        userId: localStorage.getItem('userId'),
        type: 1
      }, res => {
        if(res.flag) {
          this.dataList = res.rs
        } else {
          this.$vux.toast.show({
            type: 'text',
            text: res.msg
          })
        }
      })
    },
    methods:{
      jump(path, id) {
        if(id) {
           this.$router.push({path: path, query: {id: id}})
        } else {
          this.$router.push(path)
        }
      }
    }
  }
</script>
<style lang="less">
#index {
  box-sizing: border-box;
  padding-bottom: 5rem;
  min-height:100vh;
  background:#F3F3F3;
 .top {
   display: flex;
   align-items: center;
   height: 5rem;
   padding: 0 1.5rem;
   margin-bottom: 1rem;
   background: #fff;
  .top-search {
    display: flex;
    align-items: center;
    width: 100%;
    height: 3rem;
    text-align: left;
    background: #F2F2F2;
    border-radius: .5rem;
    & > img {
      display: inline-block;
      width: 2rem;
      padding-left: .5rem;
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
   background: #fff;
   .cell {
     display: flex;
     justify-content: space-between;
     padding: 1.5rem;
     line-height: 1.8rem;
     font-size: 1.6rem;
     font-family: 'STHeitiK-Light';
     color:#333333;
     .left {
       flex:0 0 25.25rem;
       text-align: left;
       font-weight:bold;
     }
     & > img {
       display: block;
       width: 1.8rem;
       height: 1.8rem;
     }
   }
 }

 .bottomBtns {
   position: fixed;
   bottom:0;
   left:0;
   width:100%;
   display: flex;
   & > div {
     display: flex;
     align-items: center;
     justify-content: center;
     height:5rem;
     flex: 0 0 50%;
     text-align: center;
     font-family: 'STHeitiSC-Light';
     font-size: 1.6rem;
     background: #01AF63;
     color:#fff;
     &:first-of-type {
       border-right: 1px solid rgba(240,240,240,1);
     }
     & > img {
       display: inline-block;
       width: 2.5rem;
       height: 2.5rem;
     }
   }
 }
}
</style>

