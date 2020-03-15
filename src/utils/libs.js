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

/**
 * 根据选定的规格获取价格，积分等信息
 * @param {*} specs 选择的规格数组
 * @param {*} productSpecs 产品规格多维数组
 * @param {*} datas 要获取的数据多维数组，例如prices
 */
export const getInfoOfSpecs = (specs, productSpecs, datas) => {
  let indexs = [];
  specs.forEach((s, index) => {
    const productSpec = productSpecs[index];
    const spec = productSpec.filter(ps => ps.id == s)[0];
    indexs[spec.order] = spec.index;
  });
  return getElmOfArray(datas, indexs);
};
