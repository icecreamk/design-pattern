### 迭代器模式
- 顺序访问一个集合
- 使用者无需知道集合而内部结构（封装）
- 如果一个系统中，有序集合的数据类型已经有很多，就需要迭代器来统一实现遍历

### 场景
- jquery each
- ES6 Iterator

### ES6 Iterator
- 有序集合：Array Map Set String TypedArray arguments NodeList
- object不是有序集合，可以用Map代替
- ES6中有序集合数据都有`[Symbol.iterator]`（key）属性
- 其属性值是函数，函数执行返回一个迭代器
- 返回的迭代器就有next方法可顺序迭代子元素
- 通过运行Array.prototype[Symbol.iterator]测试是否存有iterator属性

### 设计原则
- 迭代器对象和目标对象分离
- 迭代器将使用者和目标对象隔离开
- 符合开放封闭原则


#### 示例
```
class Iterator {
  constructor(container) {
    this.list = container.list;
    this.index = 0;
  }

  next() {
    if (this.hasNext()) {
      return this.list[this.index++];
    }
    return null;
  }

  hasNext() {
    if (this.index >= this.list.length) {
      return false;
    } else {
      return true;
    }
  }
}
class Container {
  constructor(list) {
    this.list = list;
  }

  // 生成遍历器
  getIterator() {
    return new Iterator(this);
  }
}

const arr = [1,2,,43,15]
const con = new Container(arr)
const iterator = con.getIterator()
while(iterator.hasNext()) {
    console.log(iterator.next())
}
```

#### ES6 Iterator示例
```
function each(data) {
  // 生成遍历器
  let iterator = data[Symbol.iterator]()
  let item = {done: false}
  while(!item.done) {
    item = iterator.next() // {value:, done:bool}
    console.log(item.value)
  }
}

// Symbol.iterator并不需要人人都知道，也不需要都封装each方法
// 有 for...of 语法，访问有序集合，带有遍历器特性，for...in 访问数组
function each(data){
  for (let item of data) {
    console.log(item)
  }
}
```