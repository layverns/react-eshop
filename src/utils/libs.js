/**
 * 获取多维数组的某个元素
 * @param {*} arr 多维数组
 * @param {*} indexs [第一维的index，第二维的index]
 * 备注：会修改indexs的值，调用时传入indexs的副本
 */
export const getElmOfArray = (arr, indexs) => {
  if (indexs.length == 1) {
    return arr[indexs[0]];
  } else {
    arr = arr[indexs[0]];
    indexs.shift();
    return getElmOfArray(arr, indexs);
  }
};
