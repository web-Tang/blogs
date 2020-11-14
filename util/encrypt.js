const crypto = require("crypto");

// 密钥
const secret = Buffer.from("6af8k8s73tnn6kjy");
// iv
const iv = Buffer.from("7s3rvdp4hp0ok0dn");

module.exports = {
  encrypt(str) {
    // 返回加密的函数
    const cry = crypto.createCipheriv("aes-128-cbc", secret, iv);
    // 对传递字符串进行加密
    let result = cry.update(str, "utf-8", "hex");
    result += cry.final("hex");
    return result;
  },
  decrypt(str) {
    // 返回解密的函数
    const decry = crypto.createDecipheriv("aes-128-cbc", secret, iv);
    // 传递字符串进行解密
    let result = decry.update(str, "hex", "utf-8");
    result += decry.final("utf-8");
    return result;
  },
};
