<<<<<<< HEAD
# Phicomm encrypt config.data

# 环境要求

1. Nodejs > 6.2.0
1. Openssl, 并为openssl配置环境目录保证在Shell下输入openssl可用

# 使用方法

1. git clone <该项目地址>
1. cd k2_encrypt_config
1. npm install
1. node bin/www

# 恢复配置步骤

1. 进入K2路由管理页面
1. 点击高级设置
1. 找到备份与恢复选项
1. 点击恢复配置
1. 待进度条滚动到3/4处时注意观察灯的状态，待红灯持续闪烁时即可使用SSH或者SCP
1. SSH/SCP账号:root   密码: smallwolf

windows 用户可以使用迅雷下载openssl

地址: [http://downloads.sourceforge.net/gnuwin32/openssl-0.9.8h-1-setup.exe](http://downloads.sourceforge.net/gnuwin32/openssl-0.9.8h-1-setup.exe "点我下载")

=======
# Phicomm encrypt config.dat

生成K2的配置文件，可以用于开启SSH和SCP；

之前是可以自定义配置文件的压缩包，考虑到一切从简的风格，直接就把包固定了
>>>>>>> 437a9a59881726e6145f852bd61a238f4ec7a957
