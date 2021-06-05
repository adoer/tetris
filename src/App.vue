<template>
<a-config-provider :locale="locale">
  <Tetris @changeTable="changeTable"/>
  <!-- :pagination="pagination" -->
  <div class="statistics">
    <a-table 
      rowKey="id"
      :scroll="{ y: 400 }" 
      size="small" 
      :dataSource="dataSource" 
      :columns="columns"
      :pagination="pagination"
    />
  </div>
</a-config-provider>
</template>

<script>
import Tetris from './components/Tetris.vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN';
export default {
  name: 'App',
  components: {
    Tetris
  },
  data() {
    return {
      locale: zhCN,
      /* 分页参数 */
      pagination: {
        // current: 1,
        /* pageSize: 10,
        limit: 10,
        pageSizeOptions: ['10', '20', '30'], */
        showTotal: (total, range) => {
          return ' 共' + total + '条'
        },
        showQuickJumper: false,
        showSizeChanger: true,
        // total: 0,
      },
      dataSource: [],
      columns: [
        {
          title: '序号',
          dataIndex: 'index',
          width: 100,
          align: "left",
          key: 'index',
          customRender: ({text, record, index}) => {
            return index + 1;
          },
        },
        {
          title: '得分',
          key: 'point',
          align: "center",
          dataIndex: 'point',
        },
        {
          title: '消行数',
          key: 'rows',
          align: "center",
          dataIndex: 'rows',
        },
        {
          title: '耗时',
          width: 100,
          key: 'useTime',
          align: "center",
          dataIndex: 'useTime',
        },
        {
          title: '结束时间',
          key: 'time',
          width: 162,
          align: "center",
          dataIndex: 'time',
        },
      ],
    };
  },
  methods:{
    changeTable(data){
      this.dataSource.unshift(data);
    },
    getData(){
      this.axios.get('/getUser').then((res) => {
        if(res.data.success){
          this.dataSource = res.data.data;
        }
      })
    },
  },
  mounted(){
    this.getData();
  }
}
</script>
<style lang="less">
.statistics{
  width: 700px;
  background: #fff;
  @borderRadius: 6px;
  border-radius: @borderRadius;
  .ant-table{
    border-radius: @borderRadius;
  }
  .ant-table-scroll{
    border-radius: @borderRadius;
  }
}

</style>
