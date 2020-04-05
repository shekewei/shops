<template>
  <el-container class="container">
    <!-- 侧边栏 -->
    <el-aside :width="isCollapse?'55px':'200px'">
      <div class="toggle-btn" @click.stop="toggleCollapse">|||</div>

      <!-- 侧边栏导航区 -->
      <el-menu
        router
        :collapse-transition="false"
        :collapse="isCollapse"
        :unique-opened="true"
        background-color="#333744"
        text-color="#fff"
        active-text-color="#409EFF"
        :default-active="defaultActive"
      >
        <!-- 一级菜单 -->
        <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
          <template slot="title">
            <i :class="iconObj[item.id]"></i>
            <span>{{item.authName}}</span>
          </template>
          <!-- 二级菜单 -->
          <el-menu-item
            @click="save(item2.path)"
            :index="item2.path + ''"
            v-for="item2 in item.children"
            :key="item2.id"
          >
            <i class="el-icon-menu"></i>
            {{item2.authName}}
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <!-- 中间区域  -->
    <el-container class="middleContent">
      <!-- 中间区域头部 -->
      <el-header>
        <div class="logo">
          <img src="../assets/logo.png" alt />
          <span>电商后台管理系统</span>
        </div>
        <div class="header_right">
          <span class="logout el-icon-right" @click="logout">退出</span>
        </div>
      </el-header>
      <!-- 中间区域主题内容 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      // 左侧导航数据
      menuList: [],
      // 左侧导航区的图标
      iconObj: {
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      },
      // 是否收起左侧导航区
      isCollapse: false,
      // 高亮的导航菜单
      defaultActive: ''
    }
  },
  methods: {
    // 登出
    logout() {
      // 清空登录状态
      window.sessionStorage.clear()
      // 跳转回登录界面
      this.$router.push('/login')
    },
    // 获取菜单
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menuList = res.data
    },
    // 菜单折叠
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    save(defaultActive) {
      window.sessionStorage.setItem('dActive', defaultActive)
    }
  },
  created() {
    // 获取菜单列表
    this.getMenuList()
    this.defaultActive = window.sessionStorage.getItem('dActive')
  }
}
</script>

<style lang="less" scoped>
ul {
  list-style: none;
}
.iconfont {
  padding-right: 10px;
}
.el-menu {
  border: none;
}
.el-menu-item {
  box-sizing: border-box;
  border-left: 4px solid rgb(107, 106, 106);
  border-right: 0;
}
.middleContent {
  .el-header {
    background-color: rgb(240, 240, 240);
    display: flex;
    div {
      flex: 1;
      display: flex;
      align-items: center;
      font-size: 14px;
      color: rgb(124, 124, 124);
      span {
        white-space: nowrap;
      }
      &.logo {
        justify-content: flex-start;
        img {
          width: 40px;
          height: 40px;
        }
        span {
          box-sizing: border-box;
          padding-left: 20px;
        }
      }
      &.header_right {
        justify-content: flex-end;
        padding-right: 20px;
        span {
          text-align: center;
          padding-right: 20px;
          cursor: pointer;
        }
      }
    }
  }
}
.el-main {
  background-color: #fff;
}
.el-aside {
  background-color: #333744;
  overflow: hidden;
  position: relative;
  & > div {
    &.toggle-btn {
      font-size: 14px;
      height: 24px;
      z-index: 999;
      margin: 0 auto;
      text-align: center;
      color: #fff;
      letter-spacing: 0.2em;
      transform: rotate(90deg);
      cursor: pointer;
      background-color: #333747;
      &:hover {
        animation: ro linear 0.5s;
        transform: rotate(180deg);
      }
    }
  }
}
@keyframes ro {
  0% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(135deg);
  }
  100% {
    transform: rotate(180deg);
  }
}

.container {
  width: 100%;
  height: 100%;
}
.right_in {
  display: block !important;
  animation: right_left linear 0.5s;
}
@keyframes right_left {
  0% {
    left: 100%;
    opacity: 0.3;
  }
  50% {
    left: 50%;
    opacity: 0.7;
  }
  100% {
    left: 0;
    opacity: 1;
  }
}
</style>
