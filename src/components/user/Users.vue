<template>
  <div class="users">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="10">
          <!-- 搜索 -->
          <el-input placeholder="请输入用户姓名" v-model="queryInfo.query" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <!-- 添加用户 -->
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <el-row>
        <!-- 用户列表 -->
        <el-table :data="userList" stripe style="width: 100%" border>
          <el-table-column prop="id" label="#" width="50"></el-table-column>
          <el-table-column prop="username" label="姓名"></el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column prop="mobile" label="手机"></el-table-column>
          <el-table-column prop="role_name" label="角色"></el-table-column>
          <el-table-column label="状态" width="70">
            <template slot-scope="scope">
              <el-switch
                @change="stateChange(scope.row)"
                v-model="scope.row.mg_state"
                active-color="#13ce66"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope>
              <!-- 修改按钮 -->
              <el-tooltip effect="dark" content="修改" placement="top" :enterable="false">
                <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
              </el-tooltip>
              <!-- 删除按钮 -->
              <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
                <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
              </el-tooltip>
              <!-- 分配角色按钮 -->
              <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
                <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row>
        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[2, 4, 8, 10]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-row>
    </el-card>
    <!-- 添加用户的对话框 -->
    <el-dialog title="添加用户" @closed="reset" :visible.sync="addDialogVisible" width="80%">
      <el-form
        class="add_form"
        :model="addForm"
        status-icon
        :rules="rules"
        ref="addForm"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="text" v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="email" v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input type="text" v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Users',
  data() {
    var checkMobile = (rule, value, cb) => {
      const regMobile = /^(0|86|17951)?(13[0-9]|15[0-9]|17[0-9]|14[57]|18[0-9])[0-9]{8}$/
      if (regMobile.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的手机号'))
    }
    return {
      // 添加的用户信息
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // dialog对话框的状态
      addDialogVisible: false,
      // 用户列表
      userList: [],
      // 用户总数
      total: 0,
      // 获取用户列表的对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 4
      },
      rules: {
        username: [
          { required: true, message: '请填写用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请填写邮箱', trigger: 'blur' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change']
          }
        ],
        mobile: [{ validator: checkMobile, trigger: ['blur', 'change'] }]
      }
    }
  },
  methods: {
    // 获取用户列表
    async getUserList() {
      const { data: res } = await this.$http.get('users', {
        params: this.queryInfo
      })
      this.userList = res.data.users
      this.total = res.data.total
      console.log(this.userList)
    },
    // 监听 条数/页 的改变
    handleSizeChange(val) {
      this.queryInfo.pagesize = val
      this.getUserList()
    },
    // 监听 当前页的改变
    handleCurrentChange(val) {
      this.queryInfo.pagenum = val
      this.getUserList()
    },
    // 监听 switch 开关状态的改变
    async stateChange(userInfo) {
      const { data: res } = await this.$http.put(
        `users/${userInfo.id}/state/${userInfo.mg_state}`
      )
      if (res.meta.status !== 200) {
        userInfo.mg_state = !userInfo.mg_state
        return this.$message({
          message: '更新状态失败',
          type: 'error',
          center: true
        })
      }
      this.$message({
        message: '更新状态成功',
        type: 'success',
        center: true
      })
    },
    // 监听对话框关闭事件
    reset() {
      this.$refs.addForm.resetFields()
    },
    // 点击确定，添加用户
    add() {
      console.log(this.$refs)
      this.$refs.addForm.validate(async valid => {
        console.log(valid)
        // 验证不通过，不关闭对话框
        if (!valid) {
          return this.$message({
            messgae: '请检查填写内容格式是否有误',
            type: 'error',
            center: true
          })
        }
        // 验证通过，添加用户
        const { data: res } = await this.$http.post('users', this.addForm)
        if (res.meta.status !== 201) {
          return this.$message({
            messgae: '添加失败',
            type: 'error',
            center: true
          })
        }
        this.$message({
          message: '添加成功',
          type: 'success',
          center: true
        })
        this.getUserList()
        this.addDialogVisible = false
      })
    }
  },
  created() {
    this.getUserList()
  }
}
</script>

<style lang="less" scoped>
.el-form {
  padding-right: 20px;
  box-sizing: border-box;
}
</style>
