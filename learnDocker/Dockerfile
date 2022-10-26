# Docker 顺序执行以下代码（没变的会缓存）
# 选择基础镜像（node + 操作系统）
FROM node:18-alpine3.15
# 容器工作目录
WORKDIR /xbai/
# 复制 package.json 至镜像内
COPY package.json .
# 运行命令
RUN npm install
# 复制所有代码文件至镜像内
COPY . .
# 暴漏端口号
EXPOSE 3000
# 终端运行命令
CMD ["npm", "run", "dev"]