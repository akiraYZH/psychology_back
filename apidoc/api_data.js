define({ "api": [
  {
    "type": "Post",
    "url": "/api/distribution/add",
    "title": "分配试卷",
    "group": "Distribution",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>用户id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "distributor_id",
            "description": "<p>分发人id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "paper_id",
            "description": "<p>试卷id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n code:1,\n msg:'成功操作'\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/distribution.js",
    "groupTitle": "Distribution",
    "name": "PostApiDistributionAdd"
  },
  {
    "type": "Post",
    "url": "/api/distribution/del",
    "title": "删除分配",
    "group": "Distribution",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>分配id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "   {\n    \"code\": 1,\n    \"msg\": \"成功操作\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/distribution.js",
    "groupTitle": "Distribution",
    "name": "PostApiDistributionDel"
  },
  {
    "type": "Post",
    "url": "/api/distribution/getList",
    "title": "获得分配试卷列表",
    "group": "Distribution",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "list",
            "description": "<p>分配数组</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>用户id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "distributor_id",
            "description": "<p>分发人id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "paper_id",
            "description": "<p>试卷id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "参数模版",
          "content": "{\n\t\"list\":[\n\t\t{\n\t\t\t\"user_id\":6,\n\t\t\t\"distributor_id\":2,\n\t\t\t\"paper_id\":2\n\t\t},\n\t\t{\n\t\t\t\"user_id\":6,\n\t\t\t\"distributor_id\":2,\n\t\t\t\"paper_id\":2\n\t\t},\n\t\t{\n\t\t\t\"user_id\":6,\n\t\t\t\"distributor_id\":2,\n\t\t\t\"paper_id\":2\n\t\t}\n\t\t]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n code:1,\n msg:'成功操作'\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/distribution.js",
    "groupTitle": "Distribution",
    "name": "PostApiDistributionGetlist"
  },
  {
    "type": "Post",
    "url": "/api/distribution/getList",
    "title": "获得分配试卷列表",
    "group": "Distribution",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>(可选)精确搜索：用户id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "distributor_id",
            "description": "<p>(可选)精确搜索：分发者id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "paper_id",
            "description": "<p>(可选)精确搜索：试卷id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "state",
            "description": "<p>(可选)精确搜索：1:完成， 0：未完成</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_account",
            "description": "<p>(可选)模糊搜索：用户账号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_name",
            "description": "<p>(可选)模糊搜索：用户名称</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page_now",
            "description": "<p>(可选)现处页</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "num_in_page",
            "description": "<p>(可选)每页个数</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "   {\n    \"code\": 1,\n    \"msg\": \"成功操作\",\n    \"data\": {\n        \"is_success\": true,\n        \"page_total\": 9,\n        \"page_now\": 1,\n        \"num_in_page\": 2,\n        \"list\": [\n            {\n                \"id\": 1,\n                \"user_id\": 6,\n                \"user_account\": \"visitor1\",\n                \"user_name\": \"visitor\",\n                \"distributor_id\": 2,\n                \"distributor_name\": \"editor\",\n                \"time_stamp\": \"1589427873139\",\n                \"state\": 0\n            },\n            {\n                \"id\": 2,\n                \"user_id\": 6,\n                \"user_account\": \"visitor1\",\n                \"user_name\": \"visitor\",\n                \"distributor_id\": 2,\n                \"distributor_name\": \"editor\",\n                \"time_stamp\": \"1589427900477\",\n                \"state\": 0\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/distribution.js",
    "groupTitle": "Distribution",
    "name": "PostApiDistributionGetlist"
  },
  {
    "type": "Post",
    "url": "/api/distribution/multiAdd",
    "title": "批量分配试卷",
    "group": "Distribution",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "list",
            "description": "<p>分配数组</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>用户id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "distributor_id",
            "description": "<p>分发人id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "paper_id",
            "description": "<p>试卷id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "参数模版",
          "content": "{\n\t\"list\":[\n\t\t{\n\t\t\t\"user_id\":6,\n\t\t\t\"distributor_id\":2,\n\t\t\t\"paper_id\":2\n\t\t},\n\t\t{\n\t\t\t\"user_id\":6,\n\t\t\t\"distributor_id\":2,\n\t\t\t\"paper_id\":2\n\t\t},\n\t\t{\n\t\t\t\"user_id\":6,\n\t\t\t\"distributor_id\":2,\n\t\t\t\"paper_id\":2\n\t\t}\n\t\t]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n code:1,\n msg:'成功操作'\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/distribution.js",
    "groupTitle": "Distribution",
    "name": "PostApiDistributionMultiadd"
  },
  {
    "type": "Post",
    "url": "/api/distribution/update",
    "title": "获得分配",
    "group": "Distribution",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>分配id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>用户id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "distributor_id",
            "description": "<p>分发者id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "paper_id",
            "description": "<p>试卷id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "state",
            "description": "<p>1:完成， 0：未完成</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "   {\n    \"code\": 1,\n    \"msg\": \"成功操作\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/distribution.js",
    "groupTitle": "Distribution",
    "name": "PostApiDistributionUpdate"
  },
  {
    "type": "Post",
    "url": "/api/exercise/add",
    "title": "增加题目",
    "group": "Exercise",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>问题题目</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "option_obj",
            "description": "<p>选项数组</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "score_obj",
            "description": "<p>分值数组</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "type_id",
            "description": "<p>问题类型：2躯体化，3强迫症状，4人际关系敏感，5抑郁，6焦虑，7敌对，8恐怖，9偏执，10精神病性，11其他</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "参数模版",
          "content": "{\n \"title\":\"test\",\n \"option_obj\":[\"选项一\",\"选项二\",\"选项三\",\"选项四\"],\n \"score_obj\":[\"4\",\"3\",\"2\",\"1\"],\n \"type_id\":1\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n code:1,\n msg:'成功操作'\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/exercise.js",
    "groupTitle": "Exercise",
    "name": "PostApiExerciseAdd"
  },
  {
    "type": "Post",
    "url": "/api/exercise/del",
    "title": "删除题目",
    "group": "Exercise",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>问题id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n code:1,\n msg:'成功操作'\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/exercise.js",
    "groupTitle": "Exercise",
    "name": "PostApiExerciseDel"
  },
  {
    "type": "Post",
    "url": "/api/exercise/getList",
    "title": "获得题目列表",
    "group": "Exercise",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "type_id",
            "description": "<p>（可选）题目类型id--精确查询：2躯体化，3强迫症状，4人际关系敏感，5抑郁，6焦虑，7敌对，8恐怖，9偏执，10精神病性，11其他</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>（可选）问题题目--模糊查询</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page_now",
            "description": "<p>（可选）现处页数</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "num_in_page",
            "description": "<p>（可选）每页个数</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "   {\n    \"code\": 1,\n    \"msg\": \"成功操作\",\n    \"data\": {\n        \"is_success\": true,\n        \"page_total\": 3,\n        \"page_now\": 1,\n        \"num_in_page\": 1,\n        \"list\": [\n            {\n                \"id\": 2,\n                \"title\": \"test\",\n                \"option_score_obj\": [\n                    {\n                        \"question\": \"选项1\",\n                        \"score\": \"4\"\n                    },\n                    {\n                        \"question\": \"选项2\",\n                        \"score\": \"3\"\n                    },\n                    {\n                        \"question\": \"选项3\",\n                        \"score\": \"2\"\n                    },\n                    {\n                        \"question\": \"选项4\",\n                        \"score\": \"1\"\n                    }\n                ],\n                \"mold_id\": 1,\n                \"type_id\": 1\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/exercise.js",
    "groupTitle": "Exercise",
    "name": "PostApiExerciseGetlist"
  },
  {
    "type": "Post",
    "url": "/api/exercise/multiAdd",
    "title": "增加多条题目（excel）",
    "group": "Exercise",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "exList",
            "description": "<p>问题列表</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>问题题目</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "option_obj",
            "description": "<p>选项数组</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "score_obj",
            "description": "<p>分值数组</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "type_id",
            "description": "<p>问题类型：2躯体化，3强迫症状，4人际关系敏感，5抑郁，6焦虑，7敌对，8恐怖，9偏执，10精神病性，11其他</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "参数模版",
          "content": "{\n   \"exList\":[\n     {\n       \"title\":\"test\",\n       \"option_obj\":[\"option1\",\"option2\",\"option3\",\"option4\"],\n       \"score_obj\":[\"4\",\"3\",\"2\",\"1\"],\n       \"type_id\":1},\n     {\n       \"title\":\"test\",\n       \"option_obj\":[\"option1\",\"option2\",\"option3\",\"option4\"],\n       \"score_obj\":[\"4\",\"3\",\"2\",\"1\"],\n       \"type_id\":1\n     }]\n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n code:1,\n msg:'成功操作'\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/exercise.js",
    "groupTitle": "Exercise",
    "name": "PostApiExerciseMultiadd"
  },
  {
    "type": "Post",
    "url": "/api/exercise/update",
    "title": "修改题目",
    "group": "Exercise",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>问题id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>问题题目</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "option_obj",
            "description": "<p>选项数组</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "score_obj",
            "description": "<p>分值数组</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "type_id",
            "description": "<p>问题类型：2躯体化，3强迫症状，4人际关系敏感，5抑郁，6焦虑，7敌对，8恐怖，9偏执，10精神病性，11其他</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "参数模版",
          "content": "   {\n    \"id\":\"2\",\n\t\"title\":\"test\",\n\t\"option_obj\":[\"问题一\",\"问题二\",\"问题三\",\"问题四\"],\n\t\"score_obj\":[\"4\",\"3\",\"2\",\"1\"],\n\t\"type_id\":1\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n code:1,\n msg:'成功操作'\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/exercise.js",
    "groupTitle": "Exercise",
    "name": "PostApiExerciseUpdate"
  },
  {
    "type": "Get",
    "url": "api/paper/detailAdmin",
    "title": "获得试卷详情(包含分数)",
    "group": "Paper",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>试卷id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "   {\n    \"code\": 1,\n    \"msg\": \"成功操作\",\n    \"data\": [\n        {\n            \"id\": 1,\n            \"title\": \"试卷一\",\n            \"list\": [\n                [\n                    {\n                        \"id\": 6,\n                        \"title\": \"test\",\n                        \"option_score_obj\": [\n                            {\n                                \"question\": \"option1\",\n                                \"score\": \"4\"\n                            },\n                            {\n                                \"question\": \"option2\",\n                                \"score\": \"3\"\n                            },\n                            {\n                                \"question\": \"option3\",\n                                \"score\": \"2\"\n                            },\n                            {\n                                \"question\": \"option4\",\n                                \"score\": \"1\"\n                            }\n                        ],\n                        \"mold_id\": 1,\n                        \"type_id\": 1\n                    }\n                ],\n                [\n                    {\n                        \"id\": 3,\n                        \"title\": \"test\",\n                        \"option_score_obj\": [\n                            {\n                                \"question\": \"问题一\",\n                                \"score\": \"4\"\n                            },\n                            {\n                                \"question\": \"问题二\",\n                                \"score\": \"3\"\n                            },\n                            {\n                                \"question\": \"问题三\",\n                                \"score\": \"2\"\n                            },\n                            {\n                                \"question\": \"问题四\",\n                                \"score\": \"1\"\n                            }\n                        ],\n                        \"mold_id\": 1,\n                        \"type_id\": 1\n                    }\n                ],\n                [\n                    {\n                        \"id\": 4,\n                        \"title\": \"test2\",\n                        \"option_score_obj\": [\n                            {\n                                \"question\": \"问题一\",\n                                \"score\": \"4\"\n                            },\n                            {\n                                \"question\": \"问题二\",\n                                \"score\": \"3\"\n                            },\n                            {\n                                \"question\": \"问题三\",\n                                \"score\": \"2\"\n                            },\n                            {\n                                \"question\": \"问题四\",\n                                \"score\": \"1\"\n                            }\n                        ],\n                        \"mold_id\": 1,\n                        \"type_id\": 1\n                    }\n                ],\n                [\n                    {\n                        \"id\": 5,\n                        \"title\": \"test\",\n                        \"option_score_obj\": [\n                            {\n                                \"question\": \"option1\",\n                                \"score\": \"4\"\n                            },\n                            {\n                                \"question\": \"option2\",\n                                \"score\": \"3\"\n                            },\n                            {\n                                \"question\": \"option3\",\n                                \"score\": \"2\"\n                            },\n                            {\n                                \"question\": \"option4\",\n                                \"score\": \"1\"\n                            }\n                        ],\n                        \"mold_id\": 1,\n                        \"type_id\": 1\n                    }\n                ]\n            ]\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/paper.js",
    "groupTitle": "Paper",
    "name": "GetApiPaperDetailadmin"
  },
  {
    "type": "Get",
    "url": "api/paper/detailAdmin",
    "title": "获得试卷详情(不包含分数)",
    "group": "Paper",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>试卷id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "   {\n    \"code\": 1,\n    \"msg\": \"成功操作\",\n    \"data\": [\n        {\n            \"id\": 1,\n            \"title\": \"试卷一\",\n            \"list\": [\n                [\n                    {\n                        \"id\": 6,\n                        \"title\": \"test\",\n                        \"option_obj\": [\n                            \"option1\",\n                            \"option2\",\n                            \"option3\",\n                            \"option4\"\n                        ],\n                        \"mold_id\": 1,\n                        \"type_id\": 1\n                    }\n                ],\n                [\n                    {\n                        \"id\": 3,\n                        \"title\": \"test\",\n                        \"option_obj\": [\n                            \"问题一\",\n                            \"问题二\",\n                            \"问题三\",\n                            \"问题四\"\n                        ],\n                        \"mold_id\": 1,\n                        \"type_id\": 1\n                    }\n                ],\n                [\n                    {\n                        \"id\": 4,\n                        \"title\": \"test2\",\n                        \"option_obj\": [\n                            \"问题一\",\n                            \"问题二\",\n                            \"问题三\",\n                            \"问题四\"\n                        ],\n                        \"mold_id\": 1,\n                        \"type_id\": 1\n                    }\n                ],\n                [\n                    {\n                        \"id\": 5,\n                        \"title\": \"test\",\n                        \"option_obj\": [\n                            \"option1\",\n                            \"option2\",\n                            \"option3\",\n                            \"option4\"\n                        ],\n                        \"mold_id\": 1,\n                        \"type_id\": 1\n                    }\n                ]\n            ]\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/paper.js",
    "groupTitle": "Paper",
    "name": "GetApiPaperDetailadmin"
  },
  {
    "type": "Post",
    "url": "/api/paper/add",
    "title": "增加试卷",
    "group": "Paper",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>试卷名称</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "exercises_json",
            "description": "<p>题目id数组</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "worker_id",
            "description": "<p>创建人id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "参数模版",
          "content": "{\n   \"title\":\"试卷一\",\n   \"exercises_json\":[\"1\",\"2\",\"3\",\"4\",\"5\"] //题目id\n   \"worker_id\":\"1\" //创建人id\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n code:1,\n msg:'成功操作'\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/paper.js",
    "groupTitle": "Paper",
    "name": "PostApiPaperAdd"
  },
  {
    "type": "Post",
    "url": "api/paper/del",
    "title": "删除试卷",
    "group": "Paper",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>试卷id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n code:1,\n msg:'成功操作'\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/paper.js",
    "groupTitle": "Paper",
    "name": "PostApiPaperDel"
  },
  {
    "type": "Post",
    "url": "api/paper/getList",
    "title": "获得试卷列表",
    "group": "Paper",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>(可选)试卷名称:模糊查询</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>(可选)编制人昵称:模糊查询</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "start_time",
            "description": "<p>(可选)区间开始时间， 传区间开始当天0点的时间戳</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "end_time",
            "description": "<p>(可选)区间结束时间， 传区间结束当天24:00点，即第下一天0点的时间戳</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "page_now",
            "description": "<p>(可选)当前页</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "num_in_page",
            "description": "<p>(可选)每页个数</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "   {\n    \"code\": 1,\n    \"msg\": \"成功操作\",\n    \"data\": {\n        \"is_success\": true,\n        \"page_total\": 2,\n        \"page_now\": \"2\",\n        \"num_in_page\": \"1\",\n        \"list\": [\n            {\n                \"id\": 2,\n                \"title\": \"试卷一\",\n                \"worker_id\": 2,\n                \"name\": \"editor\",\n                \"time_stamp\": \"1588223983506\"\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/paper.js",
    "groupTitle": "Paper",
    "name": "PostApiPaperGetlist"
  },
  {
    "type": "Post",
    "url": "api/paper/update",
    "title": "更新试卷",
    "group": "Paper",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>试卷id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>试卷名称</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "exercises_json",
            "description": "<p>题目id数组</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "参数模版",
          "content": "{\n   \"id\":1,\n   \"title\":\"试卷一\",\n   \"exercises_json\":[\"6\",\"2\",\"3\",\"4\",\"5\"]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n code:1,\n msg:'成功操作'\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/paper.js",
    "groupTitle": "Paper",
    "name": "PostApiPaperUpdate"
  },
  {
    "type": "Get",
    "url": "api/record/getOneRecord",
    "title": "获得某一条记录的详情",
    "group": "Record",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>记录id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回（type_id为2，访谈记录）",
          "content": "   {\n    \"code\": 1,\n    \"msg\": \"成功操作\",\n    \"data\": [\n        {\n            \"id\": 5,\n            \"operator_id\": 3,\n            \"account\": \"worker\",\n            \"name\": \"worker\",\n            \"worker_id\": 2,\n            \"work_name\": \"editor\",\n            \"time_stamp\": \"1588149221180\",\n            \"type_id\": 2,\n            \"content\": \"123\",\n            \"title\": \"面谈标题\"\n        }\n    ]\n}",
          "type": "json"
        },
        {
          "title": "成功返回（type_id为1，做题记录）",
          "content": "   {\n    \"code\": 1,\n    \"msg\": \"成功操作\",\n    \"data\": [\n        {\n            \"id\": 10,\n            \"operator_id\": 3,\n            \"account\": \"worker\",\n            \"name\": \"worker\",\n            \"worker_id\": 2,\n            \"work_name\": \"editor\",\n            \"time_stamp\": \"1589286109676\",\n            \"type_id\": 1,\n            \"score\": \"2\",\n            \"title\": \"试卷\",\n            \"paper_evaluation\": {\n                \"scoreTotal\": 2,\n                \"general\": \"您在量表上的总得分较低，表明您的心理健康状况良好。主要表现为：您很少因心理原因出现身体不适感；能积极面对社会和生活中的各种问题，信任他人，对人友善；一般没有过于焦虑、悲伤等情况。\",\n                \"general_advice\": \"您拥有比较健康的心态和良好的情绪状态，能够较好地处理生活中的挫折和压力。能很好地适应工作、社会生活，并从中获得满足和快乐，个人价值感和幸福感较高。希望您继续保持这种积极的心态和良好的行为方式。\",\n                \"list\": [\n                    {\n                        \"type_id\": \"2\",\n                        \"name\": \"躯体化\",\n                        \"status\": \"表示你的生活处于规律状态中，睡眠和饮食情况都很好。\",\n                        \"advice\": \"您能较好地应对社会生活中的压力，能调整自己的心态，能够有效防止心理因素躯体化。建议您能够保持积极、乐观的生活态度。\",\n                        \"level\": \"无症状\",\n                        \"scoreAvg\": \"1.00\"\n                    },\n                    {\n                        \"name\": \"总分\",\n                        \"status\": null,\n                        \"advice\": null,\n                        \"level\": null,\n                        \"scoreAvg\": null\n                    },\n                    {\n                        \"name\": \"强迫症状\",\n                        \"status\": null,\n                        \"advice\": null,\n                        \"level\": null,\n                        \"scoreAvg\": null\n                    },\n                    {\n                        \"name\": \"人际关系敏感\",\n                        \"status\": null,\n                        \"advice\": null,\n                        \"level\": null,\n                        \"scoreAvg\": null\n                    },\n                    {\n                        \"name\": \"抑郁\",\n                        \"status\": null,\n                        \"advice\": null,\n                        \"level\": null,\n                        \"scoreAvg\": null\n                    },\n                    {\n                        \"name\": \"焦虑\",\n                        \"status\": null,\n                        \"advice\": null,\n                        \"level\": null,\n                        \"scoreAvg\": null\n                    },\n                    {\n                        \"name\": \"敌对\",\n                        \"status\": null,\n                        \"advice\": null,\n                        \"level\": null,\n                        \"scoreAvg\": null\n                    },\n                    {\n                        \"name\": \"恐怖\",\n                        \"status\": null,\n                        \"advice\": null,\n                        \"level\": null,\n                        \"scoreAvg\": null\n                    },\n                    {\n                        \"name\": \"偏执\",\n                        \"status\": null,\n                        \"advice\": null,\n                        \"level\": null,\n                        \"scoreAvg\": null\n                    },\n                    {\n                        \"name\": \"精神病性\",\n                        \"status\": null,\n                        \"advice\": null,\n                        \"level\": null,\n                        \"scoreAvg\": null\n                    },\n                    {\n                        \"name\": \"其他\",\n                        \"status\": null,\n                        \"advice\": null,\n                        \"level\": null,\n                        \"scoreAvg\": null\n                    }\n                ]\n            },\n            \"paper_exercises\": [\n                {\n                    \"question\": \"问题1\",\n                    \"anwserIndex\": 1,\n                    \"score\": 1,\n                    \"type_id\": 2,\n                    \"options\": [\n                        {\n                            \"option\": \"选项1\",\n                            \"score\": \"4\"\n                        },\n                        {\n                            \"option\": \"选项2\",\n                            \"score\": \"3\"\n                        },\n                        {\n                            \"option\": \"选项3\",\n                            \"score\": \"2\"\n                        },\n                        {\n                            \"option\": \"选项4\",\n                            \"score\": \"1\"\n                        }\n                    ]\n                },\n                {\n                    \"question\": \"问题2\",\n                    \"anwserIndex\": 0,\n                    \"score\": 1,\n                    \"type_id\": 2,\n                    \"options\": [\n                        {\n                            \"option\": \"选项1\",\n                            \"score\": \"4\"\n                        },\n                        {\n                            \"option\": \"选项2\",\n                            \"score\": \"3\"\n                        },\n                        {\n                            \"option\": \"选项3\",\n                            \"score\": \"2\"\n                        },\n                        {\n                            \" option\": \"选项4\",\n                            \"score\": \"1\"\n                        }\n                    ]\n                }\n            ]\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/record.js",
    "groupTitle": "Record",
    "name": "GetApiRecordGetonerecord"
  },
  {
    "type": "Get",
    "url": "api/record/getRecords",
    "title": "获得记录列表",
    "group": "Record",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "operator_id",
            "description": "<p>(可选)用户id：可获得某用户的记录</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "worker_id",
            "description": "<p>(可选)负责人id：可获得工作人员负责的记录</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "account",
            "description": "<p>(可选)模糊搜索：用户账号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>(可选)模糊搜素：用户昵称</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "   {\n    \"code\": 1,\n    \"msg\": \"成功操作\",\n    \"data\": {\n        \"is_success\": true,\n        \"page_total\": 1,\n        \"page_now\": 1,\n        \"num_in_page\": 10,\n        \"list\": [\n            {\n                \"id\": 7,\n                \"operator_id\": 4,\n                \"operator_account\": \"visitor\",\n                \"operator_name\": \"visitor\",\n                \"worker_id\": 2,\n                \"worker_name\": \"editor\",\n                \"title\": \"试卷\",\n                \"time_stamp\": \"1588147199987\",\n                \"type_id\": 1\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/record.js",
    "groupTitle": "Record",
    "name": "GetApiRecordGetrecords"
  },
  {
    "type": "Get",
    "url": "api/record/getUserList",
    "title": "获得已经做题的用户列表",
    "group": "Record",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>根据账号或用户名查询（模糊）</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "   {\n    \"code\": 1,\n    \"msg\": \"成功操作\",\n    \"data\": [\n        {\n            \"operator_id\": 3,\n            \"account\": \"worker\",\n            \"name\": \"worker\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/record.js",
    "groupTitle": "Record",
    "name": "GetApiRecordGetuserlist"
  },
  {
    "type": "Post",
    "url": "/api/record/add",
    "title": "增加记录",
    "group": "Record",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "type_id",
            "description": "<p>1为试卷, 2为访谈记录</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "operator_id",
            "description": "<p>操作人id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "worker_id",
            "description": "<p>负责人id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "参数模版（type_id为1时）",
          "content": "{\n   \"title\": \"试卷\",\n   \"operator_id\": \"3\",\n   \"worker_id\": \"2\",\n   \"type_id\": \"1\",\n   \"paper_exercises\": [\n     {\n       \"question\": \"问题1\",\n       \"anwserIndex\": 1,\n       \"score\": 1,\n       \"type_id\": 2,\n       \"options\": [\n         { \"option\": \"选项1\", \"score\": \"4\" },\n         { \"option\": \"选项2\", \"score\": \"3\" },\n         { \"option\": \"选项3\", \"score\": \"2\" },\n         { \"option\": \"选项4\", \"score\": \"1\" }\n       ]\n     },\n     {\n       \"question\":\"问题2\",\n       \"anwserIndex\":0,\n       \"score\":1,\n       \"type_id\":2,\n       \"options\":[\n         { \"option\": \"选项1\", \"score\": \"4\" },\n         { \"option\": \"选项2\", \"score\": \"3\" },\n         { \"option\": \"选项3\", \"score\": \"2\" },\n         {\" option\": \"选项4\", \"score\": \"1\" }\n       ]\n     }\n   ]\n }",
          "type": "json"
        },
        {
          "title": "参数模版（type_id为2时）",
          "content": "{\n   \"operator_id\":\"3\",\n   \"worker_id\":\"2\",\n   \"type_id\":\"2\",//1为试卷, 2为访谈记录\n   \"title\":\"面谈记录标题\"\n   \"content\":\"这次访谈很有成效， 继续努力。\"\n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n code:1,\n msg:'成功操作'\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/record.js",
    "groupTitle": "Record",
    "name": "PostApiRecordAdd"
  },
  {
    "type": "Post",
    "url": "api/record/del",
    "title": "删除记录",
    "group": "Record",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>记录id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n \"code\": 1,\n \"msg\": \"成功操作\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/record.js",
    "groupTitle": "Record",
    "name": "PostApiRecordDel"
  },
  {
    "type": "Post",
    "url": "api/record/updateTalkRecord",
    "title": "更新面谈内容",
    "group": "Record",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>面谈记录id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "operator_id",
            "description": "<p>记录主体id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "worker_id",
            "description": "<p>记录主体负责人id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "type_id",
            "description": "<p>类型id：必须为2， 2为面谈记录， 做题记录不能被修改</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>面谈内容</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "   {\n    \"code\": 1,\n    \"msg\": \"成功操作\",\n    \"data\": [\n        {\n            \"id\": 5,\n            \"operator_id\": 3,\n            \"account\": \"worker\",\n            \"name\": \"worker\",\n            \"worker_id\": 2,\n            \"worker_name\": \"editor\",\n            \"title\": null,\n            \"time_stamp\": \"1588149221180\",\n            \"type_id\": 2\n        },\n        {\n            \"id\": 7,\n            \"operator_id\": 3,\n            \"account\": \"worker\",\n            \"name\": \"worker\",\n            \"worker_id\": 2,\n            \"worker_name\": \"editor\",\n            \"title\": \"试卷\",\n            \"time_stamp\": \"1588147199987\",\n            \"type_id\": 1\n        },\n        {\n            \"id\": 8,\n            \"operator_id\": 3,\n            \"account\": \"worker\",\n            \"name\": \"worker\",\n            \"worker_id\": 2,\n            \"worker_name\": \"editor\",\n            \"title\": \"试卷\",\n            \"time_stamp\": \"1588161965326\",\n            \"type_id\": 1\n        },\n        {\n            \"id\": 9,\n            \"operator_id\": 3,\n            \"account\": \"worker\",\n            \"name\": \"worker\",\n            \"worker_id\": 2,\n            \"worker_name\": \"editor\",\n            \"title\": \"试卷\",\n            \"time_stamp\": \"1589285610159\",\n            \"type_id\": 1\n        },\n        {\n            \"id\": 10,\n            \"operator_id\": 3,\n            \"account\": \"worker\",\n            \"name\": \"worker\",\n            \"worker_id\": 2,\n            \"worker_name\": \"editor\",\n            \"title\": \"试卷\",\n            \"time_stamp\": \"1589286109676\",\n            \"type_id\": 1\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/record.js",
    "groupTitle": "Record",
    "name": "PostApiRecordUpdatetalkrecord"
  },
  {
    "type": "Get",
    "url": "/api/reservation/getList",
    "title": "获得预约列表",
    "group": "Reservation",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "to_id",
            "description": "<p>被预约咨询师id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n \"code\": 1,\n \"msg\": \"成功操作\",\n \"data\": {\n     \"2020-3-28\": [\n         {\n             \"id\": 5,\n             \"from_id\": 7,\n             \"from_name\": null,\n             \"to_id\": 2,\n             \"to_name\": \"editor\",\n             \"method\":1,\n             \"start_time\": \"1588035600000\",\n             \"end_time\": \"1588042800\",\n             \"status\": 1 \n         }\n     ],\n     \"2020-3-20\": [\n         {\n             \"id\": 5,\n             \"from_id\": 7,\n             \"from_name\": null,\n             \"to_id\": 2,\n             \"to_name\": \"editor\",\n             \"method\":1,\n             \"start_time\": \"1587348000000\",\n             \"end_time\": \"1587355200\",\n             \"status\": 2\n         }\n     ]\n }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/reservation.js",
    "groupTitle": "Reservation",
    "name": "GetApiReservationGetlist"
  },
  {
    "type": "Post",
    "url": "/api/reservation/addReservation",
    "title": "增加预约",
    "group": "Reservation",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "from_id",
            "description": "<p>预约人id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "to_id",
            "description": "<p>预约咨询师id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "start_time",
            "description": "<p>预约时间（开始时间）</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type_name",
            "description": "<p>预约类型</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "method",
            "description": "<p>预约方式(1为来访， 2为线上)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n code:1,\n msg:'成功操作'\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/reservation.js",
    "groupTitle": "Reservation",
    "name": "PostApiReservationAddreservation"
  },
  {
    "type": "Post",
    "url": "/api/reservation/del",
    "title": "删除预约",
    "group": "Reservation",
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n code:1,\n msg:'成功操作'\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/reservation.js",
    "groupTitle": "Reservation",
    "name": "PostApiReservationDel"
  },
  {
    "type": "Post",
    "url": "/api/reservation/modify",
    "title": "修改预约",
    "group": "Reservation",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>预约记录id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "from_id",
            "description": "<p>预约人id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "to_id",
            "description": "<p>预约咨询师id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "start_time",
            "description": "<p>预约时间（开始时间）</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>预约状态：1待确认2确认待上门3成功上门4失约5咨询师主动取消</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "method",
            "description": "<p>预约方式(1为来访， 2为线上)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n code:1,\n msg:'成功操作'\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/reservation.js",
    "groupTitle": "Reservation",
    "name": "PostApiReservationModify"
  },
  {
    "type": "Get",
    "url": "/api/reservation_type/getList",
    "title": "获得预约类型列表",
    "group": "ReservationType",
    "success": {
      "examples": [
        {
          "title": "{",
          "content": "{\n \"code\": 1,\n \"msg\": \"成功操作\",\n \"data\": [\n     {\n         \"id\": 1,\n         \"type_name\": \"test1\"\n     }\n ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/reservationType.js",
    "groupTitle": "ReservationType",
    "name": "GetApiReservation_typeGetlist"
  },
  {
    "type": "Post",
    "url": "/api/reservation_type/add",
    "title": "增加预约类型",
    "group": "ReservationType",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type_name",
            "description": "<p>类型名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>类型描述</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n code:1,\n msg:'成功操作',\n data:{\n     \"insertId\": 7\n }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/reservationType.js",
    "groupTitle": "ReservationType",
    "name": "PostApiReservation_typeAdd"
  },
  {
    "type": "Post",
    "url": "/api/reservation_type/update",
    "title": "修改类型名称",
    "group": "ReservationType",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>类型id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type_name",
            "description": "<p>类型名称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>类型描述</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n code:1,\n msg:'成功操作'\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/reservationType.js",
    "groupTitle": "ReservationType",
    "name": "PostApiReservation_typeUpdate"
  },
  {
    "type": "Post",
    "url": "/api/reservation_type/update",
    "title": "删除预约类型",
    "group": "ReservationType",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>类型id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n code:1,\n msg:'成功操作'\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/reservationType.js",
    "groupTitle": "ReservationType",
    "name": "PostApiReservation_typeUpdate"
  },
  {
    "type": "Get",
    "url": "/api/type/getList",
    "title": "获得心理问题类型",
    "group": "Type",
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n \"code\": 1,\n \"msg\": \"成功操作\",\n \"data\": [\n     {\n         \"id\": 2,\n         \"name\": \"躯体化\"\n     },\n     {\n         \"id\": 3,\n         \"name\": \"强迫症状\"\n     },\n     {\n         \"id\": 4,\n         \"name\": \"人际关系敏感\"\n     },\n     {\n         \"id\": 5,\n         \"name\": \"抑郁\"\n     },\n     {\n         \"id\": 6,\n         \"name\": \"焦虑\"\n     },\n     {\n         \"id\": 7,\n         \"name\": \"敌对\"\n     },\n     {\n         \"id\": 8,\n         \"name\": \"恐怖\"\n     },\n     {\n         \"id\": 9,\n         \"name\": \"偏执\"\n     },\n     {\n         \"id\": 10,\n         \"name\": \"精神病性\"\n     },\n     {\n         \"id\": 11,\n         \"name\": \"其他\"\n     }\n   ]\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/type.js",
    "groupTitle": "Type",
    "name": "GetApiTypeGetlist"
  },
  {
    "type": "Get",
    "url": "/api/user/userDetail",
    "title": "获取用户详情",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "account",
            "description": "<p>用户名</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n \"code\": 1,\n \"msg\": \"成功操作\",\n \"data\": {\n     \"id\": 1,\n     \"roles\": \"admin\",\n     \"account\": \"admin\",\n     \"password\": \"123456\",\n     \"gender\": 1,\n     \"name\": \"admin\",\n     \"birthday\": null,\n     \"phone\": \"110\",\n     \"avatar\": \"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/user.js",
    "groupTitle": "User",
    "name": "GetApiUserUserdetail"
  },
  {
    "type": "Get",
    "url": "/api/user/userInfo",
    "title": "获取登录用户token",
    "group": "User",
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n    \"code\": 1,\n    \"msg\": \"成功操作\",\n    \"data\": {\n        \"token\": \"1a180b3d5ed3594f34f7f8b4279e9004\",\n        \"roles\": \"admin\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "错误返回",
          "content": "{\n  \"code\": -3,\n  \"msg\": \"请登录后再进行操作\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/user.js",
    "groupTitle": "User",
    "name": "GetApiUserUserinfo"
  },
  {
    "type": "Get",
    "url": "/api/user/userList",
    "title": "获取用户列表",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "roles",
            "description": "<p>（可选）精准查询 用户权限：admin，doctor， worker， criminal，visitor</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "account",
            "description": "<p>（可选）模糊查询 账号</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page_now",
            "description": "<p>（可选）当前页，默认为1</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "num_in_page",
            "description": "<p>（可选）页面内显示个数，默认为10</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "   {\n    \"code\": 1,\n    \"msg\": \"成功操作\",\n    \"data\": {\n        \"is_success\": true,\n        \"page_total\": 4,\n        \"page_now\": 1,\n        \"num_in_page\": 10,\n        \"list\": [\n            {\n                \"roles\": \"admin\",\n                \"account\": \"admin\",\n                \"name\": \"admin\",\n                \"gender\": 1\n            },\n            {\n                \"roles\": \"doctor\",\n                \"account\": \"doctor\",\n                \"name\": \"editor\",\n                \"gender\": 1\n            },\n            {\n                \"roles\": \"worker\",\n                \"account\": \"worker\",\n                \"name\": \"worker\",\n                \"gender\": 1\n            },\n            {\n                \"roles\": \"visitor\",\n                \"account\": \"visitor\",\n                \"name\": \"visitor\",\n                \"gender\": 1\n            },\n            {\n                \"roles\": \"criminal\",\n                \"account\": \"fuxing\",\n                \"name\": \"crimial\",\n                \"gender\": 1\n            },\n            {\n                \"roles\": \"visitor\",\n                \"account\": \"visitor1\",\n                \"name\": null,\n                \"gender\": 1\n            },\n            {\n                \"roles\": \"visitor\",\n                \"account\": \"visitor2\",\n                \"name\": null,\n                \"gender\": 1\n            },\n            {\n                \"roles\": \"visitor\",\n                \"account\": \"ddd\",\n                \"name\": null,\n                \"gender\": 1\n            },\n            {\n                \"roles\": \"visitor\",\n                \"account\": \"ddf\",\n                \"name\": null,\n                \"gender\": 1\n            },\n            {\n                \"roles\": \"visitor\",\n                \"account\": \"fff\",\n                \"name\": null,\n                \"gender\": 1\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/user.js",
    "groupTitle": "User",
    "name": "GetApiUserUserlist"
  },
  {
    "type": "Post",
    "url": "/api/user/multiAdd",
    "title": "多次注册新用户（excel导入）",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "exList",
            "description": "<p>注册用户数组</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "request-example",
          "content": "{\n  \"exList\":[\n    {\"account\":\"visitor14\", \"password\":\"123456\", \"roles\":\"visitor\", \"name\":\"john\", \"birthday\":\"1234567890123\",\"gender\":1},\n    {\"account\":\"visitor15\", \"password\":\"123456\", \"roles\":\"visitor\"},\n    {\"account\":\"visitor16\", \"password\":\"123456\", \"roles\":\"visitor\"},\n    {\"account\":\"visitor17\", \"password\":\"123456\", \"roles\":\"visitor\"}\n    ]\n}",
          "type": "Array"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n\"code\":1,\n\"msg\":'成功修改'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "错误返回",
          "content": "{\n\"code\": 0,\n\"msg\": \"操作错误\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/user.js",
    "groupTitle": "User",
    "name": "PostApiUserMultiadd"
  },
  {
    "type": "Post",
    "url": "/api/user/register",
    "title": "成员注册",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "account",
            "description": "<p>用户账号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>用户密码</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "roles",
            "description": "<p>用户权限</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n   \"code\":1,\n   \"msg\":'成功注册',\n   \"data\":{\n     \"insertId\": 7\n   }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "错误返回",
          "content": "{\n \"code\":0,\n \"msg\":\"注册失败\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/user.js",
    "groupTitle": "User",
    "name": "PostApiUserRegister"
  },
  {
    "type": "Post",
    "url": "/api/user/userChange",
    "title": "成员修改",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "account",
            "description": "<p>用户账号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>（可选）电话</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>（可选）电话，</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>（可选）昵称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "avatar",
            "description": "<p>（可选）用户头像地址</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "justice_id",
            "description": "<p>（可选）监狱id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "parent_id",
            "description": "<p>（可选）上一级别id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "is_marry",
            "description": "<p>（可选）是否已婚 1:是 2:否</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "education",
            "description": "<p>（可选）教育程度</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "job",
            "description": "<p>（可选）工作</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "urgent_name",
            "description": "<p>（可选）紧急联系人名字</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "urgent_relation",
            "description": "<p>（可选）紧急联系人关系</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "urgent_phone",
            "description": "<p>（可选）紧急联系人电话</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "roles",
            "description": "<p>（可选）权限</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n   code:1,\n   msg:'成功修改'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "错误返回",
          "content": "{\n   \"code\": 0,\n   \"msg\": \"操作错误\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/user.js",
    "groupTitle": "User",
    "name": "PostApiUserUserchange"
  },
  {
    "type": "Post",
    "url": "/api/user/userDel",
    "title": "成员删除",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "account",
            "description": "<p>用户账号</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n \"code\":1,\n \"msg\":'成功修改'\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "错误返回",
          "content": "{\n\"code\": 0,\n\"msg\": \"操作错误\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/user.js",
    "groupTitle": "User",
    "name": "PostApiUserUserdel"
  },
  {
    "type": "Post",
    "url": "/user/logout",
    "title": "登出",
    "group": "User",
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "{\n  code: 1,\n  data: \"success\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/user.js",
    "groupTitle": "User",
    "name": "PostUserLogout"
  },
  {
    "type": "Get",
    "url": "/login/login",
    "title": "登陆，获取登录token",
    "group": "login",
    "success": {
      "examples": [
        {
          "title": "Response-Example",
          "content": "{\n\"code\": 1,\n\"msg\": \"成功操作\",\n\"data\": {\n   \"token\": \"a20d22b501b93a66d686d9fa35df6914\",\n   \"roles\": \"admin\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/login.js",
    "groupTitle": "login",
    "name": "GetLoginLogin"
  },
  {
    "type": "Post",
    "url": "/api/msg/add",
    "title": "增加站内信息",
    "group": "message",
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "   {\n    \"code\": 1,\n    \"msg\": \"成功操作\",\n    \"data\": {\n        \"insertId\": 3\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/message.js",
    "groupTitle": "message",
    "name": "PostApiMsgAdd"
  },
  {
    "type": "Post",
    "url": "/api/msg/del",
    "title": "删除站内信息",
    "group": "message",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>信息id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "   {\n    \"code\": 1,\n    \"msg\": \"成功操作\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/message.js",
    "groupTitle": "message",
    "name": "PostApiMsgDel"
  },
  {
    "type": "Post",
    "url": "/api/msg/getList",
    "title": "获得站内信息",
    "group": "message",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "from_id",
            "description": "<p>（可选）精准查询:来源用户id， 系统为-1</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "to_id",
            "description": "<p>（可选）精确查询：目标用户id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "state",
            "description": "<p>（可选）精确查询：1:为未读， 0:为已读</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "from_name",
            "description": "<p>（可选）模糊查询：来源用户昵称</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "from_account",
            "description": "<p>（可选）模糊查询：来源用户账号</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "to_name",
            "description": "<p>（可选）模糊查询：目标用户昵称</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "page_now",
            "description": "<p>（可选）当前页，默认为1</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "num_in_page",
            "description": "<p>（可选）页面内显示个数，默认为10</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "   {\n    \"code\": 1,\n    \"msg\": \"成功操作\",\n    \"data\": {\n        \"is_success\": true,\n        \"page_total\": 1,\n        \"page_now\": 1,\n        \"num_in_page\": 10,\n        \"list\": [\n            {\n                \"id\": 1,\n                \"from_id\": -1,\n                \"from_account\": \"system\",\n                \"from_name\": \"系统消息\",\n                \"to_id\": 1,\n                \"to_name\": \"admin\",\n                \"content\": \"test message\",\n                \"state\": 0\n            },\n            {\n                \"id\": 2,\n                \"from_id\": 2,\n                \"from_account\": \"doctor\",\n                \"from_name\": \"editor\",\n                \"to_id\": 1,\n                \"to_name\": \"admin\",\n                \"content\": \"test message\",\n                \"state\": 1\n            },\n            {\n                \"id\": 3,\n                \"from_id\": -1,\n                \"from_account\": \"system\",\n                \"from_name\": \"系统消息\",\n                \"to_id\": 1,\n                \"to_name\": \"admin\",\n                \"content\": \"test message\",\n                \"state\": 1\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/message.js",
    "groupTitle": "message",
    "name": "PostApiMsgGetlist"
  },
  {
    "type": "Post",
    "url": "/api/msg/update",
    "title": "修改站内信息",
    "group": "message",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>信息id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "from_id",
            "description": "<p>来源用户id， 系统为-1</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "to_id",
            "description": "<p>目标用户id</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "state",
            "description": "<p>1:为未读， 0:为已读</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>信息内容</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "成功返回",
          "content": "   {\n    \"code\": 1,\n    \"msg\": \"成功操作\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/controller/message.js",
    "groupTitle": "message",
    "name": "PostApiMsgUpdate"
  }
] });