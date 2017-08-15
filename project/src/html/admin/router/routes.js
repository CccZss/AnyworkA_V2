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
      name: '首页'
    },
    component: require('../components/homePage.vue'),  
    children: [
      {
        path: 'organizations',
        name: 'organizations',
        props: {
          name: '我的组织'
        },
        component: require('../components/homePage/organizations.vue')
      },
      {
        path: 'students',
        name: 'students',
        props: {
          name: '组织中的学生'
        },
        component: require('../components/homePage/students.vue')
      },
      {
        path: 'tests',
        name: 'tests',
        props: {
          name: '组织中的试卷'
        },
        component: require('../components/homePage/tests.vue')
      },
      {
        path: 'practices',
        name: 'practices',
        props: {
          name: '组织中的练习'
        },
        component: require('../components/homePage/practices.vue')
      },
      {
        path: 'createTest',
        name: 'createTest',
        props: {
          name: '出试卷'
        },
        component: require('../components/homePage/createTest.vue')
      },
      {
        path: 'createPractice',
        name: 'createPractice',
        props: {
          name: '出练习'
        },
        component: require('../components/homePage/createPractice.vue')
      },
      {
        path: 'sendNotice',
        name: 'sendNotice',
        props: {
          name: '发通知'
        },
        component: require('../components/homePage/sendNotice.vue')
      },
      {
        path: 'noticeHistory',
        name: 'noticeHistory',
        props: {
          name: '通知记录'
        },
        component: require('../components/homePage/noticeHistory.vue')
      }
    ]
  },
]

module.exports = routes