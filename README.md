# README

Vue多页面, 界面大致如下

![](https://luo0412.oss-cn-hangzhou.aliyuncs.com/1647952253742-hDMCwm8BFyrw.png)

---

# 代办列表

- 配置ts-loader @todo

# 常见问题 @faq

- ERROR in Conflict: Multiple assets emit different content to the same filename index.html @fix

```
删除public/index.html
会与template/index.html 冲突
```

![](https://luo0412.oss-cn-hangzhou.aliyuncs.com/1647952388493-mTd6KbaNPab6.png)

- Uncaught TypeError: Cannot read properties of undefined (reading 'use') @fix

```
低版本不适配vue3
升级antd-design-vue的版本

===
"ant-design-vue": "^3.1.0-rc.2",
```

![](https://luo0412.oss-cn-hangzhou.aliyuncs.com/1648014768366-wMbeffJQS3Fd.png)
