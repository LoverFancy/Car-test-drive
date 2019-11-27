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
  {
    path: '/productdetails',
    name: 'productdetails',
    component: () => import('../views/product/ProductDetails.vue'),
    meta: { requireAuth: true, title: '金融产品' },
  },
  {
    path: '/drivefirst',
    name: 'drivefirst',
    component: () => import('../views/test-drive/DriveFirst.vue'),
    meta: {
      title: '申请试驾',
      topNav: true,
    },
  },
  {
    path: '/mydrive',
    name: 'mydrive',
    component: () => import('../views/test-drive/MyDrive.vue'),
    meta: {
      title: '我的试驾',
    },
  },
  {
    path: '/mycontract',
    name: 'mycontract',
    component: () => import('../views/contract/MyContract.vue'),
    meta: {
      title: '我的合同',
    },
  },
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
  {
    path: '/announcementlist',
    name: 'announcementlist',
    component: () => import('../views/announcement/AnnouncementList.vue'),
    meta: {
      title: '公告列表',
      requireAuth: true,
    },
  },
  {
    path: '/announcementdetails/:noticeId',
    name: 'announcementdetails',
    component: () => import('../views/announcement/AnnouncementDetails.vue'),
    meta: {
      requireAuth: true,
      title: '公告详情',
    },
    props: true,
  },
  {
    path: '/drivesecond',
    name: 'drivesecond',
    component: () => import('../views/test-drive/DriveSecond.vue'),
    meta: { title: '申请试驾', topNav: true },
    props: true,
  },
  {
    path: '/drivethird',
    name: 'drivethird',
    component: () => import('../views/test-drive/DriveThird.vue'),
    meta: { title: '试驾申请表', topNav: true },
  },
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
  {
    path: '/retrieve',
    name: 'retrieve',
    component: () => import('../views/login/Retrieve.vue'),
    meta: { title: '找回密码', requireAuth: true },
  },
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
  {
    path: '/registrationthird',
    name: 'registrationthird',
    component: () => import('../views/login/RegistrationThird.vue'),
    meta: { title: '注册', topNav: true, requireAuth: true },
  },
  {
    path: '/car',
    name: 'car',
    component: () => import('../views/Car.vue'),
    meta: { title: '车辆', navShow: true },
  },
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
  {
    path: '/signcontract',
    name: 'signcontract',
    component: () => import('../views/contract/SignContract.vue'),
    meta: {
      title: '签署合同',
      requireAuth: true,
    },
  },
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
  {
    path: '/contractdetails',
    name: 'contractdetails',
    component: () => import('../views/contract/ContractDetails.vue'),
    meta: { title: '合同详情' },
  },
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
  {
    path: '/protocol',
    name: 'protocol',
    component: () => import('../views/login/Protocol.vue'),
    meta: { title: '注册协议', requireAuth: true },
  },
  {
    path: '*',
    redirect: '/',
  },
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
