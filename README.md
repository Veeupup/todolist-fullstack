# Todolist

基于 typescript，使用React、Express、Apollo Graphql 完成的todolist。

前端使用React 与 Apollo client 搭建完成，能够使用 Apollo client 的 Graphql 接口完成与后端数据的交互。

后端使用 express ，完成具有 RESTful 风格的 CURD API。

除此之外，此项目具有一个中间层，集成 后端的 RESTful 风格 API，并且向外提供 Graphql的接口。

## 文件结构与简单说明

<pre>
├── README.md
├── todolist									# 使用js完成的纯React项目
├── todolist-apollo-server		# 中间层，集成RESTfulAPI，向外提供Graphql接口
├── todolist-backend					# 后端，向外提供 RESTful风格API
└── todolist-frontend					# 前端，使用React集成Apollo-client完成用户前端界面
</pre>

## 安装与本地测试
```shell
git clone https://github.com/Veeupup/todolist-fullstack
cd todolist-fullstack
```

每个部分安装与使用见相应文件夹的README。