import useUniqueId from '../utils/uid';
import validate from '../utils/validate';
import getType from '../utils/getType';
import { useState, useEffect } from 'react';
import { useForm } from "../components/FormProvider";

export default function FieldInput({
    name,
    title,
    validationRules = {},
    hidden = false,
    value,
 }) {
    const [uid] = useState(useUniqueId());
    const [valid, setValid] = useState(false);
    const [dirty, setDirty] = useState(false);
    const [error, setError] = useState('');
    const [showError, setShowError] = useState(false);
    const { 
      formObj,
      setFormObj,
      dirty: formDirty,
    } = useForm();

    const validateInternal = (value = null) => {
      if (getType(formObj) !== 'object') return;
      const errorsList = validate(validationRules, value);
      setValid(!errorsList.length);
      setError(errorsList[0]);
      setFormObj((prevFormObj) => ({
        ...prevFormObj,
        [name || uid]: { isValid: valid, value },
      }));
    };

    const handleInput = (e) => {
      validateInternal(e.target.value);
    };

    const handleBlur = () => {
      setDirty(true);
    };

    useEffect(() => {
      validateInternal();
    }, []);

    useEffect(() => {
      setShowError((dirty || formDirty) && !valid);
    }, [dirty, formDirty, valid]);

    return (
      <div className="field">
        <label htmlFor={`input-${uid}`} className="field__label">{ title }</label>
        <div className="field__input-wrapper">
            <input 
                type={hidden ? 'password' : 'text'}
                id={`input-${uid}`} 
                className="input field__input"
                onInput={handleInput}
                onBlur={handleBlur}
            />
            {showError && <p className="field__error" id={`input-error-${uid}`}>{error}</p>}
        </div>
      </div>  
    );
};