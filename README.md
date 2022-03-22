# README

Vue多页面

# 常见问题 @faq

- 支持js单文件的入口, 代码写字符串里 @todo

```js
import Vue from 'vue'

const App = {
  template: `
<div>
      <span>count is {{ count }}</span>
      <span>plusOne is {{ plusOne }}</span>
      <button type="primary" @click="increment">count++</button>
</div>
  `,
  data() {
    return {
      count: 0,
    }
  },
  computed: {
    plusOne: function () {
      return this.count + 1
    },
  },
  methods: {
    increment() {
      this.count++
    },
  },
}

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App)
})
```


