const AdminModel = require('../models/admin');
const crypto = require('../util/crypto');
const ResponseWrapper = require('../lib/responseWrapper')

class Admin {
  constructor() {
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.forgetPassword = this.forgetPassword.bind(this);
  }
  /**
   * 登录
   * 账号和密码是否正确
   */
  async login(req, res, next) {
    let user = req.body;
    try {
      let adminResult = await AdminModel.findOne({username: user.username});
      if(adminResult && adminResult.password === crypto(user.password)) {
        res.send({
          code:'0000', 
          msg: '登录成功', 
          success: true
        })
      } else {
        res.send({
          code: '0001', 
          msg: '账号或密码错误，请重新登录', 
          success: false
        })
      }
    } catch(err) {
      console.log(err);
      res.send({msg: '报错，登入失败'})
    }

  }
  /** 
   * 注册
   * 1.判断用户名是否已经被注册
   * 2.如没有注册，则注册
   */
  async register(req, res, next) {
    let user = req.body;
    //密码进行加密
    let password = user.password;
    user.password = crypto(password);
    try {
      let adminResult = await AdminModel.findOne({
        $or: [
          {username: user.username},
          {phone: user.phone}
        ]
      })
      if(adminResult) {
        res.send(ResponseWrapper.markCustom({
          success: true,
          msg: '用户名或手机号已经被注册', 
          isregistered: true
        }));
        return false;
      }
      let admin = new AdminModel({...user, create_time: new Date()});
      admin.save(function (err) {
        if (err) throw err;
        res.send(ResponseWrapper.markCustom({
          success: true,
          msg: '注册成功', 
          isregistered: false
        }))
      })
    } catch(err) {
      console.log(err);
      res.send(ResponseWrapper.markError())
    }
  }
  //忘记密码
  async forgetPassword(req, res, next) {
    let user = req.body;
    try {
      let adminResult = await AdminModel.findOne({phone: user.phone});
      if(!adminResult) res.send({msg: '请输入正确的手机号'});
      await AdminModel.updateOne({phone: user.phone}, {$set: {password: crypto(user.password)}});
      res.send({
        msg: '修改成功'
      })
    } catch(err) {
      console.log(err);
      res.send({
        msg: '密码修改失败'
      })
    }
  }
}

module.exports = new Admin();
