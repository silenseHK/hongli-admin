<template>
  <div>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <div slot="header">
        <span>系统配置</span>
      </div>
      <!-- card body -->
      <el-form label-width="130px">
        <el-form-item label="打码倍数:" style="width: 30%">
          <el-input
            v-model="systemList.multiple"
            placeholder=""
            size="small"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="客服组群邀请链接:" style="width: 40%">
          <el-input
            v-model="systemList.whats_group_url"
            placeholder=""
            size="small"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="客服邀请聊天链接:" style="width: 40%">
          <el-input
            v-model="systemList.whats_service_url"
            placeholder=""
            size="small"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item style="margin-left: 20px">
          <el-button type="primary" size="small" @click="handelEdit"
            >修改</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { systemAll, systemEdit } from "@/api/system";
export default {
  name: "Configuration",
  data: () => ({
    systemList: {
      id: "",
      whats_group_url: "",
      whats_service_url: "",
      multiple: ""
    },
  }),
  activated() {
    this.getStytem();
  },
  methods: {
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
        whats_group_url,
        whats_service_url,
        multiple,
      } = this.systemList;
      const params = {
        id,
        whats_group_url,
        whats_service_url,
        multiple
      };
      systemEdit(params).then((res) => {
        if (res.code === 200) {
          this.$message.success("修改成功");
          this.getStytem();
        } else {
          this.$message.error("修改失败");
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
</style>