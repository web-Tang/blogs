/* 获取时间戳 */
function datePoke(data) {
  return new Date(data).getTime()
}

// 冒泡排序 降：desc(默认) 升：asc
function $sort(arr, way) {
  if (arr == null || arr.length < 2) {
    return arr;
  }

  way = way ? way.toLowerCase() : way;
  const type = way == 'asc';

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      const self = datePoke(arr[j].updatedAt)
      const next = datePoke(arr[j + 1].updatedAt)
      if (type) {
        next < self && exchange(arr, j)
      } else {
        next > self && exchange(arr, j)
      }
    }
  }
  function exchange(list, j) {
    const temp = list[j];
    list[j] = list[j + 1];
    list[j + 1] = temp;
  }
  return arr
}

function dateFormat({ Year, Month, Day, Hour, Minute, second }) {
  Month = PrefixInteger(Month, 2)
  Day = PrefixInteger(Day, 2)
  Hour = PrefixInteger(Hour, 2)
  Minute = PrefixInteger(Minute, 2)
  second = PrefixInteger(second, 2)
  return `${Year}-${Month}-${Day} ${Hour}:${Minute}:${second}`
}

/* 自动补0 */
function PrefixInteger(num, length) {
  return (Array(length).join('0') + num).slice(-length);
}

// 改变日期
function changeDate(str) {
  let { Year, Month, Day, Hour, Minute } = getDateTime(str)
  const nowDate = new Date()
  const now = getDateTime(nowDate)

  Month = PrefixInteger(Month, 2)
  Day = PrefixInteger(Day, 2)
  Hour = PrefixInteger(Hour, 2)
  Minute = PrefixInteger(Minute, 2)

  if (parseInt(Year) == now.Year) {
    if (parseInt(Month) == now.Month) {
      if (parseInt(Day) == now.Day) {
        return `今天 ${Hour}:${Minute}`
      }
    }
    return `${Month}月${Day}日`
  }
  return `${Year}-${Month}-${Day}`
}

function getDateTime(date) {
  const datetime = new Date(date)
  const Year = datetime.getFullYear()
  const Month = datetime.getMonth() + 1
  const Day = datetime.getDate()
  const Hour = datetime.getHours()
  const Minute = datetime.getMinutes()
  const second = datetime.getSeconds()
  return {
    Year, Month, Day, Hour, Minute, second
  }
}

// 获取随机数
function random(max, min) {
  return Math.floor(Math.random() * (max + 1 - min) + min)
}

/* 转换数组 */
function changeArr(arr) {
  return JSON.parse(JSON.stringify(arr))
}

module.exports = {
  $sort,
  datePoke,
  changeDate,
  random,
  changeArr,
  getDateTime,
  dateFormat
}