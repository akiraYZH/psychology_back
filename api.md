redis-server.exe redis.windows.conf
/api

登录
/login/login
首页
/user/userinfo
参数：account password
返回：role

基础设置
    基础设置
    角色管理
成员管理/member
/memberinfo 无参数 展示所有成员
/memberinfo（name||account） 查询  展示精确查询的成员
/memberdelet(account)   删除   根据account删除成员
/memberupdate(account)        
/memberadd 增加 （）
