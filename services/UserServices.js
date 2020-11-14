const User = require("../model/Users");
const { encrypt } = require("../util/encrypt");

module.exports = {
  // 获取用户信息
  async userObj(id) {
    const result = await User.findOne({
      attributes: ["id", "name", "pictureUrl", "sign", "age", "sex"],
      where: {
        id,
      },
    });
    if (result != null) {
      return result.toJSON();
    }
    return null;
  },
  // 用户登录验证
  async userVerify(loginId = "", loginPwd = "") {
    // 对密码进行加密
    loginPwd = encrypt(loginPwd);

    const result = await User.findOne({
      attributes: ["id", "loginId", "loginPwd"],
      where: {
        loginId,
        loginPwd,
      },
    });
    if (result != null) {
      const data = result.toJSON();
      // 验证
      if (data.loginId === loginId && data.loginPwd === loginPwd) {
        return {
          id: data.id,
          state: true,
        };
      }
    }
    return {
      state: false,
    };
  },
  async updateUser(condition, params = {}) {
    let options;
    // 修改图片
    if (typeof params == "string") {
      options = {
        pictureUrl: params,
      };
    }
    // 修改个人信息
    else if (typeof params == "object") {
      options = {
        name: params.name || "",
        sign: params.sign || "",
        age: params.age || "",
        sex: params.sex || "",
      };
    }
    const result = await User.update(options, {
      where: {
        id: condition,
      },
    });
    if (typeof result == "object" && result[0]) {
      return true;
    }
    return false;
  },
};
