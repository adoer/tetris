<template>
  <div class="tetrisWrap">
    <div id="tetris">
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import Tetris from "@/js/tetrisBase.js"
export default {
  name: 'Tetris',
  props: {
    msg: String
  },
  data(){
    return {
      test: 1,
    }
  },
  setup () {
    const repositories = ref(2);
    return {
      repositories,
    }
  },
  methods:{
  },
  mounted(){
    new Tetris({
      id: "tetris"
    },this);
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.tetrisWrap{
  // height: 100%;
  // width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  #tetris{
    // width: 490px;
    overflow: hidden;
    padding: 20px;
    padding-right: 0px;
    background: url(../assets/images/borderBg.png) no-repeat -5px -12px;
    background-size: 303px 511px;
    // height: 546px;
    display: flex;
    //调整ie9、ie10的样式问题
    background-size: 301px 509px\9;
  }
  #tetris>canvas:first-child{
    background: #295159 url("../assets/images/logo.png") no-repeat center 29.5%;
    border:1px solid #ae8a35;
  }
  #tetris canvas:last-child{
    border-radius: 6px;
    border: 1px solid #a88639;

  }
  #divInfo{
    margin-left: 16px;
    background: #fdcb5d;
    padding: 6px;
    user-select: none;
    height: 450px;
    border-left: 2px solid #d9af52;
    border-radius: 0 6px 6px 0;
    border-right: 2px solid #e7bd63;
    border-bottom: 1px solid #dfb353;
    box-shadow: 3px 3px 3px 0 rgba(143, 112, 97, 0.53);
    >canvas{
      border-radius:4px;
    }
    img{
      width: 100px;
      cursor: pointer;
      display: block;
      margin-top: 9px;
      padding-left: 2px;
      box-shadow: 0px 1px 8px -1px #a87a15 inset;
      border-radius: 42px;
      transform: scale(0.9);
      //兼容ie10 加了高度，不然高度会变形
      height: 36.56px;
      &:hover{
        box-shadow: 0px 1px 8px -1px #a87a15;

      }
    }
  }
  #useTime,#level{
    color: #7a5f25;
    font-size: 14px;
    text-align: center;
    margin-top: 8px;
    background: #f0bf55;
    padding: 10px 0;
    border: 1px solid #e9bd5c;
    border-radius: 4px;
  }
  #pointTitle{
    color: #7a5f25;
    font-size: 14px;
    text-align: center;
    margin-top: 8px;
    background: #f0bf55;
    padding: 6px 0;
    border: 1px solid #e9bd5c;
    border-radius: 4px;
    >div{
      margin-top: 8px;
    }
  }
}
</style>
