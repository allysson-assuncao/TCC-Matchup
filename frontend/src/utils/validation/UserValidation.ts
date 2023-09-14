import * as Yup from "yup";
import {emailExists} from "../../api/login_requests/login";
import {usernameExists} from "../../api/login_requests/register";

export var isEmail: boolean;
export const validationLogin = Yup.object().shape({
    emailOrUsername: Yup.string()
        .required('O campo de email ou nome de usuário deve ser preenchido!')
        .test('emailOrUsername', 'Email ou nome de usuário está inválido!', (value) => {
            return validateEmail(value) || validateUsername(value);
        }),
    password: Yup.string()
        .min(8, /*'A senha deve ter no mínimo 8 caracteres!'*/)
        .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*_])(?=.*[0-9])[A-Za-z0-9!@#$%^&*_\d]{8,255}$/, /*'A senha deve conter letras maiúsculas, minúsculas e símbolos!'*/)
        .required(''/*'É necessário preencher o campo de senha!'*/),
});


export const validateEmail = (email: string | undefined) => {
    isEmail = Yup.string()
        .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        .test('emailOrUsername'/*, 'Email ou nome de usuário está inválido!'*/, (value) => {
            return validateEmail(value) || validateUsername(value);
        })
        .isValidSync(email);
    //isEmail = Yup.string().email().isValidSync(email)

    return true;
};

export const validateUsername = (username: string | undefined) => {
    isEmail = !Yup.string()
        .matches(/^(?!.*[-_.]{2})[a-zA-Z0-9][a-zA-Z0-9-_.]*[a-zA-Z0-9]$/, 'Nome de usuário inválido!')
        .isValidSync(username);
    return !isEmail;
}


export const validateSignUpStep1 = Yup.object().shape({
    name: Yup.string()
        .required('Campo obrigatório!'),
    username:
        Yup.string()
            .required('Campo obrigatório!')
            .min(5, 'O Nome de Usuário deve ter no mínimo 5 caracteres!')
            .max(20, 'O Nome de Usuário deve ter no máximo 20 caracteres!')
            .matches(/^(?!.*[-_.]{2})[a-zA-Z0-9][a-zA-Z0-9-_.]*[a-zA-Z0-9]$/, 'Nome de usuário não pode possuir símbolos diferentes de "_", "-" e ".", e só podem estar entre caracteres!')
            /*.test('username', 'Nome de Usuário não está disponível!',  (value) => {
                return usernameExists(value);
            }),*/,

    email:
        Yup.string()
            .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Email inválido!")
            .required('Campo obrigatório!'),
    rawPassword: Yup.string()
        .min(8, 'A senha deve ter no mínimo 8 caracteres!')
        .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*_])(?=.*[0-9])[A-Za-z0-9!@#$%^&*_\d]{8,255}$/, 'A senha deve conter letras maiúsculas, minúsculas e símbolos!')
        .required('Campo obrigatório!'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('rawPassword'), null], 'As senhas devem coincidir!')
        .required('Campo obrigatório!')
    ,
    birthDate: Yup.date().required('Campo obrigatório!'),
});

export const validateSignUpStep2 = Yup.object().shape({
    name: Yup.string()
        .required('Campo obrigatório'),
    username:
        Yup.string()
            .required('Campo obrigatório')
            .matches(/^(?!.*[-_.]{2})[a-zA-Z0-9][a-zA-Z0-9-_.]*[a-zA-Z0-9]$/, 'Nome de usuário inválido!'),
    email: Yup.string().email('Email inválido').required('Campo obrigatório'),
    password: Yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Campo obrigatório'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'As senhas devem coincidir')
        .required('Campo obrigatório'),
});

export const validateSignUpStep3 = Yup.object().shape({});

export const validateSignUpStep4 = Yup.object().shape({
    cellphoneNumber: Yup.string()
        .matches(/^(?:\\d{2}\\s?)?(?:9\\d{4}-\\d{4})$/, "Número de Celular Inválido!"),
    bio: Yup.string(),

});

export const validateForgotPasswordStep1 = Yup.object().shape({});

export const validateForgotPasswordStep2 = Yup.object().shape({});

export const validateForgotPasswordStep3 = Yup.object().shape({});
