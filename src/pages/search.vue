<template>
  <div id="search" ref="search">
    <!-- 顶部搜索 -->
    <div class="top">
      <img src="static/images/icon/left.png" alt="" @click="routerBack">
      <input type="text" placeholder="搜索" v-model="keyword">
      <span @click="search">搜索</span>
    </div>

    <!-- 填充div -->
    <div class="fill"></div>

    <!-- 搜索到的结果 -->
    <div class="cellWrapper" v-if="dataList">
      <div class="cell scale-1px" @click="jump('/dirlist', item.id)"
      v-for="(item, index) in dataList" :key="index"
      >
        <div class="left text_ellipsis1" v-html="item.content"></div>
       <img src="static/images/icon/right.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import { interFace } from '@/settings.js'

  export default {
    data() {
      return {
        keyword: '',
        dataList: []   // 对搜索到的关键词进行着色
      }
    },
     mounted() {
      // 计算出屏幕的高度
      this.$nextTick(() => {
        let search = document.getElementById('search')
        this.$refs.search.style.height = window.innerHeight + 'px';
      })
    },
    methods: {
      search() {
        // TODO cookie或者url中是否有用户的type
        if(this.keyword) {
          this.chPost(`${interFace}/QA/GetQaList`, {
            keyword: this.keyword,
            type: 1
          }, res => {
            if(res.flag) {
              if (res.rs) {
                this.dataList = this.colorText(this.keyword, res.rs)
              } else {
                this.$vux.toast.text(res.msg)
              }
            } else {
              this.$vux.toast.text(res.msg)
            }
          })
        }
      },
      jump(path, id) {
        if(id) {
          this.$router.push({path: path, query: {id: id}})
        } else {
          this.$router.push(path)
        }
      },
      routerBack() {
        this.$router.go(-1)
      },
      colorText(val, arr) {
        let reg = new RegExp(val)
        arr.forEach(element => {
          element.content = element.content.replace(reg, `<span class="red">${val}</span>`)
        });
        return arr
      }
    }
  }
</script>

<style lang="less">
#search {
  background: #F3F3F3;
  .fill {
    height: 1rem;
    background: #F3F3F3;
  }
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height:3rem;
    padding: .7rem 1rem;
    background: #fff;
    & > img {
      display: block;
      width:2.1rem;
      height:2.1rem;
      margin-right: .6rem;
    }
    & > input {
      flex: 1;
      box-sizing: border-box;
      padding: 0 1rem;
      height: 100%;
      line-height: 100%;
      background: #F2F2F2;
      border-radius: .3rem;
      font-size: 1.5rem;
    }
    & > span {
      margin-left: 1rem;
      font-family: 'STHeitiK-Light';
      font-size:1.4rem;
      color:#545454;
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
       flex:0 0 22.5rem;
       text-align: left;
       .red {
         color:#FF3366;
       }
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

