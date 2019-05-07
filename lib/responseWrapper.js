

const ReturnCode = {
  SUCCESS: {
    code: '0000',
    msg: '查询成功'
  },
  NODATA: {
    code: '0001',
    msg: '查询成功无数据'
  },
  FEAILED: {
    code: '0002',
    msg: '查询失败'
  },
  ACCOUNT_ERROR: {
    code: '1000',
    msg: '账户不存在或被禁用'
  },
  API_NOT_EXISTS: {
    code: '1001',
    msg: '请求的接口不存在'
  },
  API_NOT_PER: {
    code: '1002',
    msg: '没有该接口的访问权限'
  },
  PARAMS_ERROR: {
    code: '1004',
    msg: '参数为空或格式错误'
  },
  API_DISABLE: {
    code: "1011",
    msg: '没有权限'
  },
  UNKNOWN_IP: {
    code: '1099',
    msg: '非法IP请求'
  },
  SYSTEM_ERROR: {
    code: '9999',
    msg: '系统异常'
  }
}


/**
 * Description: 接口统一返回格式
 */
class ResponseWrapper {
  /**
   * 自定义返回结果
   * 建议使用统一的返回结果，特殊情况可以使用此方法
   */
  static markCustom(responseWrapper) {
    return responseWrapper
  }
  /**
   * 参数为空或者参数格式错误
   */
  static markParamError() {
    return {
      success: false,
      ...ReturnCode.PARAMS_ERROR,
    };
  }
  /**
   * 查询失败
   */
  static markError() {
    return {
      success: false,
      ...ReturnCode.FEAILED,
      data: null
    }
  }
  /**
   * 查询成功但无数据
   */
  static markSuccessButNoData() {
    return {
      success: true,
      ...ReturnCode.NODATA,
      data: null
    }
  }
  /**
   * 查询成功且有数据
   */
  static markSuccess(data) {
    return {
      success: true,
      ...ReturnCode.SUCCESS,
      data
    }
  }
}

module.exports = ResponseWrapper;