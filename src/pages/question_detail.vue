<template>
  <div id="question_detail">
    <div class="question_content">
      <div class="qu_title" v-text="detail.question">

      </div>
      <div class="qu_text" v-html="detail.answer"></div>

      <div class="help_btns">
        <button @click="isHelp(1)" :class="detail.helpFlag == 1?'on':''">
          <img :src="hasHelpImg" alt="">有帮助
        </button>
         <button @click="isHelp(0)" :class="detail.helpFlag == 2?'on':''">
          <img :src="noHelpImg" alt="">没帮助
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { interFace } from '@/settings.js'

  export default {
    data() {
      return {
       detail: {
        answer: '',
        helpFlag: 1,
        question: ''
       }
      }
    },
    computed: {
      hasHelpImg() {
        return this.detail.helpFlag === 1?'static/images/icon/green_zan.png':'static/images/icon/gray_zan.png'
      },
      noHelpImg() {
        return this.detail.helpFlag === 2?'static/images/icon/green_nozan.png':'static/images/icon/gray_nozan.png'
      }
    },
    created() {
      this.detail = JSON.parse(sessionStorage.getItem('QA_detail'))
    },
    methods:  {
      isHelp(val) {
        // TODO 测试
        let userId = localStorage.getItem('userId')
        // let userId = getCookies('user', 'userId')
        if(!userId) {
           this.$vux.confirm.show({
            title: '提示',
            content: '当前操作需要登录',
            onHide () {
              console.log('plugin hide')
            },
            onCancel () {
              console.log('plugin cancel')
            },
            onConfirm () {
              console.log('plugin confirm')
            }
          })
          return false
        }
        this.chPost(`${interFace}/QA/DoQAHelp`, {
          userId: userId,
          qaid: this.detail.qaid,
          flag: val?3:4
        }, res => {
          if(res.flag) {
            // TODO改变某个button的样式
            this.change_hasHelp(val)
          } else {
            this.$vux.toast.show({
              type: 'text',
              text: res.msg
            })
          }
          console.log(res)
        })
      },
      change_hasHelp(val) {
        if(val) {
          this.detail.helpFlag = this.detail.helpFlag?0:1
        } else {
           this.detail.helpFlag = this.detail.helpFlag?0:2
        }
      }
    }
  }
</script>
<style lang="less">
#question_detail {
  min-height: 100vh;
  background: #F3F3F3;
  .question_content {
    text-align: left;
    box-sizing: border-box;
    padding: 1.5rem;
    background: #fff;
    .qu_title {
      padding-bottom:1rem;
      line-height: 1.8rem;
      font-family: 'Heiti K';
      font-size: 1.6rem;
      font-weight: bold;
      color:#333333;
    }
    .qu_text {
      line-height: 1.6rem;
      font-family: 'Heiti K';
      font-size:1.4rem;
      color:#737373;
    }
    img {
      display: block;
      width: 100%;
      height: auto;
    }
    .help_btns {
      display: flex;
      justify-content: space-between;
      padding: 2rem 5rem 0;
      button {
        height: 2.8rem;
        padding: 0 1rem;
        line-height: 2.8rem;
        border-radius: .2rem;
        border: 1px solid #999999;
        font-size: 1.4rem;
        color:#999999;
        background: #fff;
        & > img {
          display: inline-block;
          width: 2rem;
          height: auto;
          margin-right: .5rem;
          vertical-align: top;
          transform: translateY(.3rem);
        }
      }
      button.on {
        border: 1px solid #01AF63;
        color: #01AF63;
      }
    }
  }
}
</style>

