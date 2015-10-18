# Mircoblog
Node.js开发指南 Microblog程序重制

Node : v0.12.2
Express : v4.12.4


# 效果
![效果](http://7pun7p.com1.z0.glb.clouddn.com/blog/microblog.png)

# 如何运行
首先保证你本地的mongodb已经在运行了,如
```
$ mongod --dbpath Data/db
```
然后确保你的Node版本在v0.12.2
```
$ nvm install 0.12.2   # 如果你没有安装该版本的话
$ nvm use 0.12.2
```
然后克隆该项目，安装依赖
```
$ git clone git@github.com:rdmclin2/Mircoblog.git
$ cd Mircoblog
$ npm install
```
安装完成后通过
```
$ node ./bin/www
```
在浏览器中通过`localhost:3000`查看效果