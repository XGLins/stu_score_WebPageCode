<template>
    <!-- <div>成绩管理</div> -->
    <div>
        <h1 style="margin-left: 10px;">学生-成绩管理</h1>

        <el-form :inline="true" ref="vForm" :model="searchFormData" label-position="right" label-width="80px"
            class="demo-form-inline">
            <el-form-item label="学生ID" prop="studentId">
                <el-input v-model="searchFormData.studentId" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="学生姓名" prop="studentName">
                <el-input v-model="searchFormData.studentName" placeholder=""></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="searchSubmit">查询</el-button>
                <el-button type="primary" @click="searchResetForm">重置</el-button>
            </el-form-item>
        </el-form>

        <hr />
        <!-- 新增模块 -->
        <div style="background-color:gray">
            <el-button type="primary" @click="openAddWindow">新增</el-button>
        </div>
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :close-on-click-modal="false"
            :destroy-on-close="true">
            <div>
                <el-form :model="formData" ref="formData" :rules="formRules">
                    <!-- 序号 -->
                    <el-form-item label="id" :label-width="formLabelWidth">
                        <el-input v-model="formData.id" autocomplete="off" :disabled="true"></el-input>
                    </el-form-item>

                    <!-- 学生信息 -->
                    <el-form-item label="学生ID" :label-width="formLabelWidth" prop="studentId">
                        <el-input v-model="formData.studentId" autocomplete="off" ></el-input>
                    </el-form-item>
                    <el-form-item label="学生姓名" :label-width="formLabelWidth" prop="studentName">
                        <el-input v-model="formData.studentName" autocomplete="off"></el-input>
                    </el-form-item>

                    <!-- 课程信息 -->
                    <el-form-item label="课程ID" :label-width="formLabelWidth" prop="courseId">
                        <el-input v-model="formData.courseId" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="课程名称" :label-width="formLabelWidth" prop="courseName">
                        <el-input v-model="formData.courseName" autocomplete="off"></el-input>
                    </el-form-item>
                    
                    <!-- 班级信息 -->
                    <el-form-item label="班级ID" :label-width="formLabelWidth" prop="classId">
                        <el-input v-model="formData.classId" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="班级名称" :label-width="formLabelWidth" prop="className">
                        <el-input v-model="formData.className" autocomplete="off"></el-input>
                    </el-form-item>

                    <!-- 教师信息 -->
                    <el-form-item label="教师ID" :label-width="formLabelWidth" prop="teacherId">
                        <el-input v-model="formData.teacherId" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="教师姓名" :label-width="formLabelWidth" prop="teacherName">
                        <el-input v-model="formData.teacherName" autocomplete="off"></el-input>
                    </el-form-item>

                    <!-- 学生成绩 -->
                    <el-form-item label="学生成绩" :label-width="formLabelWidth" prop="score">
                        <el-input v-model="formData.score" autocomplete="off"></el-input>
                    </el-form-item>

                </el-form>

            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveFormData">确 定</el-button>
            </span>
        </el-dialog>


        <el-table :data="tableData" style="width:100%">
            <el-table-column prop="id" label="序号" width="">
            </el-table-column>
            <el-table-column prop="studentName" label="学生" width="">
            </el-table-column>
            <el-table-column prop="courseName" label="课程" width="">
            </el-table-column>
            <el-table-column prop="className" label="班级" width="">
            </el-table-column>
            <el-table-column prop="teacherName" label="评分教师" width="">
            </el-table-column>
            <el-table-column prop="score" label="成绩" width="">
            </el-table-column>
        </el-table>
        <br />

        <!-- 分页插件 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="pageObj.currentPage" :page-sizes="[5, 10, 20, 30, 40]" :page-size="pageObj.pageSize"
            layout="total, sizes, prev, pager, next" :total="pageObj.total">
        </el-pagination>


    </div>
</template>


<script>
import axios from 'axios'
export default {
    name: 'Student',
    components: {
        
    },
    data() {
        return {
            formData: {
                
            },
            formRules: {//表单规则
                studentId: [
                    { required: true, message: '学生Id不能为空', trigger: 'blur' },
                    { min: 5, max: 11, message: '长度在 5 到 11 个字符', trigger: 'blur' },
                ],
                studentName: [
                    { required: true, message: '请输入学生姓名', trigger: 'blur' },
                    { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                ],
                courseId: [
                    { required: true, message: '课程Id不能为空', trigger: 'blur' },
                    { min: 1, max: 11, message: '长度在 1 到 11 个字符', trigger: 'blur' },
                ],
                courseName: [
                    { required: true, message: '请输入课程名称', trigger: 'blur' },
                    { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                ],
                
                classId: [
                    { required: true, message: '班级Id不能为空', trigger: 'blur' },
                    { min: 1, max: 11, message: '长度在 1 到 11 个字符', trigger: 'blur' },
                ],
                className: [
                    { required: true, message: '请输入班级名称', trigger: 'blur' },
                    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                ],
                teacherId: [
                    { required: true, message: '教师Id不能为空', trigger: 'blur' },
                    { min: 1, max: 11, message: '长度在 1 到 11 个字符', trigger: 'blur' },
                ],
                teacherName: [
                    { required: true, message: '请输入教师姓名', trigger: 'blur' },
                    { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                ],
                score: [
                    { required: true, message: '成绩不能为空', trigger: 'blur' },
                    { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
                ],
            },
            formLabelWidth: '120px',
            dialogTitle: null,
            dialogVisible: false,//是否显示
            searchFormData: {},
            tableData: [
                // { id: "01", studentName: "张三", courseName: "JacaSE 高级编程", className: "2020级软件技术0班", teacherName: "宋浩", score: "145" }
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
                if (!valid) {
                    return
                }
                console.log("提交对象", this.formData)
                if (this.formData.id || this.formData.id == 0) {//修改一条教师数据
                    axios.put('/api/score/scScore/update', this.formData).then((resp) => {
                        //操作成功
                        this.$message({
                            message: resp.data.description,
                            type: 'success'
                        });

                    })
                } else {//新增一条教师数据
                    axios.post('/api/score/scScore/insert', this.formData).then((resp) => {
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
                axios.get('/api/score/scScore/list', {
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
                axios.get('/api/score/scScore/list', {
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
                axios.get('/api/score/scScore/list', {
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
            axios.delete(`/api/score/scScore/delete/${id}`).then((resp) => {
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
            axios.get(`/api/score/scScore/${id}`).then((resp) => {
                console.log(id)
                console.log(resp.data);
                that.formData = resp.data.data
            })
        },



    }
}
</script>

<style scoped></style>