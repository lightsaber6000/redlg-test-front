import getType from './getType';

const isEmpty = (val) => {
  switch (getType(val)) {
    case 'string':
    case 'array':
      if (!val.length) return true;
    case 'object':
      if (!Object.keys.length) return true;
    default:
      return val == null;
  }
};

export default isEmpty;
