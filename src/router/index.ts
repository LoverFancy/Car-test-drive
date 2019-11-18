import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      navShow: true,
      requireAuth: true,
      title: '融资租赁服务平台',
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/message',
    name: 'message',
    component: () => import('../views/Message.vue'),
    meta: {
      title: '消息',
      navShow: true,
    },
  },
  {
    path: '/mine',
    name: 'mine',
    component: () => import('../views/Mine.vue'),
    meta: {
      title: '我的',
      navShow: true,
    },
  },
  // {
  //   name: 'productdetails',
  //   component: () => import('./view/components/details/ProductDetails.vue'),
  //   meta: { requireAuth: true, title: '金融产品' }
  // },
  // {
  //   name: 'applyfirst',
  //   component: () => import('./view/components/Loan/ApplyFirst.vue'),
  //   meta: {
  //     title: '申请贷款',
  //     topNav: true
  //   }
  // },
  // {
  //   name: 'myloan',
  //   component: () => import('./view/components/Loan/MyLoan.vue'),
  //   meta: {
  //     title: '我的贷款',
  //   }
  // },
  // {
  //   name: 'mycontract',
  //   component: () => import('./view/components/contract/MyContract.vue'),
  //   meta: {
  //     title: '我的合同'
  //   }
  // },
  // {
  //   name: 'billinginquiry',
  //   component: () => import('./view/components/bill/BillingInquiry.vue'),
  //   meta: {
  //     title: '账单查询',
  //   }
  // },
  // {
  //   name: 'quickrepayment',
  //   component: () => import('./view/components/bill/QuickRepayment.vue'),
  //   meta: {
  //     title: '快速还款',
  //   }
  // },
  // {
  //   name: 'payinadvance',
  //   component: () => import('./view/components/bill/PayInAdvance.vue'),
  //   meta: {
  //     title: '首付款',
  //   }
  // },
  // {
  //   name: 'assure',
  //   component: () => import('./view/components/bill/Assure.vue'),
  //   meta: {
  //     title: '保证金',
  //   }
  // },
  // {
  //   name: 'consultingservice',
  //   component: () => import('./view/components/bill/ConsultingService.vue'),
  //   meta: {
  //     title: '咨询服务费',
  //   }
  // },
  // {
  //   name: 'announcementlist',
  //   component: () => import('./view/components/details/AnnouncementList.vue'),
  //   meta: {
  //     title: '公告列表',
  //     requireAuth: true,
  //   }
  // },
  // {
  //   path: '/announcementdetails/:noticeId',
  //   name: 'announcementdetails',
  //   component: () => import('./view/components/details/AnnouncementDetails.vue'),
  //   meta: {
  //     requireAuth: true,
  //     title: '公告详情'
  //   },
  //   props: true,
  // },
  // {
  //   name: 'applysecond',
  //   component: () => import('./view/components/Loan/ApplySecond.vue'),
  //   meta: { title: '申请贷款', topNav: true },
  //   props: true,
  // },
  // {
  //   name: 'applythird',
  //   component: () => import('./view/components/Loan/ApplyThird.vue'),
  //   meta: { title: '贷款申请表', topNav: true },
  // },
  {
    path: '/start',
    name: 'start',
    component: () => import('../views/login/LoginOrRegister.vue'),
    meta: { topNav: true, requireAuth: true },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/Login.vue'),
    meta: { topNav: true, requireAuth: true },
  },
  // {
  //   name: 'retrieve',
  //   component: () => import('./view/components/login/Retrieve.vue'),
  //   meta: { title: '找回密码', requireAuth: true }
  // },
  {
    path: '/registrationfirst',
    name: 'registrationfirst',
    component: () => import('../views/login/RegistrationFirst.vue'),
    meta: { title: '注册', topNav: true, requireAuth: true },
  },
  {
    path: '/registrationsecond',
    name: 'registrationsecond',
    component: () => import('../views/login/RegistrationSecond.vue'),
    meta: { title: '注册', topNav: true, requireAuth: true },
  },
  // {
  //   name: 'registrationthird',
  //   component: () => import('./view/components/login/RegistrationThird.vue'),
  //   meta: { title: '注册', topNav: true, requireAuth: true, }
  // },
  // {
  //   path: '/loandetails/:loanId',
  //   name: 'loandetails',
  //   component: () => import('./view/components/details/LoanDetails.vue'),
  //   meta: { title: '贷款详情' }
  // },
  // {
  //   name: 'paymentcode',
  //   component: () => import('./view/components/bill/PaymentCode.vue'),
  //   meta: {
  //     title: '付款码'
  //   }
  // },
  // {
  //   name: 'signcontract',
  //   component: () => import('./view/components/contract/SignContract.vue'),
  //   meta: {
  //     title: '签署合同'
  //   }
  // },
  // {
  //   name: 'settings',
  //   component: () => import('./view/components/tabbar/Settings.vue'),
  //   meta: {
  //     title: '设置'
  //   }
  // },
  // {
  //   name: 'cardetails',
  //   component: () => import('./view/components/details/CarDetails.vue'),
  //   meta: {
  //     title: '车辆信息'
  //   }
  // },
  // {
  //   name: 'changepassword',
  //   component: () => import('./view/components/tabbar/ChangePassword.vue'),
  //   meta: {
  //     title: '修改密码'
  //   }
  // },
  // {
  //   name: 'changephonenumber',
  //   component: () => import('./view/components/tabbar/ChangePhoneNumber'),
  //   meta: {
  //     title: '修改手机号'
  //   }
  // },
  // {
  //   path: '/contractdetails',
  //   name: 'contractdetails',
  //   component: () => import('./view/components/details/ContractDetails.vue'),
  //   meta: { title: '合同详情' }
  // },
  // {
  //   path: '/payresult',
  //   name: 'payresult',
  //   component: () => import('./view/components/wxPay/PayResult.vue'),
  //   meta: { title: '支付结果', topNav: true, }
  // },
  // {
  //   name: 'wxpay',
  //   component: () => import('./view/components/wxPay/WxPay.vue'),
  //   meta: { title: '订单支付', topNav: true, }
  // },
  // {
  //   path: '/protocol',
  //   name: 'protocol',
  //   component: () => import('./view/components/login/Protocol.vue'),
  //   meta: { title: '注册协议', requireAuth: true, }
  // },
  // {
  //   path: '*',
  //   redirect: '/home'
  // },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to: any, from: any, next: any) => {
  if (to.name === 'login') {
    next();
  } else {
    next();
  }
});

export default router;
