<template>
   <div class="app-container">
      <el-form :model="queryParams" ref="queryRef" :inline="true" label-width="68px">
         <el-form-item label="登录地址" prop="ipaddr">
            <el-input
               v-model="queryParams.ipaddr"
               placeholder="请输入登录地址"
               clearable
               size="small"
               @keyup.enter="handleQuery"
            />
         </el-form-item>
         <el-form-item label="用户名称" prop="userName">
            <el-input
               v-model="queryParams.userName"
               placeholder="请输入用户名称"
               clearable
               @keyup.enter="handleQuery"
            />
         </el-form-item>
         <el-form-item>
            <el-button type="primary" icon="Search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="Refresh" size="mini" @click="resetQuery">重置</el-button>
         </el-form-item>
      </el-form>
      <el-table
         v-loading="loading"
         :data="onlineList"
         style="width: 100%;"
      >
         <el-table-column label="序号" type="index" align="center">
            <template #default="scope">
               <span>{{ (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1 }}</span>
            </template>
         </el-table-column>
         <el-table-column label="会话编号" align="center" prop="tokenId" :show-overflow-tooltip="true" />
         <el-table-column label="登录名称" align="center" prop="userName" :show-overflow-tooltip="true" />
         <el-table-column label="所属部门" align="center" prop="deptName" :show-overflow-tooltip="true" />
         <el-table-column label="主机" align="center" prop="ipaddr" :show-overflow-tooltip="true" />
         <el-table-column label="登录地点" align="center" prop="loginLocation" :show-overflow-tooltip="true" />
         <el-table-column label="操作系统" align="center" prop="os" :show-overflow-tooltip="true" />
         <el-table-column label="浏览器" align="center" prop="browser" :show-overflow-tooltip="true" />
         <el-table-column label="登录时间" align="center" prop="loginTime" width="180">
            <template #default="scope">
               <span>{{ parseTime(scope.row.loginTime) }}</span>
            </template>
         </el-table-column>
         <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template #default="scope">
               <el-button
                  size="mini"
                  type="text"
                  icon="Delete"
                  @click="handleForceLogout(scope.row)"
                   v-auth="'monitor:online:forceLogout'"
               >强退</el-button>
            </template>
         </el-table-column>
      </el-table>

      <!-- 分页设置-->
       <div v-show="total > 0">
          <el-divider></el-divider>
          <el-pagination
                  background
                  :total="total"
                  :current-page="queryParams.pageNum"
                  :page-size="queryParams.pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
          />
       </div>
   </div>
</template>

<script  lang="ts">
import {ref, toRefs, reactive, onMounted, getCurrentInstance, onUnmounted,} from "vue";
 import {ElMessage, ElMessageBox} from "element-plus";
import { forceLogout, list as initData } from "/@/api/monitor/online";
export default {
   name: "onlineuser",
   setup() {
      const { proxy } = getCurrentInstance() as any;
      const state = reactive({
                total: 0,
                loading: true,
                onlineList: [] as any,
                queryParams: {
                   pageNum: 1,
                   pageSize: 10,
                   ipaddr: undefined,
                   userName: undefined
                 },
         });
      /** 查询登录日志列表 */
      const getList = () => {
             state.loading = true;
             initData(state.queryParams).then((response:any) => {
                  state.onlineList=response.rows;
                  state.total=response.total;
                  state.loading = false;
             })
       }
       /** 搜索按钮操作 */
        const handleQuery = () => {
         getList();
       }
      /** 重置按钮操作 */
      const resetQuery = () => {
         state.queryParams.pageNum = 1;
         state.queryParams.pageSize = 10;
         state.queryParams.ipaddr = "";
         state.queryParams.userName ="";
        handleQuery();
      }

      //分页页面大小发生变化
     const handleSizeChange = (val: any) => {
         state.queryParams.pageSize = val;
         handleQuery();
     };
     //当前页码发生变化
     const handleCurrentChange = (val: any) => {
         state.queryParams.pageNum = val;
         handleQuery();
     };
      /** 强退按钮操作 */
      const handleForceLogout= (row:any) => {
       ElMessageBox({
                    message: '是否确认强退名称为"' +  row.userName + '"的用户?',
                    title: "警告",
                    showCancelButton: true,
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
               }).then(function () {
                 return forceLogout(row.tokenId);
           }).then(() => {
                getList();
                ElMessage.success("强退成功");
             });
      }
      // 页面加载时
       onMounted(() => {
           getList();
       })
       return {
          handleCurrentChange,
          handleSizeChange,
          handleForceLogout,
          handleQuery,
          resetQuery,
          getList,
          ...toRefs(state),
       }
    }
};
</script>
<style scoped>
</style>
