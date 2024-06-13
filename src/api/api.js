import request, { post, get } from "@/utils/request";

// 登陆
export const login = (params) => post("/login",params)
//登出
export const logout = () => get("/login/logout")
//获取登陆用户信息
export const getUser = () => get("/user/getUserInfo")
//保存用户
export const saveUser = (params) => post("/user/saveUser",params)
//获取邮箱验证码
export const getEmailReg = (params) => get("/user/getEmailReg",params)
//忘记密码
export const forgetPassword = (params) => post("/user/forgetPassword",params)
//更新用户
export const editUser = (params) => post("/user/editUser",params)
//修改密码
export const changePassword = (params) => post("/user/changePassword",params)
//获取首页产品
export const getSysProductThree = (params) => get('/product/getSysProductThree',params)
//获取首页数据
export const getIndexData = (params) => get("/user/getIndexData",params)
//修改个人信息
export const setUserInfo = (params) => post("/user/setUserInfo",params)
//获取产品类型列表
export const getSysProductTypeList = (params) => get("/type/getSysProductTypeList",params)
//获取币种列表
export const getSysCurrencyList = (params) => get("/currency/getSysCurrencyList",params)
//获取模式列表
export const getSysModeList = (params) => get("/mode/getSysModeList",params)
//获取性质列表
export const getSysNatureList = (params) => get("/nature/getSysNatureList",params)
//获取风险列表
export const getSysRiskList = (params) => get("/risk/getSysRiskList",params)
//查询产品
export const getSysProductPage = (params) => post("/product/getSysProductPage",params)
//根据id查询产品
export const getSysProductById = (params) => get("/product/getSysProductById",params)
//获取产品走势
export const getSysProductPriceSeven = (param) => get("/price/getSysProductPriceSeven",param)
//保存交易记录
export const saveSysOrder = (params) => post("/order/saveSysOrder",params)
//获取今日价格
export const getSysProductPriceByToday = (param) => get("/price/getSysProductPriceByToday",param)
//获取资产信息
export const getUserMoney = (param) => get("/order/getUserMoney",param)
//查询交易记录
export const getSysOrderPage = (params) => post("/order/getSysOrderPage",params)
//查询盈亏记录
export const getSysPhasePage = (params) => post("/phase/getSysPhasePage",params)
//风险
export const getSysRisk = (param) => get("/risk/getSysRisk",param)
//查询消息
export const getSysNewsPage = (params) => post("/news/getSysNewsPage",params)
//设置消息已读
export const setUserNews = (params) => get("/news/setUserNews",params)
//查询用户未读消息
export const getUserNews = (params) => get("/news/getUserNews",params)
//保存提现
export const saveSysWith = (params) => post("/with/saveSysWith",params)
//充值
export const addCount = (params) => get("/user/addCount",params)
//赎回
export const redemption = (params) => get("/order/redemption",params)