import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../UI/formControls/FormControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";

type FormData = {
    login: string;
    password: string;
    rememberMe: boolean;
};

type LoginFormProps = InjectedFormProps<FormData>;

const maxLength30 = maxLengthCreator(30)

//props handleSubmit из redux-form cобирает FormData
// и делает submit(onSubmit(formData) & preventDefault)
const LoginForm = ({handleSubmit}: LoginFormProps) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field
                    // component={"input"}
                    component={Input}
                    name={"login"}
                    placeholder={"Login"}
                    validate={[required, maxLength30]}
                />
            </div>
            <div>
                <Field
                    //component={"input"}
                    component={Input}
                    name={"password"}
                    placeholder={"Password"}
                    validate={[required, maxLength30]}
                />
            </div>
            <div>
                <Field
                    // component={"input"}
                    component={Input}
                    name={"rememberMe"}
                    type="checkbox"  /> Remember me
            </div>
            <div>
                <button>Login</button>
            </div>

        </form>
    )
}

//каждой форме даём уникальное имя ("login")
const LoginReduxForm = reduxForm<FormData, {}>({
    form: "login"
})(LoginForm);

const Login = () => {
    const onSubmit = (formData: FormData) => {
        console.log(formData)
    }
    return (
        <div>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
};

export default Login;