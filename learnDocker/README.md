## ✏️ 简介
基于 B 站 **技术蛋老师** 的视频：[BV1MR4y1Q738](https://www.bilibili.com/video/BV1MR4y1Q738) 简单的解了下 docker 工作流、docker-compose

视频时长仅仅 20+ min，每一分钟都是干货，1.5 倍速 十几分钟就看完啦，力荐 ⭐⭐⭐

## :bookmark_tabs:​ Docker 安装与使用
> 注意：以下内容不在视频内！
### 安装

> 使用官方脚本安装

安装命令：
```bash
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
```
也可以使用国内 daocloud 一键安装命令：
```bash
curl -sSL https://get.daocloud.io/docker | sh
```
> 手动安装
#### 1. 卸载旧版本
Docker 较旧版本称为 docker 或 docker-engine，如果安装了这些程序，需要卸载它们以及相关的依赖项。
```bash
yum remove docker \
    docker-client \
    docker-client-latest \
    docker-common \
    docker-latest \
    docker-latest-logrotate \
    docker-logrotate \
    docker-engine
```
#### 2. 安装 Docker Engine-Community
在新主机上首次安装 Docker Engine-Community 之前，需要设置 Docker 仓库，之后可以从仓库安装和更新 Docker

1. 设置仓库
安装所需要的软件包。yum-utils 提供了 yum-confi-manager，并且 device mapper 存储驱动程序需要 device-mapper-persistent-data 和 lvm2。
    ```bash
    yum install -y yum-utils \
    device-mapper-persistent-data \
    lvm2
    ```
    使用以下命令来设置稳定的仓库。
    可以选择国内的一些源地址：
    - 阿里云源
    ```bash
    yum-config-manager \
    --add-repo \
    http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
    ```
    - 清华源
    ```bash
    yum-config-manager \
    --add-repo \
    https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/docker-ce.repo
    ```
2. 安装 Docker Engine-Community
**安装最新版本的 Docker Engine-Community 和 containerd**
    ```bash
    yum install docker-ce docker-ce-cli containerd.io
    ```
    Docker 安装完默认未启动。并且已经创建好 docker 用户组，但该用户组下没有用户
    **安装特定版本的 Docker Engine-Community 和 containerd**
    1. 列出并排序您存储库中可用的版本。此示例按版本号（从高到低）对结果进行排序。
    ```bash
    yum list docker-ce --showduplicates | sort -r
    docker-ce.x86_64  3:20.10.9-3.el8                     docker-ce-stable
    docker-ce.x86_64  3:20.10.8-3.el8                     docker-ce-stable
    docker-ce.x86_64  3:20.10.7-3.el8                     docker-ce-stable
    ```
    2. 通过其完整的软件包名称安装特定版本，该软件包名称是软件包名称（docker-ce）加上版本字符串（第二列），从第一个冒号（:）一直到第一个连字符，并用连字符（-）分隔。例如：docker-ce-18.09.1。
    ```bash
    yum install docker-ce-<VERSION_STRING> docker-ce-cli-<VERSION_STRING> containerd.io
    ```
#### 3. 启动 Docker
```bash
systemctl start docker
```
### 卸载
1. 删除安装包：
```bash
yum remove docker-ce
```
2. 删除镜像、容器、配置文件等内容：
```bash
rm -rf /var/lib/docker
```
### 使用
#### 1. docker 安装 mysql8
1. 拉取镜像
> 若不指定版本，则拉取最新版本：latest
```bash
docker pull mysql:8.0.22
```
2. 创建 volumes 文件映射
```bash
mkdir /home/Xbai-hang/docker/mysql/mysql-files
```
3. 创建并运行容器
```bash
docker run -d \
--restart=always \
--name mysql \
-v /home/Xbai-hang/docker/mysql/mysql-files:/var/lib/mysql-files \
-v /home/Xbai-hang/docker/mysql/data:/var/lib/mysql \
-v /home/Xbai-hang/docker/mysql/conf:/etc/mysql \
-v /home/Xbai-hang/docker/mysql/log:/var/log/mysql \
-p 3306:3306 \
-e TZ=Asia/Shanghai \
-e MYSQL_ROOT_PASSWORD=123456 \
mysql:8.0.22 \
--character-set-server=utf8mb4 \
--collation-server=utf8mb4_general_ci \
--default-authentication-plugin=mysql_native_password
```
4. 关闭容器
```bash
docker stop mysql
```
5. 开启容器
```bash
docker start mysql
```
6. 删除容器
> container 可以省略，此外若要强制删除运行中的容器，需要加上 -f 选项，若要一同删除 volumns 映射文件，还需加上 -v 选项，例如：
`docker rm -fv mysql`
```bash
# 注：mysql 是容器名字，也可以用容器 id
docker container rm mysql
```
7. 进入容器内部
```bash
docker exec -it mysql bash
```
8. 连接 mysql 更新密码
> 进入容器内部然后连接 mysql
```bash
#登录
mysql -u root -p 123456 
#切换数据库
use mysql
#修改
ALTER USER 'root'@'%' IDENTIFIED BY 'admin' PASSWORD EXPIRE NEVER;
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'admin' ;
#查看
select host,user from user;
#刷新
flush privileges;
```
9. 退出容器
```bash
# exit container
CTRL + Q + P
# 建议使用 CTRL + P + Q 的方式，使用 exit 退出容器时会关闭容器
```
10. 查看本地所有镜像
```bash
docker images
```
11. 删除本地镜像
```bash
docker rmi mysql
```

#### 2. docker 安装 redis
1. 从仓库查询 redis
```bash
docker search redis
```
2. 拉去最新镜像
```bash
docker pull redis
```
3. 查看本地镜像
```bash
docker images
```
4. 运行容器
```bash
docker run \
-p 6379:6379 \
--name redis \
-v /home/Xbai-hang/docker/redis/redis.conf:/etc/redis/redis.conf \
-v /home/Xbai-hang/docker/redis/data:/data \
-d redis \
redis-server /etc/redis/redis.conf \
--appendonly yes
# redis-server /home/Xbai-hang/docker/redis/redis.conf \
#--privileged=true \
```
5. 测试连接
```bash
docker exec -it redis bash
redis-cli -u
```
#### :beetle:​踩坑记录

1. redis 镜像默认不在容器内创建 redis.conf 的配置文件，需要修改配置时要么在启动时命令行配置一次，要么需要自行创建配置文件挂载。

2. 创建映射文件在：/home/Xbai-hang/docker/redis

   需要创建 /data 以及 redis.conf 两个映射

3. 需要修改配置文件

   1. 注释 bind 127.0.0.1 那一部分，这个限制 redis 只能本机访问
   2. 修改 **protected-mode no**  默认为 yes，开启保护模式，只能本地访问
   3. **appendonly yes** 默认为 no，redis 持久化，可以不开启

4. 因为我把配置文件统一放在了用户 Xbai-hang 下（`/home/Xbai-hang/docker/redis`），启动时发现无法启动 redis，查看 docker logs redis 日志发现：**Fatal error, can't open config file '/home/Xbai-hang/docker/redis/redis.conf': No such file or directory**。猜测应该是权限不足导致的，于是运行容器时加上了 `--privileged=true` ，发现还是不行，经过百度后找不到问题答案，于是自己解决了下：

5. 仔细分析后发现 redis-server 需要找的文件是在容器内部的配置文件，而我制定了我主机位置的 redis.conf ，redis在容器内部确实找不到文件，于是就报错了。改为 `/etc/redis/redis.conf` 即可

docker 配置好文件映射后，修改本机的 redis 配置文件，只需要重启 redis 服务就可以同步修改容器内的配置。
