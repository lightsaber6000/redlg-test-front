import HTTP from '../http-common';

export default () => HTTP.get('/sanctum/csrf-cookie');