<template>
    <!-- <div>班级管理</div> -->
    <div>
        <h1 style="margin-left: 10px;">班级-信息管理</h1>
        <el-form :inline="true" ref="vForm" :model="searchFormData" label-position="right" label-width="80px"
            class="demo-form-inline">
            <el-form-item label="班级ID" prop="id">
                <el-input v-model="searchFormData.id" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="班级名称" prop="name">
                <el-input v-model="searchFormData.name" placeholder=""></el-input>
            </el-form-item>
            <el-form-item>
                <el-button style="background-color:#C0D9D9;border-color:#C0D9D9" type="primary" @click="searchSubmit">查询</el-button>
                <el-button style="background-color:#C0D9D9;border-color:#C0D9D9" type="primary" @click="searchResetForm">重置</el-button>
            </el-form-item>
        </el-form>

        <hr />
        <!-- 新增模块 -->
        <div style="background-color:#C0D9D9">
            <el-button type="primary" @click="openAddWindow" style="color:black;background-color:#DB9370;border-color:#DB9370">新增</el-button>
        </div>
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :close-on-click-modal="false"
            :destroy-on-close="true">
            <div>
                <el-form :model="formData" ref="formData" :rules="formRules">
                    <el-form-item label="班级ID" :label-width="formLabelWidth">
                        <el-input v-model="formData.id" autocomplete="off" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="班级名称" :label-width="formLabelWidth" prop="name">
                        <el-input v-model="formData.name" autocomplete="off"></el-input>
                    </el-form-item>
                    
                </el-form>

            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveFormData">确 定</el-button>
            </span>
        </el-dialog>


        <el-table :data="tableData" style="width:100%">
            <el-table-column prop="id" label="班级ID" width="">
            </el-table-column>
            <el-table-column prop="name" label="班级名称" width="">
            </el-table-column>

            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button @click="openEditWindow(scope.row.id)" type="text" size="small">编辑</el-button>
                    <el-button @click="deleteById(scope.row.id)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <br />

        <hr size="8px" color="#C0D9D9">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="pageObj.currentPage" :page-sizes="[5, 10, 20, 30, 40]" :page-size="pageObj.pageSize"
            layout="total, sizes, prev, pager, next" :total="pageObj.total">
        </el-pagination>
        <hr size="3px" color="#C0D9D9">


    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Classes',
    components: {
        
    },
    data() {
        return {
            formData: {
                // id: '',
                // name: '',
                
            },
            formRules: {//表单规则
                id: [
                    { required: true, message: '请输入班级ID', trigger: 'blur' },
                    { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' },

                ],
            },
            formLabelWidth: '120px',
            dialogTitle: null,
            dialogVisible: false,//是否显示
            searchFormData: {},
            tableData: [
                // { id: "001", name: "21软件Java开发岗位班" },
                // { id: "002", name: "21软件Web开发岗位班" },
                // { id: "003", name: "21软件测试岗位班" },
                
            ],
            pageObj: {
                pageSize: 10,
                total: 0,
                currentPage: 1
            },
            pageObj: {
                pageSize: 10,
                total: 0,
                currentPage: 1
            },

        }
    },
    methods: {

        openAddWindow() {
            this.formData = {}
            this.dialogVisible = true
            this.dialogTitle = "新增"
            // alert(1)
        },
        //新增 或者 编辑调用该函数
        saveFormData() {
            this.$refs['formData'].validate(valid => {
                console.log(valid)
                console.log(this.formData.id)
                if (!valid) {
                    return
                }

                console.log("提交对象", this.formData)
                if (this.formData.id || this.formData.id == 0) {//修改一条班级数据
                    axios.put('/api/score/scClass/update', this.formData).then((resp) => {
                        //操作成功
                        this.$message({
                            message: resp.data.description,
                            type: 'success'
                        });

                    })
                } else {//新增一条班级数据
                    axios.post('/api/score/scClass/insert', this.formData).then((resp) => {
                        //操作成功
                        this.$message({
                            message: resp.data.description,
                            type: 'success'
                        });

                    })

                }

            })
            this.dialogVisible = false
        },
        searchSubmit() {
            console.log('searchSubmit')
            let that = this
            this.$refs['vForm'].validate(valid => {
                if (!valid)  return
                console.log(that.searchFormData)
                // let params = Object.assign(that.searchFormData,{ current:that.pageObj.currentPage,size:that.pageObj.pageSize})
                let params = Object.assign(that.searchFormData, { current: 1, size: 10 })
                axios.get('/api/score/scClass/list', {
                    params: params
                }).then((resp) => {
                    console.log(resp.data)
                    if (resp.data.code == '200') {
                        that.tableData = resp.data.data.records //设置表格数据
                        that.pageObj.total = resp.data.data.total
                    }
                }).catch((err) => {
                    console.log(err)
                })

            })

            return false;
        },

        handleSizeChange(pageSize) {//每页条数发生改变时
            this.pageObj.currentPage = 1
            this.pageObj.pageSize = pageSize
            let that = this
            this.$refs['vForm'].validate(valid => {
                if (!valid) return
                console.log(that.searchFormData)
                let params = Object.assign(that.searchFormData, { current: that.pageObj.currentPage, size: that.pageObj.pageSize })
                // let params = Object.assign(that.searchFormData, { current: 1, size: 10 })
                axios.get('/api/score/scClass/list', {
                    params: params
                }).then((resp) => {
                    console.log(resp.data)
                    if (resp.data.code == '200') {
                        that.tableData = resp.data.data.records //设置表格数据
                        that.pageObj.total = resp.data.data.total
                    }
                }).catch((err) => {
                    console.log(err)
                })
            })

        },
        searchResetForm() {
            // this.$refs['vForm'].resetFields();
            this.$refs['vForm'].resetFields();

        },
        handleCurrentChange(currentPageNo) {
            this.pageObj.currentPage = currentPageNo;
            let that = this
            //需要点击重置为null  而不是 空字符串 ''
            this.$refs['vForm'].validate(valid => {
                if (!valid) return

                let params = Object.assign(that.searchFormData, { current: that.pageObj.currentPage, size: that.pageObj.pageSize })
                console.log("请求参数", params)
                axios.get('/api/score/scClass/list', {
                    params: params
                }).then((resp) => {
                    console.log(resp.data)
                    if (resp.data.code == '200') {
                        that.tableData = resp.data.data.records //设置表格数据
                        that.pageObj.total = resp.data.data.total
                    }
                }).catch((err) => {
                    console.log(err)
                })
            })
        },
        //删除
        deleteById(id) {
            // alert(id)
            axios.delete(`/api/score/scClass/delete/${id}`).then((resp) => {
                //操作成功
                this.$message({
                    message: resp.data.description,
                    type: 'success'
                });
            })

        },
        openEditWindow(id) {//点击编辑按钮
            // alert(id)
            this.dialogVisible = true
            //this.dialogVisible = ture
            //this.formData.id = id
            this.dialogTitle = "编辑"

            let that = this
            axios.get(`/api/score/scClass/${id}`).then((resp) => {
                console.log(id)
                console.log(resp.data);
                that.formData = resp.data.data
            })
        },



    }
}
</script>

<style scoped></style>