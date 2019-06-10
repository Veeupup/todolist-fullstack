# Todolist-backend

## 简介

使用 

* Typescript
* Node.js
* express

完成具有 RESTful 风格的 backend api。

其中数据库 ORM 使用 typeorm。

## 安装与运行

首先 clone ，安装相关的依赖：

```shell
git clone git@github.com:Veeupup/todolist-backend.git
cd todolist-backend
yarn install
```

本项目使用了Mysql，在 others/init.sql 中有初始化数据的 sql 文件。

使用这个 sql 文件初始化数据。

```shell
MariaDB []> source init.sql
```

然后在 .env 文件中修改自己本地数据的配置：

```
cp .env.template .env
```



## 脚本

使用 tsc 编译：

```
yarn run tsc
```

使用 nodemon 运行项目：

```
yarn run serve
```

构建项目:

```
yarn run build
```

构建之后运行项目：

```
yarn run dev
```

debug运行项目:

```
yarn run debug
```

