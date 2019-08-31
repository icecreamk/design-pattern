### 装饰器模式
- 为对象添加新功能
- 不改变其原有的结构和功能

### 场景
- 日志统计，埋点

### 设计原则
- 现有对象和装饰器分离，两者独立存在
- 符合开放封闭原则

```
class Circle {
    draw() {
        console.log('画一个圆')
    }
}

class Decorator {
    constructor(circle) {
        this.circle = circle
    }

    draw() {
        this.circle.draw()
        this.setBorder(this.circle)
    }
    setBorder(circle) {
        console.log(circle, '添加边框')
    }
}

console.log('装饰之前---------------------')
const circle = new Circle()
circle.draw()

console.log('装饰之后---------------------')
const dec = new Decorator(circle)
dec.draw()
```
### es7装饰器（配置环境，安装插件）
> npm i babel-plugin-transform-decorators-legacy -D (安装之后在babelrc里的plugins里配置)

#### es7装饰器原理
```
// 原理
@decotator
class A {}
// =====等同于=====
class A {}
function decotator() {}
A = decotator(A) || A
```

#### 参数实例
```
// 不传参数
@testDec
class Demo {
}

function testDec(target) {
    target.isDec = true   
}

console.log(Demo.isDec)

// 传参数
@testDec2(false)
class Demo2 {
}

function testDec2(flag) {
    return function(target) {
        target.isDec = flag
    }   
}

console.log(Demo2.isDec)
```

### mixins实例
```
function mixins(...list) {
    return function(target) {
        Object.assign(target.prototype, ...list)
    }
}

const Foo = {
    foo() {
        console.log('foo')
    }
}

@mixins(Foo)
class MyClass {

}

const obj = new MyClass()
obj.foo()
```

### 装饰方法
```
function readonly(target, name, descriptor) {
    // {
    //     value: '',
    //     enumerable: false,
    //     configurable: true,
    //     writable: true
    // }
    descriptor.writable = false
    return descriptor
}

const Foo = {
    foo() {
        console.log('foo')
    }
}

class MyClass {
    constructor() {
        name: 'kkk'
    }
    
    @readonly
    sayName() {
        console.log(this.name)
    }
}

const obj = new MyClass()
obj.sayName()

// obj.sayName = function(){} // 此处报错，因为sayName只读
```

### 装饰内容
```
function log(target, name, descriptor) {

    const oldVal = descriptor.value

    descriptor.value = function() {
        console.log('arguments:', arguments)
        return oldVal.apply(this, arguments)
    }
    return descriptor
}

class Math {
    @log
    add(a, b) {
        return a + b
    }
}

const obj = new Math()
const result = obj.add(1,2)
console.log('res:', result)
```

### 第三方开源库，提供常用的装饰器（core-decorators）