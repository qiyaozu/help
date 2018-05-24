<template>
  <div id="dirList">
    <div class="top">该问题列表所属的一级目录标题</div>
    <!-- 搜索到的结果 -->
    <div class="cellWrapper">
      <div class="cell scale-1px" @click="jump('/question_detail', item.qaid)"
      v-for="(item, index) in dataList" :key="index">
        <div class="left text_ellipsis1" v-text="item.question"></div>
       <img src="static/images/icon/right.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import { interFace } from '@/settings.js'
export default{
  data() {
    return {
      dataList: []
    }
  },

  created() {
    let dirId = this.$route.query.id
    // 问题与回答列表
    this.chPost(`${interFace}/QA/GetQuestionList`, {
      userId: getCookies('user', 'userId') || 0,
      id: dirId
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

  methods: {
    jump(path, id) {
      if(id) {
        let detail = this.dataList.filter(item => item.qaid === id)[0]
        sessionStorage.setItem('QA_detail', JSON.stringify(detail))
        this.$router.push({path: path, query: {id: id}})
      } else {
        this.$router.push(path)
      }
    }
  }
}
</script>
<style lang="less">
#dirList {
  min-height: 100vh;
  background: #F3F3F3;
  .top {
    padding-left: 1.5rem;
    height: 3.3rem;
    text-align: left;
    line-height: 3.3rem;
    font-family: 'STHeitiSC-Light';
    font-size: 1.4rem;
    color:#333333;
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
       flex:0 0 22.5rem;
       text-align: left;
       font-weight: bold;
     }
     & > img {
       display: block;
       width: 1.8rem;
       height: 1.8rem;
     }
   }
  }
}
</style>

