<template>
  <div>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <div slot="header">
        <span>系统配置</span>
      </div>
      <!-- card body -->

      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="常规配置" name="one">
          <el-form label-width="130px">
            <el-form-item label="打码倍数:" style="width: 30%">
              <el-input
                  v-model="systemList.multiple"
                  placeholder=""
                  size="small"
                  clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="用户注册IP限制:" style="width: 30%">
              <el-switch
                  v-model="systemList.ipSwitch"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-value="1"
                  inactive-value="0"
                  active-text="开启"
                  inactive-text="关闭">
              </el-switch>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small" @click="handelEdit"
              >修改</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="客服配置" name="two">
          <el-form label-width="130px">
            <el-form-item label="按钮1链接:" style="width: 40%">
              <el-input
                  v-model="service.btn_1.link"
                  placeholder=""
                  size="small"
                  clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="按钮1标题:" style="width: 40%">
              <el-input
                  v-model="service.btn_1.title"
                  placeholder=""
                  size="small"
                  clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="按钮1图标:" style="width: 40%">
              <el-radio-group v-model="service.btn_1.icon">
                <el-radio label="whats_app">
                  <img style="width:40px;height:40px;background:#ddd;" src="../../assets/service/whats_app.png" />
                </el-radio>
                <el-radio label="group">
                  <img style="width:40px;height:40px;background:#ddd;" src="../../assets/service/group.png" />
                </el-radio>
                <el-radio label="telegram">
                  <img style="width:40px;height:40px;background:#ddd;" src="../../assets/service/telegram.png" />
                </el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="按钮2链接:" style="width: 40%">
              <el-input
                  v-model="service.btn_2.link"
                  placeholder=""
                  size="small"
                  clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="按钮2标题:" style="width: 40%">
              <el-input
                  v-model="service.btn_2.title"
                  placeholder=""
                  size="small"
                  clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="按钮2图标:" style="width: 40%">
              <el-radio-group v-model="service.btn_2.icon">
                <el-radio label="whats_app">
                  <img style="width:40px;height:40px;background:#ddd;" src="../../assets/service/whats_app.png" />
                </el-radio>
                <el-radio label="group">
                  <img style="width:40px;height:40px;background:#ddd;" src="../../assets/service/group.png" />
                </el-radio>
                <el-radio label="telegram">
                  <img style="width:40px;height:40px;background:#ddd;" src="../../assets/service/telegram.png" />
                </el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="开启状态" style="width: 30%" prop="status">
              <el-switch
                  v-model="service.status"
                  active-text="开启"
                  inactive-text="关闭"
                  active-value=1
                  inactive-value=0>
              </el-switch>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" size="small" @click="handleEditService"
              >修改</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="第三方客服配置" name="three">
          <el-form label-width="130px" :model="crisp" :rules="crispRules" ref="crisp">
            <el-form-item label="CRISP_ID" style="width: 30%" prop="id">
              <el-input
                  v-model="crisp.id"
                  placeholder=""
                  size="small"
                  clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="开启状态" style="width: 30%" prop="status">
              <el-switch
                  v-model="crisp.status"
                  active-text="开启"
                  inactive-text="关闭"
                  active-value=1
                  inactive-value=0>
              </el-switch>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" size="small" @click="handleEditCrisp"
              >修改</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="APP配置" name="four">
          <el-form label-width="130px" :model="app" :rules="appRules" ref="app">
            <el-form-item label="下载链接:" style="width: 30%" prop="link">
              <el-input
                  v-model="app.link"
                  placeholder=""
                  size="small"
                  clearable
              ></el-input>
            </el-form-item>

            <el-form-item label="开启状态" style="width: 30%" prop="status">
              <el-switch
                  v-model="app.status"
                  active-text="开启"
                  inactive-text="关闭"
                  active-value=1
                  inactive-value=0>
              </el-switch>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" size="small" @click="handleEditApp"
              >修改</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="AboutUs配置" name="five">
          <el-tabs tab-position="left" style="height: auto;" v-model="aboutUsActive" @tab-click="handleABoutUsClick">
            <el-tab-pane name="1" label="Privacy Policy">
              <el-form label-width="130px" label-position="top" :model="privacyPolicy" :rules="privacyPolicyRules" ref="privacyPolicy">

                <el-form-item label="标题:" style="width: 375px;" prop="title">
                  <el-input
                      v-model="privacyPolicy.title"
                      placeholder=""
                      size="small"
                      clearable
                  ></el-input>
                </el-form-item>

                <el-form-item label="详情:" style="width: 375px;">
                  <quill-editor
                      v-model="privacyPolicy.content"
                      ref="privacyPolicyQuillEditor"
                      :options="editorOption"
                      >
                  </quill-editor>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" size="small" @click="handleAboutMeEdit"
                  >修改</el-button
                  >
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane name="2" label="Risk Disclosure Agreement">
              <el-form label-width="130px" label-position="top" :model="riskDisclosureAgreement" :rules="privacyPolicyRules" ref="riskDisclosureAgreement">

                <el-form-item label="标题:" style="width: 375px;" prop="title">
                  <el-input
                      v-model="riskDisclosureAgreement.title"
                      placeholder=""
                      size="small"
                      clearable
                  ></el-input>
                </el-form-item>

                <el-form-item label="详情:" style="width: 375px;">
                  <quill-editor
                      v-model="riskDisclosureAgreement.content"
                      ref="riskDisclosureAgreementQuillEditor"
                      :options="editorOption"
                  >
                  </quill-editor>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" size="small" @click="handleAboutMeEdit"
                  >修改</el-button
                  >
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane name="3" label="About Us">
              <el-form label-width="130px" label-position="top" :model="aboutUs" :rules="privacyPolicyRules" ref="aboutUs">

                <el-form-item label="标题:" style="width: 375px;" prop="title">
                  <el-input
                      v-model="aboutUs.title"
                      placeholder=""
                      size="small"
                      clearable
                  ></el-input>
                </el-form-item>

                <el-form-item label="详情:" style="width: 375px;">
                  <quill-editor
                      v-model="aboutUs.content"
                      ref="aboutUsQuillEditor"
                      :options="editorOption"
                  >
                  </quill-editor>
                </el-form-item>

                <el-form-item>
                  <el-button type="primary" size="small" @click="handleAboutMeEdit"
                  >修改</el-button
                  >
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <el-upload
        class="ivu-upload"
        :data="uploadData"
        :show-upload-list="false"
        :on-success="handleEditorSuccess"
        :format="['jpg','jpeg','png']"
        :max-size="2048"
        :action="baseUrl"
        :headers="headers"
    >
      <el-button class="ivu-btn" icon="ios-cloud-upload-outline" ></el-button>
    </el-upload>
  </div>
</template>

<script>
import { systemAll, systemEdit, serviceEdit, serviceAll, crispEdit, crispAll, appAll, apppEdit, aboutUsAll, aboutUsEdit } from "@/api/system";
import { quillEditor } from "vue-quill-editor";
import phpUrl from "@/utils/baseUrl";
import store from "@/store"
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
const token =  store.getters.token
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{'header': 1}, {'header': 2}],               // custom button values
  [{'list': 'ordered'}, {'list': 'bullet'}],
  [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
  [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
  [{'direction': 'rtl'}],                         // text direction

  [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
  [{'header': [1, 2, 3, 4, 5, 6, false]}],

  [{'color': []}, {'background': []}],          // dropdown with defaults from theme
  [{'font': []}],
  [{'align': []}],
  ['link', 'image', 'video'],
  ['clean']                                         // remove formatting button
]
export default {
  name: "Configuration",
  components: {
    quillEditor
  },
  data: () => ({
    baseUrl: phpUrl + '/upload',
    headers: {token: token},

    privacyPolicy: {
      content: '',
      title: ''
    },
    riskDisclosureAgreement: {
      content: '',
      title: ''
    },
    aboutUs: {
      content: '',
      title: ''
    },
    privacyPolicyRules:{
      title: [
        { required: true, message: '请输入标题', trigger: 'blur' },
        { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
      ],
    },
    uploadData: {name:"file"},
    systemList: {
      id: "",
      whats_group_url: "",
      whats_service_url: "",
      multiple: "",
      ipSwitch: "0"
    },
    service: {
      btn_1:{
        link: "",
        icon: "",
        title: ""
      },
      btn_2:{
        link: "",
        icon: "",
        title: ""
      },
      status: '0'
    },
    crisp:{
      id: '',
      status: "0"
    },
    crispRules: {
      id: [
        { required: true, message: '请输入crisp_id', trigger: 'blur' },
        { min: 1, max: 64, message: '长度在 1 到 64 个字符', trigger: 'blur' }
      ],
      status: [
        { required: true, message: '请选择开启状态', trigger: 'blur' },
      ]
    },
    app:{
      link: '',
      status: "0"
    },
    appRules: {
      link: [
        { required: true, message: '请输入链接', trigger: 'blur' },
        { min: 1, max: 255, message: '长度在 1 到 255 个字符', trigger: 'blur' }
      ],
      status: [
        { required: true, message: '请选择开启状态', trigger: 'blur' },
      ]
    },
    activeName: 'five',

    editorOption: {
      modules: {
        toolbar: {
          container: toolbarOptions,  // 工具栏
          handlers: {
            'image': function (value) {
              if (value) {
                // 调用iview图片上传
                document.querySelector('.ivu-upload .ivu-btn').click()
              } else {
                this.quill.format('image', false);
              }
            }
          }
        }
      }
    },

    aboutUsActive: '1',
  }),
  activated() {
    this.getStytem();
  },
  methods: {
    handleClick(){
      switch (this.activeName){
        case 'one':
          this.getStytem();
          break;
        case 'two':
          this.getService();
          break;
        case 'three':
          this.getCrisp();
          break;
        case 'four':
          this.getApp();
          break;
        case 'five':
          this.getAboutUs();
          break;
      }
    },
    handleABoutUsClick(){
      this.getAboutUs()
    },
    getStytem() {
      systemAll().then((res) => {
        if (res.code === 200) {
          this.systemList.id = res.data.id;
          this.systemList.whats_group_url = res.data.whats_group_url;
          this.systemList.whats_service_url = res.data.whats_service_url;
          this.systemList.multiple = res.data.multiple;
          this.systemList.ipSwitch = res.data.ip_switch.ip_switch;
        }
      });
    },
    handelEdit() {
      const {
        id,
        multiple,
        ipSwitch
      } = this.systemList;
      const params = {
        id,
        multiple,
        ipSwitch
      };
      systemEdit(params).then((res) => {
        if (res.code === 200) {
          this.$message.success("修改成功");
          this.handleClick();
        } else {
          this.$message.error("修改失败");
        }
      });
    },

    handleEditService(){
      let {btn_1, btn_2, status} = this.service
      if(!btn_1.title || !btn_1.icon || !btn_1.link){
        this.$message({
          type: 'warning',
          message: '请将数据补充完整'
        })
        return false;
      }
      if(!btn_2.title || !btn_2.icon || !btn_2.link){
        this.$message({
          type: 'warning',
          message: '请将数据补充完整'
        })
        return false;
      }
      const params = {btn_1, btn_2, status}
      serviceEdit(params).then((res) => {
        if (res.code === 200) {
          this.$message.success("修改成功");
          this.handleClick();
        } else {
          this.$message.error("修改失败");
        }
      });
    },

    handleEditCrisp(){
      this.$refs['crisp'].validate((valid) => {
        if (valid) {
          let [crisp_website_id, status] = [this.crisp.id, this.crisp.status]
          crispEdit({crisp_website_id, status}).then((res) => {
            if (res.code === 200) {
              this.$message.success("修改成功");
              this.handleClick();
            } else {
              this.$message.error("修改失败");
            }
          });
        }
      });
    },

    handleEditApp(){
      this.$refs['app'].validate((valid) => {
        if (valid) {
          let [link, status] = [this.app.link, this.app.status]
          apppEdit({link, status}).then((res) => {
            if (res.code === 200) {
              this.$message.success("修改成功");
              this.handleClick();
            } else {
              this.$message.error(res.msg);
            }
          });
        }
      });
    },

    getService(){
      serviceAll().then((res)=>{
        if(res.code === 200){
          this.service = res.data;
        }else{
          this.$message.error(res.msg);
        }
      })
    },

    getCrisp(){
      crispAll().then((res)=>{
        if(res.code === 200){
          this.crisp = {
            id: res.data.crisp_website_id,
            status: res.data.status
          }
        }else{
          this.$message.error(res.msg);
        }
      })
    },

    getApp(){
      appAll().then((res)=>{
        if(res.code === 200){
          this.app = {
            link: res.data.link,
            status: res.data.status
          }
        }else{
          this.$message.error(res.msg);
        }
      })
    },

    getAboutUs(){
      aboutUsAll({type:this.aboutUsActive}).then((res)=>{
        if(res.code === 200){
          let field;
          switch (parseInt(this.aboutUsActive)){
            case 1:
              field = 'privacyPolicy';
              break;
            case 2:
              field = 'riskDisclosureAgreement';
              break;
            case 3:
              field = 'aboutUs';
              break;
          }
          this[field] = {
            title: res.data.title,
            content: res.data.content
          }
        }else{
          this.$message.error(res.msg);
        }
      })
    },

    handleEditorSuccess (res) {
      // 获取富文本组件实例
      let field;
      switch (parseInt(this.aboutUsActive)){
        case 1:
          field = 'privacyPolicy';
          break;
        case 2:
          field = 'riskDisclosureAgreement';
          break;
        case 3:
          field = 'aboutUs';
          break;
      }
      let quill = this.$refs[field + 'QuillEditor'].quill
      // 如果上传成功
      if (res) {
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片，res为服务器返回的图片链接地址
        quill.insertEmbed(length, 'image', res.data.src)
        // 调整光标到最后
        quill.setSelection(length + 1)
      } else {
        // 提示信息，需引入Message
        this.$message.error('图片插入失败')
      }
    },

    handleAboutMeEdit(){
      let type = 0;
      let field = '';
      console.log(this.aboutUsActive)
      switch (parseInt(this.aboutUsActive)){
        case 1:
          type = 1;
          field = 'privacyPolicy';
          break;
        case 2:
          type = 2;
          field = 'riskDisclosureAgreement';
          break;
        case 3:
          type = 3;
          field = 'aboutUs';
          break;
      }
      console.log(field)
      let params =this[field];
      console.log(params)
      params.type = type
      aboutUsEdit(params).then((res) => {
        if (res.code === 200) {
          this.$message.success("修改成功");
          this.handleClick();
        } else {
          this.$message.error(res.msg);
        }
      });

    },

  },
};
</script>

<style lang="scss" scoped>
.header-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.ivu-upload {
  display: none;
}
</style>