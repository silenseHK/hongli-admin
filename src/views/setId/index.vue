<template>
    <div>
        <el-card shadow="always" :body-style="{ padding: '20px' }">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="员工角色ID">
                    <el-input v-model="formInline.userId" placeholder="请输入员工角色ID"></el-input>
                </el-form-item>
                <el-form-item style="margin-right:40px">
                    <el-button type="primary" @click="onSubmitStaff">提交</el-button>
                </el-form-item>
                <el-form-item label="组长角色ID">
                    <el-input v-model="formInline.groupLeaderId" placeholder="请输入组长角色ID"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmitGroupLeader">提交</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import {getStaffID,submitStaffID,getGroupLeaderID,submitGroupLeaderID} from '@/api/system'
export default {
    data() {
        return {
            formInline: {
                userId: '',
                groupLeaderId: ''
            },
            canClick: true
        };
    },
    activated() {
        this.init()
        this.getID()
    },
    mounted() {

    },
    methods: {
        init(){
            this.formInline = {
                userId: '',
                groupLeaderId: ''
            },
            this.canClick = true
        },
        // 获取填写过的员工id
        getID(){
            getStaffID().then(resp =>{
                if(resp.code == 200){
                    getGroupLeaderID({},{hiddenLoadingloading: true}).then(resp2 => {
                        if(resp2.code == 200){
                            this.formInline.userId = resp.data.role_id
                            this.formInline = {
                                userId: resp.data.role_id,
                                groupLeaderId: resp2.data.role_id
                            }
                        }else{
                            this.$message({
                                type: "info",
                                message: resp2.msg,
                            });
                        }
                    })
                    
                }else{
                    this.$message({
                        type: "info",
                        message: resp.msg,
                    });
                }
            })
        },
        // 点击提交
        onSubmitStaff() {
           let userId = this.formInline.userId
           if(userId.length == 0){
                this.$message({
                    message: '请输入员工ID',
                    type: 'warning'
                });
                return
           }
           if (!(/(^[1-9]\d*$)/.test(userId))) {
                this.$message({
                    message: '请输入大于0的正整数',
                    type: 'warning'
                });
                return
           }
           if(this.canClick){
               this.canClick = false
               setTimeout(() => {
                   this.canClick = true
               },2000)
                submitStaffID({role_id: this.formInline.userId}).then(resp =>{
                    if(resp.code == 200){
                        this.$message({
                            type: 'success',
                            message: '提交成功'
                        })
                    }else{
                        this.$message.error(resp.msg)
                    }
                })
           }
        },
        // 点击提交
        onSubmitGroupLeader() {
           let groupLeaderId = this.formInline.groupLeaderId
           if(groupLeaderId.length == 0){
                this.$message({
                    message: '请输入组长ID',
                    type: 'warning'
                });
                return
           }
           if (!(/(^[1-9]\d*$)/.test(groupLeaderId))) {
                this.$message({
                    message: '请输入大于0的正整数',
                    type: 'warning'
                });
                return
           }
           if(this.canClick){
               this.canClick = false
               setTimeout(() => {
                   this.canClick = true
               },2000)
                submitGroupLeaderID({role_id: this.formInline.groupLeaderId}).then(resp =>{
                    if(resp.code == 200){
                        this.$message({
                            type: 'success',
                            message: '提交成功'
                        })
                    }else{
                        this.$message.error(resp.msg)
                    }
                })
           }
        },
    }
};
</script>

<style scoped lang="less">

</style>
