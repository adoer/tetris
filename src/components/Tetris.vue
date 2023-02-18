<template>
  <div class="tetrisWrap">
    <div id="tetris">
    </div>
    <div class="btnCon">
      <div class="btnWrap">
        <div class="btn up" @touchstart="upstart()">
          <iconArrow/>
        </div>
        <div class="btnMid">
          <div class="btn left" @touchstart="leftstart()">
            <iconArrow style="transform: rotate(-90deg);"/>
          </div>
          <div class="btn right" @touchstart="rightstart()">
            <iconArrow style="transform: rotate(90deg);"/>
          </div> 
        </div>
        <div class="btn down" @touchstart="downstart()" @touchend="touchendDown()">
          <iconArrow style="transform: rotate(180deg);"/>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import iconArrow from "./iconArrow.vue";
import { ref,onMounted,getCurrentInstance } from 'vue'
import Tetris from "@/js/tetrisBase.js"
  let tet = null
  function upstart(){
    tet.upAndw()
  }
  function leftstart(){
    tet.leftAnda()
  }
  function rightstart(){
    tet.rightAndd()
  }
  function downstart(){
    console.log('downstart')
    tet.downAnds()
  }
  function touchendDown(){
    // console.log('touchendDown')
    tet.speedDownFunc()
  }
  const { proxy } = getCurrentInstance()
  onMounted(()=>{
    tet = new Tetris({
      id: "tetris"
    },proxy);
  })
// }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.tetrisWrap{
  // height: 100%;
  // width: 100%;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  .btnCon{
    background: #fdcb5d;
    // border-top: 1px solid #d7af4f;
    // height: 100px;
    padding: 6px;
    .btnWrap{
      // display: flex;
    }
    .btn{
      padding: 6px;
      background: #ffecc4;
      text-align: center;
      cursor: pointer;
      border-radius: 12px;
    }
    @btnColor:#fdcb5d;
    .up{
      border-bottom: 2px solid @btnColor;
    }
    .down{
      border-top: 2px solid @btnColor;
    }
    .left{
      width: 50%;
      border-right: 1px solid @btnColor;
    }
    .right{
      width: 50%;
    }
    .btnMid{
      display: flex;
      justify-content: space-between;
    }
  }
  #tetris{
    // width: 490px;
    overflow: hidden;
    padding: 20px;
    padding-right: 0px;
    background: url(../assets/images/borderBg.webp) no-repeat -5px -12px;
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
// Medium devices (tablets, 768px and up)
@media (min-width: 768px) {
  .btnCon{
    display: none;
  }
}
@media (max-width: 768px) {
  .tetrisWrap {
    #tetris {
      overflow: hidden;
      padding: 0;
      background: none;
      display: flex;
      border: 2px solid #fdcb5d;
      border-radius: 4px;
      background: #fdcb5d;
      >canvas:first-child{
        border: 1px solid #d7af4f;
      }
    }
    #divInfo{
      margin-left: 0;
      padding: 0;
      padding-top: 2px;
      padding-left: 2px;
      user-select: none;
      // height: 450px;
      border-left: none;
      border-radius: initial;
      border-right: none;
      border-bottom: none;
      box-shadow: none;
    }
  }
}
</style>
