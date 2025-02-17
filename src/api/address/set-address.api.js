import HTTP from '../http-common';

export default (params) => HTTP.post('/api/address/store', params);
