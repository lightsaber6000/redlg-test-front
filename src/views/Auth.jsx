import FieldInput from '../components/FieldInput';
import FormProvider from '../components/FormProvider';
import { useAuth } from "../components/AuthProvider";
import { useRef, useState, useEffect} from 'react';
import { useNavigate } from "react-router";
import isEmpty from '../utils/isEmpty';

export default function Auth() {
    const formRef = useRef(null);
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();
    const { user, login } = useAuth();

    useEffect(() => {
        if (!isEmpty(user)) {
            navigate("/");
        }
    }, [user, navigate]);

    const clickHandler = async () => {
        setFormErrors(null);
        if (!formRef.current.validate()) return;
        const credentials = Object.keys(formRef.current.formObj).reduce((result, key) => {
            return { ...result, [key]: formRef.current.formObj[key].value }
        }, {});
        const errors = await login(credentials);
        if (isEmpty(errors)) {
            navigate("/");
        } else {
            setFormErrors(errors);
        }
    };

    return (
        <div className='auth-container'>
            <form>
                <FormProvider ref={formRef} errors={formErrors}>
                    <div className="field-list">
                        <FieldInput
                            name="email"
                            title="Email"
                            validationRules={{
                                required: { message: 'Необходимо указать email'},
                                email: { message: 'Необходимо указать корректный email' },
                            }}
                        />
                        <FieldInput 
                            name="password"
                            title="Пароль"
                            hidden={true}
                            validationRules={{
                                required: { message: 'Необходимо указать пароль' },
                            }}
                        />
                    </div>
                </FormProvider>
                <button type="button" className="button" onClick={clickHandler}>Войти</button>
            </form>
        </div>
    )
};