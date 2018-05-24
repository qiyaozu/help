<template>
  <!-- 意见反馈页面 -->
  <div id="tickling" ref="tickling">
    <div class="textWrapper">
      <textarea v-model="content" cols="30" rows="9" @input="oninput" placeholder="您的投诉与反馈内容"></textarea>
      <span class="content_count" v-text="content.trim().length + '/200'"></span>
    </div>
    <input class="contact-method" placeholder="您的手机号、QQ或E-mail，方便我们联系您" v-model="contact_method" maxlength="50"/>

    <button class="common_btn" @click="submit">提交反馈</button>
  </div>
</template>

<script>
import { interFace } from '@/settings.js'

  export default {
    data() {
      return {
        content: '',
        contact_method: ''
      }
    },
    mounted() {
      // 计算出屏幕的高度
      this.$nextTick(() => {
        let tickling = document.getElementById('tickling')
        this.$refs.tickling.style.height = window.innerHeight + 'px';
      })
    },
    methods: {
      submit() {
        console.log('submit')
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
        this.chPost(`${interFace}/QA/AddFeedback`, {
          userId: userId,
          contactWay: this.contact_method,
          content: this.content
        }, res => {
          if(res.flag) {
            this.$vux.toast.show({
              type: 'text',
              text: '提交成功'
            })
          } else {
            this.$vux.toast.show({
              type: 'text',
              text: res.msg
            })
          }
        })
      },
      oninput () {
        if(this.content.trim().length >= 200) {
          this.content = this.content.trim().substring(0, 200)
        }
      }
    }
  }
</script>

<style lang="less">
#tickling {
  background: #F3F3F3;
  .textWrapper {
    position: relative;
     textarea {
      display: block;
      width:100%;
      padding: 1.4rem 1.6rem;
      box-sizing: border-box;
      margin-bottom:1rem;
      font-size: 1.6rem;
      resize:none;
    }
    .content_count {
      position: absolute;
      bottom: 1rem;
      right: 2rem;
    }
  }

  .contact-method {
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 4.5rem;
    padding: 0 1.5rem;
    margin-bottom: 2.5rem;
    font-size: 1.6rem;
  }
  .common_btn {
    display: block;
    width: 90%;
    height: 4.1rem;
    margin: 0 auto;
    border-radius: .3rem;
    background: #01AF63;
    font-size: 1.6rem;
    font-family: 'STHeitiSC-Light';
    color: #fff;
  }
}
</style>

