### 状态模式
- 一个对象有状态变化
- 每次状态变化都会触发一个逻辑
- 不能总用if...else来控制
- 将状态变化和业务操作分离

### 场景
- 有限状态机（表示有限个状态以及在这些状态之间的转换和动作等行为）
 + 开源库 `javascript-state-machine`
- promise

### 设计原则
- 让状态对象和主体对象分离，状态的变化逻辑单独处理
- 符合开放封闭原则


#### 示例
```
class State {
  constructor(color) {
      this.color = color
  }
  handle(context) {
      console.log(`turn to ${this.color} light`)
      context.setState(this)
  }
}

class Context {
  constructor() {
      this.state = null
  }
  setState(state) {
      this.state = state
  }
  getState() {
      return this.state
  }
}

// 测试代码
let context = new Context()

let greed = new State('greed')
let yellow = new State('yellow')
let red = new State('red')

// 绿灯亮了
greed.handle(context)
console.log(context.getState())
// 黄灯亮了
yellow.handle(context)
console.log(context.getState())
// 红灯亮了
red.handle(context)
console.log(context.getState())

```

#### 状态机示例
```
import StateMachine from 'javascript-state-machine'
import $ from 'jquery'

// 初始化状态模型
const fsm = new StateMachine({
    init: '喜欢',
    transitions: [{
        name: 'like',
        from: '喜欢',
        to: '不喜欢'
    }, {
        name: 'unLike',
        from: '不喜欢',
        to: '喜欢'
    }],
    methods: {
        onLike: function() {
            console.log('喜欢成功')
            updateDom()
        },
        onUnLike: function() {
            console.log('不喜欢成功')
            updateDom()
        }
    }
})

const $btn = $('#btn1')

$btn.click(function() {
    if(fsm.is('喜欢')) {
        fsm.like()
    } else {
        fsm.unLike()
    }
})


function updateDom() {
    $btn.text(fsm.state)
}

updateDom()
```

#### 简单promise
- Promise三者状态：`pedding fullfilled rejected`
- `pedding->fullfilled / pedding->rejected` (不可逆向)

```
import StateMachine from 'javascript-state-machine'

var fsm = new StateMachine({
    init: 'pending',
    transitions: [
        {
            name: 'resolve',
            from: 'pending',
            to: 'fullfilled'
        },
        {
            name: 'reject',
            from: 'pending',
            to: 'rejected'
        }
    ],
    methods: {
        // 成功
        onResolve: function (state, data) {
            // 参数：state - 当前状态示例; data - fsm.resolve(xxx) 执行时传递过来的参数
            data.successList.forEach(fn => fn())
        },
        // 失败
        onReject: function (state, data) {
            // 参数：state - 当前状态示例; data - fsm.reject(xxx) 执行时传递过来的参数
            data.failList.forEach(fn => fn())
        }
    }
})

// 定义 Promise
class MyPromise {
    constructor(fn) {
        this.successList = []
        this.failList = []

        fn(() => {
            // resolve 函数
            fsm.resolve(this)
        }, () => {
            // reject 函数
            fsm.reject(this)
        })
    }
    then(successFn, failFn) {
        this.successList.push(successFn)
        this.failList.push(failFn)
    }
}

// 测试代码
function loadImg(src) {
    const promise = new MyPromise(function (resolve, reject) {
        var img = document.createElement('img')
        img.onload = function () {
            resolve(img)
        }
        img.onerror = function () {
            reject()
        }
        img.src = src
    })
    return promise
}
var src = 'http://www.imooc.com/static/img/index/logo_new.png'
var result = loadImg(src)
console.log(result)

result.then(function (img) {
    console.log('success 1')
}, function () {    
    console.log('failed 1')
})
result.then(function (img) {
    console.log('success 2')
}, function () {    
    console.log('failed 2')
})
```
