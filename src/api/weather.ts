import axios from "axios";

// key 请求服务权限标识
// city 城市编码 输入城市的 adcode
// extensions: 气象类型  可选值：base/all,  base:返回实况天气, all:返回预报天气
// output: 返回格式 可选值：JSON,XML
// 筠连县	adcode: 511527	citycode:0831
// 宜宾市	adcode: 511500	citycode:0831
export const getWeather = (
  city = "511527",
  extension = "all",
  output = "json",
  key = "10216a1abefee221ad630e73a158202e",
) => {
  if (city) {
    return axios.get(`https://restapi.amap.com/v3/weather/weatherInfo`, {
      params: {
        city,
        extension,
        key,
        output,
      },
    });
  } else {
    return Promise.reject({
      error: "Error: no city adcode",
    });
  }
};
