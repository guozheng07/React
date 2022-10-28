来源：极客时间 -> 《现代 React Web 开发实战》

# fnm
因为 Node.js 的版本升级非常快，所以在安装时最好用一个 Node 版本管理工具，最主流的当然是 nvm，nvm 是基于 shell 开发的，在 macOS 和 Linux 上工作的很好，只可惜不支持 Windows。这里安装以 Rust 开发的、跨平台的 fnm。
## 地址
https://github.com/Schniz/fnm
## 方法
- fnm install 版本号：安装特定版本 node
- fnm list : 列出本地所有的node版本
- fnm list-remote：列出服务器上所有的 node 版本
- fnm uninstall 版本号：卸载特定版本
- fnm default 版本号：设置默认版本

# Kanban 项目
## 原型图
![image](https://user-images.githubusercontent.com/42236890/198245478-7cd26814-8ff9-4b0c-81bd-ad8a0887618d.png)
## 创建项目
npx create-react-app my-kanban（node 版本：v16.6.1）
## 改写项目
根据原型图，将原项目修改成“看板”项目  


