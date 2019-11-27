import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pageTitle: '', // 页面标题
    isLoanEdit: false, // 是否是贷款编辑点击跳转
    readMesg: 0,
    // 登录成功
    loginSuccess: {
      loginState: false, // 登录状态
      memberId: '1', // 会员id
    },
    // 注册
    registration: {
      isCompleteFirst: false, // 第一步是否完成
      isCompleteSecond: false, // 第二步是否完成
      mobile: '', // 手机号
      selfHoldPicPath: '', // 图片地址
      openId: '',
      headInco: '',
      nickName: '',
    },
    // 申请贷款
    applyLoan1: {
      // 第一步
      ismyself: true, // 是否是本人
      loanId: '', // 代款编号
      agentId: '', // 会员编号
      applyFirstComplete: false, // 第一步是否完成
    },
    // 第二步
    applyLoan2: {
      applySecondComplete: false, // 第二步是否玩成
      cardTypeName: '',
    },
    // 第三步
    applyLoan3: {
      applyId: '', // 客户申请表id
    },
    // 图片
    evidence: [],
  },
  mutations: {
    // 登录状态
    loginStatus(state, obj) {
      state.loginSuccess = obj;
      state.loginSuccess.loginState = true;
    },
    // 消息未读数量
    readMesgMutation(state, readMesg) {
      state.readMesg = readMesg;
    },
    // 修改标题
    changePageTitle(state, title) {
      state.pageTitle = title;
    },
    // 注册页面的数据
    changeRegistrationFirst(state, obj) {
      state.registration = obj;
      state.registration.isCompleteFirst = true;
    },
    changeRegistrationSecond(state, obj) {
      state.registration.selfHoldPicPath = obj.selfHoldPicPath;
      state.registration.isCompleteSecond = true;
    },
    setWxUser(state, obj) {
      state.registration.openId = obj.openId;
      state.registration.headInco = obj.headInco;
      state.registration.nickName = obj.nickName;
    },
    // 申请贷款数据
    changeApplyFirst(state, obj) {
      state.applyLoan1 = obj;
      state.applyLoan1.applyFirstComplete = true; // 第一步是否完成
    },
    ismyself(state, bol) {
      state.applyLoan1.ismyself = bol;
    },
    // 第二步完成
    changeApplySecond(state, obj) {
      state.applyLoan2 = obj;
      state.applyLoan2.applySecondComplete = true;
    },
    // 第二步返回
    previouSecond(state, obj) {
      state.applyLoan2 = obj;
    },
    changeApplyThird(state, obj) {
      state.applyLoan3 = obj;
    },
    editLoan1(state, obj) {
      state.applyLoan1 = obj;
      state.applyLoan1.loanId = obj.loanId;
      state.applyLoan1.agentId = obj.agentId;
    },
    editLoan2(state, obj) {
      state.applyLoan2 = obj;
      state.applyLoan2.applySecondComplete = true;
      if (obj.cardType === 2) {
        state.applyLoan2.cardTypeName = '营业执照';
      } else {
        state.applyLoan2.cardTypeName = '身份证';
      }
    },
    editLoan3(state, obj) {
      state.applyLoan3 = obj;
    },
    // 退出登录
    quitLogin(state, obj) {
      state.loginSuccess.loginState = false;
      state.loginSuccess = obj;
    },
    // 删除 注册数据
    // deleteRegistration(state) {
    //   state.registration = {};
    // },
    // 是否是贷款编辑页面跳转
    loanEdit(state) {
      state.isLoanEdit = true;
    },
    // loanEditno(state) {
    //   state.isLoanEdit = false;
    //   state.applyLoan1 = {}
    //   state.applyLoan2 = {}
    //   state.applyLoan3 = {}
    // },
    // 删除 申请贷款数据
    // deleteApplyLoan(state) {
    //   state.applyLoan1 = {}
    //   state.applyLoan2 = {}
    //   state.applyLoan3 = {}
    // },
    // 设置图片
    setEvidence(state, array) {
      state.evidence = array;
    },
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()],
});
