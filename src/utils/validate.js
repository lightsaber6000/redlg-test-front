import { required, email } from './validators';

const rules = {
    required,
    email,
};

export default (validationObject, value) => {
    return Object.keys(validationObject).reduce((result, id) => {
        const isValid = rules[id](value);
        if (!isValid) result.push(validationObject[id].message);
        return result;
    }, []);
};
