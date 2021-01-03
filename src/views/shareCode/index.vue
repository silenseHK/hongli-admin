<template>
  <div>
    <el-card>
        <div class="shareCode-box mb20">
            <h3 class="tilte">
                <span>二维码</span> 
                 <el-button 
                type="primary" 
                icon='el-icon-download'
                @click="downloadImg"
                v-if='share.invitationCode'
                >下载</el-button>
            </h3>
            <div class="shareCode-wrap">
              <vue-qr 
              :text="share.link" 
              :size="200" 
              ref="Qrcode"
              ></vue-qr>
            </div>
        </div>
        <div class="invitationCode mb30">
            <h3 class="tilte">
                <span>邀请码</span> 
                <el-button 
                type="primary" 
                v-clipboard:copy="share.invitationCode"
                v-clipboard:success="copyInvitationCode"
                icon='el-icon-document-copy'
                v-if='share.invitationCode'
                >复制</el-button>
            </h3>
            <p class="my-text">{{share.invitationCode}}</p>
           
        </div>
        <div class="invitationCode mb30">
            <h3 class="tilte">
              <span>邀请链接</span>  
              <el-button 
                type="primary" 
                v-clipboard:copy="share.link"
                v-clipboard:success="copyLink"
                icon='el-icon-document-copy'
                v-if='share.link'
                >复制</el-button>
            </h3>
            <p class="my-text">{{share.link}}</p>
        </div>
       
      
    </el-card>
  </div>
</template>

<script>

import {canClickFn} from '@/utils/myAPI';
import vueQr from 'vue-qr'
import {getInvitationCodeData} from '../../api/share'
export default {
  name: "shareCode",
  components: {vueQr},
  data: () => ({
    share:{
        codeImg: '',
        invitationCode: '',
        link: ''
    }
  }),
  activated(){
    this.share ={
        invitationCode: '',
        link: ''
    }
    getInvitationCodeData().then(resp => {
        if(resp.code == 200){
            let res = resp.data
            this.share = {
                invitationCode: res.code,
                link: res.url
            }
        }else{
            this.$message.error(resp.msg);
        }
    })
  },
  methods: {
    copyInvitationCode(){
        this.$message({
            showClose: true,
            message: '复制  ' +  this.share.invitationCode  + '  成功',
            type: 'success'
        });
    },
    copyLink(){
        this.$message({
          showClose: true,
          message: '复制   ' +  this.share.link  + '   成功',
          type: 'success'
        });
    },
    downloadImg(){
        canClickFn(() => {
            let a = document.createElement('a')
            let event = new MouseEvent('click')
            // 下载图名字
            a.download = '二维码'
            a.href = this.$refs.Qrcode.$el.src
            a.dispatchEvent(event)
        })
     
    }
  }
};
</script>

<style lang="scss" scoped>
    .tilte{
        font-size: 20px;
        display: flex;
        align-items: center;
        font-weight: bold;
        margin-bottom: 20px;
        height: 70px;
        span{
            display: inline-block;
            width: 100px;
            margin-right: 30px;
        }
    }
    .shareCode-wrap{
        width: 200px;
        height: 200px;
        #qrcode{width: 100%;height: 100%;}
    }
    .my-text{
        font-size: 16px;
    }
    .mb30{
        margin-bottom: 30px;
    }
</style>