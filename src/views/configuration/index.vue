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
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { systemAll, systemEdit, serviceEdit, serviceAll, crispEdit, crispAll } from "@/api/system";
export default {
  name: "Configuration",
  data: () => ({
    systemList: {
      id: "",
      whats_group_url: "",
      whats_service_url: "",
      multiple: ""
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
    activeName: 'one',
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
      }
    },
    getStytem() {
      systemAll().then((res) => {
        if (res.code === 200) {
          this.systemList.id = res.data.id;
          this.systemList.whats_group_url = res.data.whats_group_url;
          this.systemList.whats_service_url = res.data.whats_service_url;
          this.systemList.multiple = res.data.multiple;
        }
      });
    },
    handelEdit() {
      const {
        id,
        multiple,
      } = this.systemList;
      const params = {
        id,
        multiple
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
    }

  },
};
</script>

<style lang="scss" scoped>
.header-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>