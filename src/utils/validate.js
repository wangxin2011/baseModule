import CryptoJS from "crypto-js";

const key = CryptoJS.enc.Utf8.parse("6B04E34CFE9540C8"); //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('C93C9F7B5A14297B'); //十六位十六进制数作为密钥偏移量
/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}


// 字符串去除空格
export function nesgame(str) {
  typeof str != 'string' ? str = '' : '';
  return str.replace(/\s/g, '');
}

/**
* @description 验证手机号码
* @param {*} phone 
*/
export function validMobile(phone) {
  var reg = 11 && /^((1)[1-9]{1}[0-9]{1}\d{8})$/;
  if (phone == '') {
    return false;
  } else if (!reg.test(phone)) {
    return false;
  }
  return true;
}

export const showLoading = (scope, duration) => {
  scope.$toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: duration || 15000
  });
}
export const closeLoading = (scope) => {
  scope.$toast.clear();
}

export const checkPassword = (password) => {
  let reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;
  if (reg.test(password)) {
    return true;
  }
  return false;
}

// 加密
export function Encrypt(word, padding) {
  padding = padding ? CryptoJS.pad.Pkcs7 : CryptoJS.pad.ZeroPadding;
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: padding
  });
  return encrypted.toString();
}
// 解密
export function Decrypt(word) {
  let result = '';
  try {
    let encryptedHexStr = CryptoJS.enc.Base64.parse(word);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    result = decryptedStr.toString();
  } catch (error) {
    result = word;
  }
  return result;
}

// 解密并隐藏
export function DecryptHidden(word) {
  let result = '';
  try {
    var dec = Decrypt(word);
    result = dec.replace(/(\d{3})(\d+)(\d{3})/, function (x, y, z, p) {
      var i = "";
      while (i.length < z.length) {
        i += "*"
      }
      return y + i + p
    })
  } catch (error) {
    console.log(error);
  }
  return result;
}

// 校验身份证号
export function IdentityCodeValid(code) {
    var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
    if (!code || !(/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code) || /^[1-9]\d{7}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}$/.test(code))) {
      console.log("******身份证号格式错误********");
      return false;
    }else if (!city[code.substr(0, 2)]) {
      console.log("******地址编码错误********");
      return false;
    }
    if(code.length == 15){
      //15位身份证号码的基本校验
      // let check = /^[1-9]\d{7}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}$/.test(code);  
      // console.log("****A*******");
      // if(!check) return false;
      let birDayCode = '19' + code.substring(6,12);
      //校验日期码
      let  _check = /^[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))$/.test(birDayCode);
      console.log("****B*******");
      if(!_check) return false;  
      let yyyy = parseInt(birDayCode.substring(0,4),10);
      let mm = parseInt(birDayCode.substring(4,6),10);
      let dd = parseInt(birDayCode.substring(6),10);
      let xdata = new Date(yyyy,mm-1,dd);
      if(xdata > new Date()){
        console.log("****生日不能大于当前日期*******");
        return false;//生日不能大于当前日期
      }else if ( ( xdata.getFullYear() == yyyy ) && ( xdata.getMonth () == mm - 1 ) && ( xdata.getDate() == dd ) ){
        console.log("****E*******");
        return true;
      }else{
        console.log("****F*******");
        return false;
      }
    }else if (code.length == 18) {
      // 加权因子
      const weight_factor = [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2];
      // 校验码
      const check_code = ['1', '0', 'X' , '9', '8', '7', '6', '5', '4', '3', '2'];
      code = code + "";
      code = code.toUpperCase();
      let last = code[17];//最后一位
      let seventeen = code.substring(0,17);
      console.log(last,seventeen);
      // ISO 7064:1983.MOD 11-2
      // 判断最后一位校验码是否正确
      let arr = seventeen.split("");
      let len = arr.length;
      let num = 0;
      for(let i = 0; i < len; i++){
          num = num + arr[i] * weight_factor[i];
      }
      // 获取余数
      let resisue = num%11;
      let last_no = check_code[resisue];
      // 格式的正则
      // 正则思路
      /*
      第一位不可能是0
      第二位到第六位可以是0-9
      第七位到第十位是年份，所以七八位为19或者20
      十一位和十二位是月份，这两位是01-12之间的数值
      十三位和十四位是日期，是从01-31之间的数值
      十五，十六，十七都是数字0-9
      十八位可能是数字0-9，也可能是X
      */
      let idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;
      // 判断格式是否正确
      let format = idcard_patter.test(code);
      // 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
      return last === last_no && format ? true : false;
  }else{
    return false;
  }
}

