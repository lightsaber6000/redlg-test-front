import getType from '../utils/getType';
import isEmpty from '../utils/isEmpty';

import { createContext, useContext, useState, useEffect, useImperativeHandle } from 'react';

const FormContext = createContext();

export default function FormProvider({ ref, children, errors }) {
    const [formObj, setFormObj] = useState({});
    const [dirty, setDirty] = useState(false);
    const [validated, setValidated] = useState(false);

    useImperativeHandle(ref, () => ({
        formObj,
        validate() {
            setDirty(true);
            setValidated(true);
            return Object.values(formObj).every(({ isValid }) => isValid);
        },
    }));

    useEffect(() => {
        setValidated(false);
    }, [formObj]);

    return (
        <FormContext.Provider value={{ formObj, dirty, setFormObj }}>
            { children }
            <div className="form-errors">
                { validated && !isEmpty(errors) && getType(errors) === 'string' 
                    && <p className='form-errors__item'>{errors}</p>}

                { validated && !isEmpty(errors) && getType(errors) === 'object' && (
                    Object.values(errors)
                        .flat()
                        .map((error, index) => (
                            <p className='form-errors__item' key={index}>{error}</p>
                        ))
                )}
            </div>
        </FormContext.Provider>
    );
};

export const useForm = () => {
  return useContext(FormContext);
};
