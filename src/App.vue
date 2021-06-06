<template>
<a-config-provider :locale="locale">
  <Tetris @changeTable="changeTable"/>
  <!-- :pagination="pagination" -->
  <div class="statistics">
    <div class="headVal">
      <div class="item">
        <span class="title">尝试次数：</span>
        <span class="val">{{total}}</span>
      </div>
      <div class="item">
        <span class="title">平均得分：</span>
        <span class="val">{{avgPoint}}</span>
      </div>
      <div class="item">
        <span class="title">平均行数：</span>
        <span class="val">{{avgRows}}</span>
      </div>
    </div>
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
      avgPoint: 0,
      avgRows: 0,
      total: 0,
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
    changeTable(params){
      // this.dataSource.unshift(data);
      this.axios.post('/addTetris',params).then((res) => {
        if(res.data.success){
          console.log("入库成功");
          this.getData();
        }
      })
    },
    getData(){
      this.axios.get('/getTetris').then((res) => {
        if(res.data.success){
          this.dataSource = res.data.data;
          let curPoint = 0,curRows = 0,l = this.dataSource.length;
          this.dataSource.forEach(el =>{
            curPoint += el.point;
            curRows += el.rows;
          });
          this.total = l;
          this.avgPoint = (curPoint/l).toFixed(2);
          this.avgRows = (curRows/l).toFixed(2);
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
  padding: 10px;
  background: #fff;
  @borderRadius: 6px;
  border-radius: @borderRadius;
  .headVal{
    display: flex;
    justify-content: space-around;
    margin: 10px 0;
    .val{
      color: #ff4d4f
    }
  }
  .ant-table{
    border-radius: @borderRadius;
  }
  .ant-table-scroll{
    border-radius: @borderRadius;
  }
}

</style>
