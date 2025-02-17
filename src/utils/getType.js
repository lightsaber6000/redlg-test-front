const getType = (val) => {
    switch (Object.prototype.toString.call(val)) {
      case '[object Array]':
        return 'array';
      case '[object Object]':
        return 'object';
      case '[object File]':
        return 'file';
      case '[object String]':
        return 'string';
      case '[object Number]':
        return 'number';
      case '[object Boolean]':
        return 'boolean';
      case '[object Function]':
        return 'function';
      case '[object Null]':
        return null;
      default:
        return undefined;
    }
  };
  
  export default getType;
  