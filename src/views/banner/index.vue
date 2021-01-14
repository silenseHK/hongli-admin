<template>
    <div>
        <el-card>
            <el-col
                    :span="24"
                    class="toolbar"
                    style="padding-bottom: 0px; width: 86%; margin-top: 15px"
            >
                <el-form :inline="true" :model="searchFormData" ref="searchForm">
                    <el-form-item>
                        <el-form-item label="" prop="location">
                            <template>
                                <el-select
                                        v-model="searchFormData.location"
                                        placeholder="展示位置"
                                >
                                    <el-option
                                            v-for="item in locationList"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id"
                                    ></el-option>
                                </el-select>
                            </template>
                        </el-form-item>

                        <el-form-item label="" prop="type">
                            <template>
                                <el-select
                                        v-model="searchFormData.type"
                                        placeholder="类型"
                                >
                                    <el-option
                                            v-for="item in types"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id"
                                    ></el-option>
                                </el-select>
                            </template>
                        </el-form-item>

                        <el-button
                                type="primary"
                                size="small"
                                @click="search"
                        >搜索</el-button>
                        <el-button size="small" @click="resetForm('searchForm')">重置</el-button>
                        <el-button
                                type="primary"
                                size="small"
                                @click="addBanner"
                        >新增</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <!--表格内容-->
            <el-table :data="banners" style="width: 100%" border>
                <el-table-column prop="id" label="id" width="180"></el-table-column>

                <el-table-column
                        prop="location_name"
                        label="展示位置"
                        width="180"
                ></el-table-column>
                <el-table-column
                        prop="type_name"
                        label="类型"
                        width="180"
                ></el-table-column>
                <el-table-column
                        prop="url"
                        label="跳转地址"
                        width="300"
                ></el-table-column>
                <el-table-column
                        label="图片"
                        width="300"
                >
                    <template slot-scope="scope">
                        <el-image
                                style="width: 100px; height: 100px"
                                :src="scope.row.uploads.path_url"
                        >
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作"
                        align="center"
                        width="300"
                        prop="status"
                >
                    <template slot-scope="scope">
                        <el-button
                                size="small"
                                icon="el-icon-edit"
                                type="primary"
                                @click="modifyBanner(scope.row)"
                        >修改
                        </el-button
                        >
                        <el-button
                                size="small"
                                icon="el-icon-delete"
                                type="info"
                                @click="delBanner(scope.row.id)"
                        >删除
                        </el-button
                        >
                    </template>
                </el-table-column>
                <!--编辑与增加的页面-->
            </el-table>


            <el-dialog
                    :visible.sync="dialogVisible"
                    width="30%"
                    :title="addFormData.id ? '修改' : '新增'"
                    :close-on-click-modal="false"
                    :before-close="dialogClose"
            >
                <!-- <el-divider content-position="left" slot="title" class="dialog-title">新增</el-divider>   -->
                <!-- <div slot="title" style="font-size:18px">新增</div> -->
                <el-form
                        :model="addFormData"
                        :rules="rules"
                        ref="addFormData"
                        label-width="80px"
                        class="demo-ruleForm login-container"
                >
                    <el-form-item prop="uploads_id" label="图片">
                        <template>
                            <el-upload
                                    class="upload-demo"
                                    :action="uploadUrl"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :before-remove="beforeRemove"
                                    :multiple="false"
                                    accept="image/*"
                                    :data="updateData"
                                    :headers="{token: this.token}"
                                    :limit="1"
                                    :on-exceed="handleExceed"
                                    :on-success="handleSuccess"
                                    :file-list="fileList">
                                <el-button size="small" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
                            </el-upload>
                        </template>
                    </el-form-item>
                    <el-form-item label="展示位置" prop="location">
                        <template>
                            <el-select
                                    v-model="addFormData.location"
                                    @change="select"
                                    placeholder="请选择"
                            >
                                <el-option
                                        v-for="item in locationList"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id"
                                ></el-option>
                            </el-select>
                        </template>
                    </el-form-item>
                    <el-form-item label="类型" prop="type">
                        <template>
                            <el-select
                                    v-model="addFormData.type"
                                    placeholder="请选择"
                            >
                                <el-option
                                        v-for="item in types"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id"
                                ></el-option>
                            </el-select>
                        </template>
                    </el-form-item>
                    <el-form-item label="跳转地址" prop="url" v-if="addFormData.type > 1">
                        <template>
                            <el-input
                                    v-model="addFormData.url"
                                    placeholder="跳转地址"
                                    size="small"
                            ></el-input>
                        </template>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addSubmit()">确 定</el-button>
                </span>
            </el-dialog>
            <div class="pagination-bottom">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-sizes="[10, 40, 80, 100]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total"
                        background
                >
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>

<script>
    import {
        BannerAdd,
        BannerEdit,
        delBanner,
        BannerList
    } from "@/api/banner.js"

    import store from "@/store"
    import phpUrl from "@/utils/baseUrl.js"

    export default {
        name: "index",
        data() {
            return {
                searchFormData: {
                    location: "",
                    type: "",
                },
                //分页参数
                pageSize: 10,
                currentPage: 1,
                total: 0,
                filters: {
                    id: "",
                },
                banners: [],
                location: 1,
                locationList: [
                    {
                        id: 1,
                        name: "首页",
                    },
                    // {
                    //     id: 2,
                    //     name: "活动",
                    // },
                ],
                types: [
                    {
                        id: 1,
                        name: "不跳转",
                    },
                    {
                        id: 2,
                        name: "内链",
                    },
                    {
                        id: 3,
                        name: "外链",
                    },
                ],
                dialogVisible: false,
                addFormData: {
                    id: 0,
                    uploads_id: "",
                    location: 0,
                    type: 1,// 1 不跳转， 2 内链 3 外链
                    url: "", //type不等于1 对应的地址
                },
                updateData: {
                    name: 'file',
                },
                uploadUrl: phpUrl + "/upload",
                fileList: [],
                rules: {
                    uploads_id: [
                        {
                            required: true,
                            message: "图片不能为空",
                            // trigger: "blur",
                        },
                        {
                            type: "number",
                            message: "图片ID为数字",
                            // trigger: "blur",
                        },
                    ]
                },
            }
        },
        watch: {
            "addFormData.type": function (curType) {
                if (curType === 1) {
                    if (this.rules.hasOwnProperty('url')) {
                        delete this.rules.url;
                    }
                } else {
                    if (!this.rules.hasOwnProperty('url')) {
                        this.rules.url = [
                            {
                                required: true,
                                message: "跳转地址不能为空",
                                // trigger: "blur",
                            },
                        ];
                    }
                }
            },
            dialogVisible: function (val) {
                if (!val) {
                    this.addFormData = {
                        id: 0,
                        uploads_id: "",
                        location: 1,
                        type: 1,// 1 不跳转， 2 内链 3 外链
                        url: "", //type不等于1 对应的地址
                    };
                    this.fileList = [];
                }
            }
        },
        // 请求资讯数据
        activated() {
            console.log("activated");
            this.loadData();
        },
        computed: {
            token() {
                return store.getters.token
            }
        },
        methods: {
            search(){
                this.loadData();
            },
            dialogClose(done) {
                done();
            },
            // 图片上传
            handleRemove(file, fileList) {
                this.fileList = [];
            },
            handleSuccess(response, file, fileList) {
                if (response.code === 200) {
                    let {id} = response.data;
                    this.addFormData.uploads_id = id
                } else {
                    this.$message.error('文件上传错误')
                }
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.error(`只能上传一张图片`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${file.name}？`);
            },
            addBanner() {
                this.dialogVisible = true;
            },
            list() {
                this.loadData();
            },
            select(val) {
                this.location = val;
            },
            modifyBanner(row) {
                this.dialogVisible = true;
                let {id, location, type, url, uploads_id} = row;
                this.addFormData = {id, location, type, url, uploads_id};
                if (row.uploads.hasOwnProperty('path') && row.uploads.path) {
                    this.fileList = [
                        {
                            name: row.uploads.path.split('/').pop(),
                            url: row.uploads.path_url
                        }
                    ];
                }
            },
            delBanner(id) {
                this.$confirm('确认删除？')
                    .then(_ => {
                        delBanner({id}).then(result => {
                            if (result.code === 200) {
                                this.$message({
                                    type: "success",
                                    message: "删除成功",
                                });
                                this.loadData();
                            } else {
                                this.$message({
                                    type: "info",
                                    message: "删除失败",
                                });
                            }
                            this.dialogVisible = false;
                        })
                    })
                    .catch(_ => {
                    });


            },

            loadData() {
                let params = {
                    limit: this.pageSize,
                    page: this.currentPage,
                    type: this.searchFormData.type,
                    location: this.searchFormData.location,
                };
                BannerList(params).then((result) => {
                    this.total = result.data.total;
                    this.banners = result.data.list;
                });
            },
            addSubmit() {
                //先判断表单是否通过了判断
                this.$refs.addFormData.validate((valid) => {
                    //代表通过验证 ,将参数传回后台
                    if (valid) {
                        let cb = (result)=>{
                            if (result.code === 200) {
                                this.$message({
                                    type: "success",
                                    message: "操作成功",
                                });
                                setTimeout(() => {
                                    this.loadData();
                                }, 500);
                            } else {
                                this.$message({
                                    type: "info",
                                    message: "操作失败",
                                });
                            }
                            this.dialogVisible = false;
                        };
                        if (this.addFormData.id) {
                            //如果设置为type = 1 清除 url
                            if (this.addFormData.type == 1) {
                                this.addFormData.url = "";
                            }
                            BannerEdit(this.addFormData).then( result =>  cb(result) );
                        } else {
                            BannerAdd(this.addFormData).then( result =>  cb(result) )
                        }
                    }
                });
            },


            handleSizeChange(val) {
                this.pageSize = val;
                this.loadData();
            },

            /**
             * 翻页
             */
            handleCurrentChange(val) {
                this.currentPage = val;
                this.loadData();
            },
            /**
             * 重置
             * @param formName
             */
            resetForm(formName) {
                this.$refs[formName].resetFields();
                // this.loadData();
            }
        }
    }
</script>

<style scoped>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>