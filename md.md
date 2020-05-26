

基础设置
/api/user/userDetail
请求方式get
<!-- 参数 roles='admin doctor worker' -->
参数:account
{
    code:1,
    msg:"成功获取"，
    data:{
        roles:'admin'，
        account:'admin',
        password:'123456',
        name:'张三',
        birthday'123454351'，
        phone:'138xxxxxxx',
        avatar:"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
    }
}
参数 roles='visitor '
{
    code:1,
    msg:"成功获取"，
    data:{
        roles:'visitor'，
        account:'admin',
        password:'123456',
        name:'张三',
        birthday'123454351'，
        phone:'138xxxxxxx',
        avatar:"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"

        is_marry:'1',
        job:'driver',
        urgent_name:'陈一',
        urgent_relation:'爸爸',
        urgent_phone:'130xxxxxxxx',
        visitor_id:'1'
    }
}

成员修改
/api/user/userChange
请求方式post
参数：account
可选：phone， password， name， birthday， gender（1男，2女），avatar，justice_id, parent_id, is_marry,education, job,urgent_name, urgent_relation,urgent_phone,roles

成员删除
/api/user/userDel
请求方式:post
参数：account
{
    code:1,
    msg:'成功修改',
    data:'success'
}
{
    code:0,
    msg:'修改失败'，
    data:'fail'
}


excel 多次插入
/api/user/multiAdd
请求方式：post，
参数：exList,
型式：
{
	"exList":[
		{"account":"visitor14", "password":"123456", "roles":"visitor", "name":"john", "birthday":"1234567890123","gender":1},
		{"account":"visitor15", "password":"123456", "roles":"visitor"},
		{"account":"visitor16", "password":"123456", "roles":"visitor"},
		{"account":"visitor17", "password":"123456", "roles":"visitor"}
		]
}
返回
{
    code:1,
    msg:'成功修改'
}
{
    "code": 0,
    "msg": "操作错误"
}

成员注册
/api/user/register
请求方式:post
必填参数:roles, account, password
{
    code:1,
    msg:'成功注册',
    data:{
        "insertId": 7
    }
}
{
    code:0,
    msg:'注册失败'
}

成员管理(查询)
/api/user/userList
请求方式get
可不带参数时：查询所有, num_in_page=10, page_now=1
带参数：roles ||
{
    code:1,
    mas:'成功获取',
    data:{
        is_success:true,
        page_total:3,
        page_now:1,
        num_in_page:10,
        data:[
            {
                roles：'admin',
                account:'',
                name:'张三',
                gender:'1',
            },
            {
                roles：'editor',
                account:'',
                name:'李四',
                gender:'2',
            },
            {
                roles：'doctor',
                account:''
                name:'王二',
                gender:'2',
            },
        ]
    }
    
}

{
    code:1,
    mas:'成功获取',
    data:{
        is_success:false
    }
    
}
带参数时：account模糊查询 || roles精确查找
{
    code:1,
    msg:'成功获取',
    userlist:[
         {
        roles：'doctor',
        account:''
        name:'王二',
        gender:'2'
    }]
}





删除成员
/api/user/userDel
请求方式post,
参数：account
{
    "code": 1,
    "msg": "成功删除"
}


获得预约列表（通过redis拿role和id）
/api/reservation/getList
请求方式：get，
参数:to_id(咨询师id)
{
    "code": 1,
    "msg": "成功操作",
    "data": {
        "2020-3-28": [
            {
                "id": 5,
                "from_id": 7,
                "from_name": null,
                "to_id": 2,
                "to_name": "editor",
                "method":1,
                "start_time": "1588035600000",
                "end_time": "1588042800",
                "status": 1 
            }
        ],
        "2020-3-20": [
            {
                "id": 5,
                "from_id": 7,
                "from_name": null,
                "to_id": 2,
                "to_name": "editor",
                "method":1,
                "start_time": "1587348000000",
                "end_time": "1587355200",
                "status": 2
            }
        ]
    }
}




增加预约
/api/reservation/addReservation
方法：post
参数：from_id， to_id，start_time, type_name, method(1为来访， 2为线上)
{
    "code": 1,
    "msg": "成功操作"
}


修改预约
/api/reservation/modify
方法：post
参数：id(预约id)
可选：to_id，from_id,start_time,status， method
{
    "code": 1,
    "msg": "成功操作"
}

删除预约
/api/reservation/del
方法：post
参数：id(预约id)
{
    "code": 1,
    "msg": "成功操作"
}


增加预约类型种类
/api/reservation_type/add
方法：post
参数：type_name, description
{
    code:1,
    msg:'成功操作',
    data:{
        "insertId": 7
    }
}


获得预约类型列表
/api/reservation_type/getList
方法：get
参数：无
{
    "code": 1,
    "msg": "成功操作",
    "data": [
        {
            "id": 1,
            "type_name": "test1"
        }
    ]
}


修改预约类型名称
/api/reservation_type/update
方法：post
参数：id， type_name, description
{
    code:1,
    msg:'成功操作'
}


删除预约类型
/api//reservation_type/del
方法：post
参数：id
{
    code:1,
    msg:'成功操作'
}


增加题目
/api/exercise/add
方法：post
参数：
{
	"title":"test",
	"option_obj":["问题一","问题二","问题三","问题四"],
	"score_obj":["4","3","2","1"],
	"type_id":1
}
返回：
{
    "code": 1,
    "msg": "成功操作"
}


execl表插入
/api/exercise/multiAdd
方法：post
参数
{
	"exList":[
    {
      "title":"test",
      "option_obj":["option1","option2","option3","option4"],
      "score_obj":["4","3","2","1"],
      "type_id":1},
	  {
      "title":"test",
      "option_obj":["option1","option2","option3","option4"],
      "score_obj":["4","3","2","1"],
      "type_id":1
    }]
}
返回：
{
    "code": 1,
    "msg": "成功操作"
}


获得题目列表
/api/exercise/getList
方法：post
参数：可选（type_id:精准查询, title:模糊查询， page_now, num_in_page）
{
    "code": 1,
    "msg": "成功操作",
    "data": {
        "is_success": true,
        "page_total": 3,
        "page_now": 1,
        "num_in_page": 1,
        "list": [
            {
                "id": 2,
                "title": "test",
                "option_score_obj": [
                    {
                        "question": "选项1",
                        "score": "4"
                    },
                    {
                        "question": "选项2",
                        "score": "3"
                    },
                    {
                        "question": "选项3",
                        "score": "2"
                    },
                    {
                        "question": "选项4",
                        "score": "1"
                    }
                ],
                "mold_id": 1,
                "type_id": 1
            }
        ]
    }
}


修改题目
/api/exercise/update
方法：post
参数：
{
    "id":"2",
	"title":"test",
	"option_obj":["问题一","问题二","问题三","问题四"],
	"score_obj":["4","3","2","1"],
	"type_id":1
}
{
    "code": 1,
    "msg": "成功操作"
}

删除题目
/api/exercise/del
方法：post
参数：id
{
    "code": 1,
    "msg": "成功操作"
}



增加试卷
/api/paper/add
方式：post
参数：
{
	"title":"试卷一",
	"exercises_json":["1","2","3","4","5"] //题目id
    "worker_id":"1" //创建人id
}
返回
{
    "code": 1,
    "msg": "成功操作"
}



获得试卷列表
api/paper/getList
方法：get
参数：无
{
    "code": 1,
    "msg": "成功操作",
    "data": [
        {
            "id": 1,
            "title": "试卷一",
            "worker_id": 2,
            "name": "editor",
            "time_stamp": "1588734199298"
        }
    ]
}


获得试卷详情(含分数， 用于后台)
api/paper/detailAdmin
方法：get
参数：id
{
    "code": 1,
    "msg": "成功操作",
    "data": [
        {
            "id": 1,
            "title": "试卷一",
            "list": [
                [
                    {
                        "id": 3,
                        "title": "test",
                        "option_score_obj": [
                            {
                                "question": "问题一",
                                "score": "4"
                            },
                            {
                                "question": "问题二",
                                "score": "3"
                            },
                            {
                                "question": "问题三",
                                "score": "2"
                            },
                            {
                                "question": "问题四",
                                "score": "1"
                            }
                        ],
                        "mold_id": 1,
                        "type_id": 1
                    }
                ],
                [
                    {
                        "id": 4,
                        "title": "test2",
                        "option_score_obj": [
                            {
                                "question": "问题一",
                                "score": "4"
                            },
                            {
                                "question": "问题二",
                                "score": "3"
                            },
                            {
                                "question": "问题三",
                                "score": "2"
                            },
                            {
                                "question": "问题四",
                                "score": "1"
                            }
                        ],
                        "mold_id": 1,
                        "type_id": 1
                    }
                ],
                [
                    {
                        "id": 5,
                        "title": "test",
                        "option_score_obj": [
                            {
                                "question": "option1",
                                "score": "4"
                            },
                            {
                                "question": "option2",
                                "score": "3"
                            },
                            {
                                "question": "option3",
                                "score": "2"
                            },
                            {
                                "question": "option4",
                                "score": "1"
                            }
                        ],
                        "mold_id": 1,
                        "type_id": 1
                    }
                ]
            ]
        }
    ]
}


获得试卷详情(含分数， 用于做题)
api/paper/detail
方法：get
参数：id
{
    "code": 1,
    "msg": "成功操作",
    "data": [
        {
            "id": 1,
            "title": "试卷一",
            "list": [
                [
                    {
                        "id": 3,
                        "title": "test",
                        "option_obj": [
                            "问题一",
                            "问题二",
                            "问题三",
                            "问题四"
                        ],
                        "mold_id": 1,
                        "type_id": 1
                    }
                ],
                [
                    {
                        "id": 4,
                        "title": "test2",
                        "option_obj": [
                            "问题一",
                            "问题二",
                            "问题三",
                            "问题四"
                        ],
                        "mold_id": 1,
                        "type_id": 1
                    }
                ],
                [
                    {
                        "id": 5,
                        "title": "test",
                        "option_obj": [
                            "option1",
                            "option2",
                            "option3",
                            "option4"
                        ],
                        "mold_id": 1,
                        "type_id": 1
                    }
                ]
            ]
        }
    ]
}

试卷更新
api/paper/update
方法：post，
参数：
{
	"id":1,
	"title":"试卷一",
	"exercises_json":["6","2","3","4","5"]
}
返回：
{
    "code": 1,
    "msg": "成功操作"
}   



试卷删除
api/paper/del
方法：post，
参数：
{
	"id":1
}
返回：
{
    "code": 1,
    "msg": "成功操作"
} 



增加记录
/api/record/add
方法：post
参数
{
	"title":"试卷",
	"operator_id":"3",
	"worker_id":"2",
	"type_id":"1",//1为试卷, 2为访谈记录
	"paper_exercises":[
		{"question":"问题1", "anwser":"a.选项1","score":1, "type_id":2}, 
        {"question":"问题1", "anwser":"b.选项1","score":4, "type_id":2},
        {"question":"问题1", "anwser":"c.选项1","score":2, "type_id":3},
        {"question":"问题1", "anwser":"d.选项1","score":1, "type_id":3},
        {"question":"问题1", "anwser":"a.选项1","score":3, "type_id":4}
    ]
}
返回
{
    "code": 1,
    "msg": "成功操作"
}

增加记录
增加问卷记录
/api/record/add
方法：post
参数
{
  "title": "试卷",
  "operator_id": "3",
  "worker_id": "2",
  "type_id": "1",
  "paper_exercises": [
    {
      "question": "问题1",
      "anwserIndex": 1,
      "score": 1,
      "type_id": 2,
      "options": [
        { "option": "选项1", "score": "4" },
        { "option": "选项2", "score": "3" },
        { "option": "选项3", "score": "2" },
        { "option": "选项4", "score": "1" }
      ]
    },
    {
      "question":"问题2",
      "anwserIndex":0,
      "score":1,
      "type_id":2,
      "options":[
        { "option": "选项1", "score": "4" },
        { "option": "选项2", "score": "3" },
        { "option": "选项3", "score": "2" },
        {" option": "选项4", "score": "1" }
      ]
    }
  ]
}
返回
{
    "code": 1,
    "msg": "成功操作"
}

增加面谈记录
/api/record/add
方法：post
参数
{
	"operator_id":"3",
	"worker_id":"2",
	"type_id":"2",//1为试卷, 2为访谈记录
	"content":"这次访谈很有成效， 继续努力。"
}
返回
{
    "code": 1,
    "msg": "成功操作"
}


获得已经做记录的用户列表
api/record/getUserList
方法：get
参数： keyword（模糊查询）
{
    "code": 1,
    "msg": "成功操作",
    "data": [
        {
            "operator_id": 3,
            "account": "worker",
            "name": "worker"
        }
    ]
}

获得某个用户的记录
api/record/getRecords
方法： get
参数：operator_id
{
    "code": 1,
    "msg": "成功操作",
    "data": [
        {
            "id": 5,
            "operator_id": 3,
            "account": "worker",
            "name": "worker",
            "worker_id": 2,
            "work_name": "editor",
            "time_stamp": "1588149221180",
            "type_id": 2,
            "content": "123",
            "score": null,
            "title": null,
            "paper_evaluation": null,
            "paper_exercises": null
        },
        {
            "id": 7,
            "operator_id": 3,
            "account": "worker",
            "name": "worker",
            "worker_id": 2,
            "work_name": "editor",
            "time_stamp": "1588147199987",
            "type_id": 1,
            "content": null,
            "score": "2",
            "title": "试卷",
            "paper_evaluation": {
                "scoreTotal": 2,
                "general": "您在量表上的总得分较低，表明您的心理健康状况良好。主要表现为：您很少因心理原因出现身体不适感；能积极面对社会和生活中的各种问题，信任他人，对人友善；一般没有过于焦虑、悲伤等情况。",
                "general_advice": "您拥有比较健康的心态和良好的情绪状态，能够较好地处理生活中的挫折和压力。能很好地适应工作、社会生活，并从中获得满足和快乐，个人价值感和幸福感较高。希望您继续保持这种积极的心态和良好的行为方式。",
                "list": [
                    {
                        "name": "躯体化",
                        "status": "表示你的生活处于规律状态中，睡眠和饮食情况都很好。",
                        "advice": "您能较好地应对社会生活中的压力，能调整自己的心态，能够有效防止心理因素躯体化。建议您能够保持积极、乐观的生活态度。",
                        "scoreAvg": "1.00"
                    }
                ]
            },
            "paper_exercises": [
                {
                    "question": "问题1",
                    "anwserIndex": 1,
                    "score": 1,
                    "type_id": 2,
                    "options": [
                        {
                            "option": "选项1",
                            "score": "4"
                        },
                        {
                            "option": "选项2",
                            "score": "3"
                        },
                        {
                            "option": "选项3",
                            "score": "2"
                        },
                        {
                            "option": "选项4",
                            "score": "1"
                        }
                    ]
                },
                {
                    "question": "问题2",
                    "anwserIndex": 0,
                    "score": 1,
                    "type_id": 2,
                    "options": [
                        {
                            "option": "选项1",
                            "score": "4"
                        },
                        {
                            "option": "选项2",
                            "score": "3"
                        },
                        {
                            "option": "选项3",
                            "score": "2"
                        },
                        {
                            " option": "选项4",
                            "score": "1"
                        }
                    ]
                }
            ]
        },
        {
            "id": 8,
            "operator_id": 3,
            "account": "worker",
            "name": "worker",
            "worker_id": 2,
            "work_name": "editor",
            "time_stamp": "1588161965326",
            "type_id": 1,
            "content": null,
            "score": "2",
            "title": "试卷",
            "paper_evaluation": {
                "scoreTotal": 2,
                "general": "您在量表上的总得分较低，表明您的心理健康状况良好。主要表现为：您很少因心理原因出现身体不适感；能积极面对社会和生活中的各种问题，信任他人，对人友善；一般没有过于焦虑、悲伤等情况。",
                "general_advice": "您拥有比较健康的心态和良好的情绪状态，能够较好地处理生活中的挫折和压力。能很好地适应工作、社会生活，并从中获得满足和快乐，个人价值感和幸福感较高。希望您继续保持这种积极的心态和良好的行为方式。",
                "list": [
                    {
                        "name": "躯体化",
                        "status": "表示你的生活处于规律状态中，睡眠和饮食情况都很好。",
                        "advice": "您能较好地应对社会生活中的压力，能调整自己的心态，能够有效防止心理因素躯体化。建议您能够保持积极、乐观的生活态度。",
                        "scoreAvg": "1.00"
                    }
                ]
            },
            "paper_exercises": [
                {
                    "question": "问题1",
                    "anwserIndex": 1,
                    "score": 1,
                    "type_id": 2,
                    "options": [
                        {
                            "option": "选项1",
                            "score": "4"
                        },
                        {
                            "option": "选项2",
                            "score": "3"
                        },
                        {
                            "option": "选项3",
                            "score": "2"
                        },
                        {
                            "option": "选项4",
                            "score": "1"
                        }
                    ]
                },
                {
                    "question": "问题2",
                    "anwserIndex": 0,
                    "score": 1,
                    "type_id": 2,
                    "options": [
                        {
                            "option": "选项1",
                            "score": "4"
                        },
                        {
                            "option": "选项2",
                            "score": "3"
                        },
                        {
                            "option": "选项3",
                            "score": "2"
                        },
                        {
                            " option": "选项4",
                            "score": "1"
                        }
                    ]
                }
            ]
        }
    ]
}

获得心理问题类型
/api/type/getList
方法：get
参数无
{
    "code": 1,
    "msg": "成功操作",
    "data": [
        {
            "id": 2,
            "name": "躯体化"
        },
        {
            "id": 3,
            "name": "强迫症状"
        },
        {
            "id": 4,
            "name": "人际关系敏感"
        },
        {
            "id": 5,
            "name": "抑郁"
        },
        {
            "id": 6,
            "name": "焦虑"
        },
        {
            "id": 7,
            "name": "敌对"
        },
        {
            "id": 8,
            "name": "恐怖"
        },
        {
            "id": 9,
            "name": "偏执"
        },
        {
            "id": 10,
            "name": "精神病性"
        },
        {
            "id": 11,
            "name": "其他"
        }
    ]
}