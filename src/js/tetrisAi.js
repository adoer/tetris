const TetrisAi = (tetris) => {
  // 评估那个落点 最好
  const evaluate = (droppoint) => {
    const self = tetris;
    // @brief 方块顶部距离底部高度 放置棋子的高度 = 立柱高度+（棋子高度/2）
    function landingHeight(block) {
      let curY = block.xy.map(e => e.y);
      let max = Math.max(...curY);
      let min = Math.min(...curY);
      let h = min+(max-min)/2;
      return self.cols-h;
    }

    // @brief 消行个数 消除的行数*消除这行中，此方块被消除1*1大小的小方块个数
    function rowsEliminated(block) {
      let eliminatedNum = 0,eliminatedGridNum = 0;
      let blockXy = block.xy;
      let value = block.value;
      let dataArrCopy = self.deepCopy(self.dataArr,[]);
      blockXy.forEach(el =>{
        let y = el.y;
        let x = el.x;
        if (dataArrCopy[y]) {
          dataArrCopy[y][x] = value;
        }
      });
      blockXy.forEach(ele =>{
        let cur = dataArrCopy[ele.y];
        if (ele.y >= 0 && !cur.includes(0)) {
          eliminatedNum++;
        }
      });
      eliminatedGridNum = dataArrCopy.filter(el => el.every(e => e > 0)).length;
      return eliminatedNum*eliminatedGridNum;
    }

    // 获取 dataArr 消行后的数据
    function eliminateRemain(block){
      let blockXy = block.xy;
      let value = block.value;
      let dataArrCopy = self.deepCopy(self.dataArr,[]);
      blockXy.forEach(el =>{
        let y = el.y;
        let x = el.x;
        if (dataArrCopy[y]) {
          dataArrCopy[y][x] = value;
        }
      });
      blockXy.forEach(ele =>{
        let cur = dataArrCopy[ele.y];
        if (ele.y >= 0 && !cur.includes(0)) {
          dataArrCopy.splice(ele.y, 1);
          dataArrCopy.unshift(new Array(self.rows).fill(0));
        }
      });
      return dataArrCopy;
    }

    // @brief 行变换个数
    function rowTransitions(dataArrCopy) {
      let res = 0;
      dataArrCopy.forEach(el =>{
        el.forEach((e,i) =>{
          if(e > 0){
            let prev = el[i-1];
            let next = el[i+1];
            // 两边都有空的
            if(prev === 0 && next === 0){
              res += 2;
            // 左边为空
            }else if(prev === 0 && next !== 0){
              res++;
            // 右边为空
            }else if(prev !== 0 && next === 0){
              res++;
            }
          }
        });
      });
      return res;
    }
    // @brief 列变换个数
    function colTransitions(dataArrCopy) {
      let res = 0;
      dataArrCopy[0].forEach((el,ind) =>{
        dataArrCopy.forEach((e,i) =>{
          if(dataArrCopy[i][ind] > 0){
            let prev;
            if(dataArrCopy[i-1]){
              prev = dataArrCopy[i-1][ind];
            }
            let next;
            if(dataArrCopy[i+1]){
              next = dataArrCopy[i+1][ind];
            }
            // 上下都有空的
            if(prev === 0 && next === 0){
              res += 2;
            // 上边为空
            }else if(prev === 0 && next !== 0){
              res++;
            // 下边为空
            }else if(prev !== 0 && next === 0){
              res++;
            }
          }
        });
      });
      return res;
    }
    // @brief 空洞个数
    /* 空洞指的是，每列中某个方块下面没有方块的空白位置，
    该空白可能由 1 个单位或多个单位组成，但只要没有被方块隔断，
    都只算一个空洞。注意，空洞的计算以列为单位，
    若不同列的相邻空格连在一起，不可以将它们算作同一个空洞。 */
    function emptyHoles(dataArrCopy) {
      let res = 0;
      // let dataArrCopy = eliminateRemain(block);
      dataArrCopy[0].forEach((el,ind) =>{
        dataArrCopy.forEach((e,i) =>{
          if(dataArrCopy[i][ind] > 0){
            let prev;
            if(dataArrCopy[i-1]){
              prev = dataArrCopy[i-1][ind];
            }
            let next;
            if(dataArrCopy[i+1]){
              next = dataArrCopy[i+1][ind];
            }
            // 下边为空
            if(next === 0){
              res++;
            }
          }
        });
      });
      return res;
    }
    // @brief 井的个数 
    // [0,0,0,0,1,0,0,0]
    // [0,0,1,0,1,0,0,0]
    // [0,0,1,0,1,0,0,0]
    // [0,0,1,1,1,0,0,0]
    // [0,0,1,0,1,0,0,0]
    // [0,0,1,0,1,0,0,0]
    // [0,0,1,1,1,0,0,0]
    // [0,0,1,0,1,0,0,0]
    // [0,0,1,0,1,0,0,0]
    // [0,0,1,0,1,0,0,0]
    function wellNums(dataArrCopy) {
      let res = [];
      // let dataArrCopy = eliminateRemain(block);
      // let validDataArrCopy = dataArrCopy.filter(el => el.some(e => e>0));
      dataArrCopy[0].forEach((el,ind) =>{
        dataArrCopy.forEach((e,i) =>{
          // 边界不算 元素素大于1
          if(i < dataArrCopy.length - 1 && ind > 0 && ind < dataArrCopy[0].length - 1){
            let prev,prevLeft,prevRight;
            if(dataArrCopy[i][ind] > 0 && dataArrCopy[i-1]){
              let j = 1;
              let curRes = 0;
              while( true ){
                if(dataArrCopy[i-j]){
                  prev = dataArrCopy[i-j][ind];
                  prevLeft = dataArrCopy[i-j][ind-1];
                  prevRight = dataArrCopy[i-j][ind+1];
                  if(prev === 0 && prevLeft > 0 && prevRight > 0){
                    curRes++;
                    j++;
                    continue;
                  }
                  break;
                }
                break;
              }
              if(curRes>0){
                res.push(curRes);
              }
            }
          // 最后一行 并且此元素为0
          }else if(i === dataArrCopy.length - 1){
            if(dataArrCopy[i][ind] === 0){
              // dataArrCopy[i-1] 肯定存在
              let prev,prevLeft,prevRight;
              prev = dataArrCopy[i-1][ind];
              // 只有其本身是空的，上右左都是方块
              if (prev > 0 && dataArrCopy[i][ind-1] > 0 && dataArrCopy[i][ind+1] > 0){
                res.push(1);
              }else {
                let j = 0;
                while( true ){
                  if(dataArrCopy[i-j]){
                    prev = dataArrCopy[i-j][ind];
                    prevLeft = dataArrCopy[i-j][ind-1];
                    prevRight = dataArrCopy[i-j][ind+1];
                    if(prev === 0 && prevLeft > 0 && prevRight > 0){
                      j++;
                      continue;
                    }
                    break;
                  }
                  break;
                }
                if(j>0){
                  res.push(j);
                }
              }
            }else {
              let j = 1;
              let curRes = 0;
              let prev,prevLeft,prevRight;
              while( true ){
                if(dataArrCopy[i-j]){
                  prev = dataArrCopy[i-j][ind];
                  prevLeft = dataArrCopy[i-j][ind-1];
                  prevRight = dataArrCopy[i-j][ind+1];
                  if(prev === 0 && prevLeft > 0 && prevRight > 0){
                    curRes++;
                    j++;
                    continue;
                  }
                  break;
                }
                break;
              }
              if(curRes>0){
                res.push(curRes);
              }
            }
          }
        });
      });
      if(res.length>0){
        res = res.reduce((a,b) => {
          return (a*(1+a))/2 + (b*(1+b))/2
        });
      }
      return res;
    }

    let resBlock = {
      block: {},
      evaluate: -Infinity,
    };
    droppoint.forEach((el,i) =>{
      let dataArrCopy = eliminateRemain(el);
      let curEvaluate = (-4.500158825082766) * landingHeight(el)   // 下落高度
              + (3.4181268101392694) * rowsEliminated(el)          // 消行个数
              + (-3.2178882868487753) * rowTransitions(dataArrCopy)         // 行变换
              + (-9.348695305445199) * colTransitions(dataArrCopy)          // 列变化
              + (-7.899265427351652) * emptyHoles(dataArrCopy)              // 空洞个数
              + (-3.3855972247263626) * wellNums(dataArrCopy);              // 井数
      if(curEvaluate > resBlock.evaluate){
        resBlock.block = self.deepCopy(el);
        resBlock.evaluate = curEvaluate;
      }
    });
    // console.log(resBlock.block,resBlock.evaluate);
    let xy = resBlock.block.xy;
    let maxY = Math.max(...(xy.map(e => e.y)));
    resBlock.block.xy.forEach((el,i) => {
      resBlock.block.xy[i].y = el.y - maxY;
    });
    return resBlock.block;
  }
  // 将方块平移到最左边
  const moveBlockToLeft = (block, offsetY = 0) => {
    let min_x =  Math.min(...(block.xy.map(el => el.x)));
    block.xy.forEach((el,i) =>{
      block.xy[i].x -= min_x;
      if(offsetY){
        block.xy[i].y += 2;
      }
    });
  }
  // 当前随机生成的方块，所有方向可能的落点情况
  const allDirCondition = () =>{
    const self = tetris;
    let curBlock = self.deepCopy(self.activeBlock);
    let curDir = curBlock.dir;
    let res = [];
    // 所有方向
    while(curDir!==curBlock.newDir){
      let curBlockX = self.deepCopy(curBlock);
      // 每次选旋转以后，将curBlock平移到最左边 
      moveBlockToLeft(curBlockX,2); 
      // x方向往右，直到碰壁，或者遇到dataArr中值为1的元素
      let checkX = true;
      while(checkX){
        // y方向往下掉落，直到碰壁，或者遇到dataArr中值为1的元素
        let checkY = true;
        let curBlockY = self.deepCopy(curBlockX); 
        while(checkY){
          checkY = curBlockY.xy.every(el =>{
            let yTag = true;
            let rowIndex = el.y + 1;
            let colIndex = el.x;
            if (el.y + 1 >= self.cols) {
              yTag = false;
            }else if(self.dataArr[rowIndex] && self.dataArr[rowIndex][colIndex] >= 1){
              yTag = false;
            }
            return yTag;
          });
          // self.drawBlocktest(curBlockY);
          // 可能的落点
          if(!checkY){
            res.push(curBlockY);
            // console.log('可能的落点');
            break;
          }
          curBlockY.xy.forEach((el,i) =>{
            curBlockY.xy[i].y += 1;
          });
        }
        checkX = curBlockX.xy.every(el =>{
          let xTag = true;
          //检测是否碰到dataArr中值为1的元素
          if (self.dataArr[el.y] && self.dataArr[el.y][el.x + 1] >= 1) {
            xTag = false;
            //检测碰壁
          }else if(el.x + 1 > self.rows - 1){
            xTag = false;
          }
          return xTag;
        });
        if(!checkX){
          break;
        }
        curBlockX.xy.forEach((el,i) =>{
          curBlockX.xy[i].x += 1;
        });
      }

      let activeBlockXY = curBlock.xy;
      //判断activeBlock比初始时下移了多少 左移或右移了多少
      //originBlock为初始的activeBlock
      let originBlockXY = self.blockData[curBlock.shape][curBlock.dir].xy;
      let offset_y = activeBlockXY[0].y - originBlockXY[0].y;
      let offset_x = activeBlockXY[0].x - originBlockXY[0].x;
      
      //下一个 nextBlock
      let nextBlock = self.deepCopy(self.blockData[curBlock.shape][curBlock.nextDir]);
      let nextBlockXY = nextBlock.xy;
      let rotateFlag = true;
      for (let i = 0, l = nextBlockXY.length; i < l; i++) {
        nextBlockXY[i].x += offset_x;
        nextBlockXY[i].y += offset_y;
        let rowIndex = nextBlockXY[i].y;
        let colIndex = nextBlockXY[i].x;
        if (colIndex >= self.rows || colIndex < 0 || (self.dataArr[rowIndex] && self.dataArr[rowIndex][colIndex] >= 1)) {
          rotateFlag = false;
          break;
        }
      }
      if(!rotateFlag){
        break;
      }
      curBlock = self.deepCopy(nextBlock);
      curBlock.newDir = curBlock.dir;
    }
    return res;
  }
  return evaluate(allDirCondition());
}

export default TetrisAi