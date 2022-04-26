/**
 * 下划线转驼峰
 * @param {*} str
 */
 export function underscore2camelCase(str) {
    return str.replace(/\_(\w)/g, (all, letter) => {
      return letter.toUpperCase()
    })
  }
  
  /**
   * 驼峰转下划线
   * @param {*} str
   */
  export function camelCase2underscore(str) {
    return str.replace(/([A-Z])/g, '_$&').toLowerCase()
  }
  