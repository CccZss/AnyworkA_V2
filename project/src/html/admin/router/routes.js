const routes = [
  { 
    path: '*/', 
    redirect: {
      name: 'organizations',
    } 
  },
  { 
    path: '*/homePage', 
    redirect: {
      name: 'organizations',
    } 
  },
  {
    path: '/homePage',
    name: 'homePage',
    meta: {
      title: 'Home PAGE'
    },
    props: {
      name: {
        homePage: '首页',
        organizations: '我的组织',
        students: '组织中的学生',
        tests: '组织中的试卷',
        completeStatus: '试卷完成情况',
        practices: '组织中的练习',
        createTest: '出试卷',
        createPractice: '出练习',
        sendNotice: '发通知',
        noticeHistory: '通知记录'
      },
      path: {
        homePage: '/homePage',
        organizations: '/homePage/organizations',
        students: '/homePage/students',
        tests: '/homePage/tests',
        completeStatus: '/homePage/tests/completeStatus',
        practices: '/homePage/practices',
        createTest: '/homePage/createTest',
        createPractice: '/homePage/createPractice',
        sendNotice: '/homePage/sendNotice',
        noticeHistory: '/homePage/noticeHistory'
      }
    },
    component: require('../components/homePage.vue'),  
    children: [
      {
        path: 'organizations',
        name: 'organizations',
        component: require('../components/homePage/organizations.vue')
      },
      {
        path: 'students',
        name: 'students',
        component: require('../components/homePage/students.vue')
      },
      {
        path: 'tests',
        name: 'tests',
        component: require('../components/homePage/tests.vue'),
      },
      {
        path: 'tests/completeStatus',
        name: 'completeStatus',
        component: require('../components/homePage/paper/completeStatus.vue')
      },
      {
        path: 'practices',
        name: 'practices',
        component: require('../components/homePage/practices.vue')
      },
      {
        path: 'createTest',
        name: 'createTest',
        component: require('../components/homePage/createTest.vue')
      },
      {
        path: 'createPractice',
        name: 'createPractice',
        component: require('../components/homePage/createPractice.vue')
      },
      {
        path: 'sendNotice',
        name: 'sendNotice',
        component: require('../components/homePage/sendNotice.vue')
      },
      {
        path: 'noticeHistory',
        name: 'noticeHistory',
        component: require('../components/homePage/noticeHistory.vue')
      }
    ]
  },
]

module.exports = routes