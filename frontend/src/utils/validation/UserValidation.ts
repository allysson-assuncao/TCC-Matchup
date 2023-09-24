import * as Yup from "yup";
import {emailExists} from "../../api/user_requests/login";
import {isEmailAvailable, isUsernameAvailable} from "../../api/user_requests/register";

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
    email:
        Yup.string()
            .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Email inválido!")
            .required('Campo obrigatório!')
            .test('email', 'Esse Email já está em Uso!',  async (value)  => {
                return await isEmailAvailable(value);
            }),

    username:
        Yup.string()
            .required('Campo obrigatório!')
            .min(5, 'O Nome de Usuário deve ter no mínimo 5 caracteres!')
            .max(20, 'O Nome de Usuário deve ter no máximo 20 caracteres!')
            .matches(/^(?!.*[-_.]{2})[a-zA-Z0-9][a-zA-Z0-9-_.]*[a-zA-Z0-9]$/, 'Nome de usuário não pode possuir símbolos diferentes de "_", "-" e ".", e só podem estar entre caracteres!')
            .test('username', 'Nome de Usuário já está em Uso!',  async (value)  => {
                return await isUsernameAvailable(value);
            }),
    rawPassword: Yup.string()
        .min(8, 'A senha deve ter no mínimo 8 caracteres!')
        .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*_])(?=.*[0-9])[A-Za-z0-9!@#$%^&*_\d]{8,255}$/, 'A senha deve conter letras maiúsculas, minúsculas e símbolos!')
        .required('Campo obrigatório!'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('rawPassword'), undefined], 'As senhas devem coincidir!')
        .required('Campo obrigatório!')
    ,
    birthDate: Yup.date().required('Campo obrigatório!'),
});



export const validateSignUpStep2 = Yup.object().shape({
    addressZipcode: Yup.string().required('Campo obrigatório!').matches(/^\d{5}-\d{3}$/, 'CEP inválido. Formato esperado: 00000-000'),
    addressState: Yup.string().required('Campo obrigatório!') ,
    addressCity: Yup.string().required('Campo obrigatório!'),
    addressNeighborhood: Yup.string().required('Campo obrigatório!'),
    addressStreet: Yup.string().required('Campo obrigatório!'),
    addressNumber: Yup.number().required('Campo obrigatório!').min(0, 'O Número não pode ser negativo!'),
});

export const validateSignUpStep3 = Yup.object().shape({});

export const validateSignUpStep4 = Yup.object().shape({
    cellphoneNumber: Yup.string().matches(/^\(\d{2}\) \d{5}-\d{4}$/, 'Número de telefone inválido. Formato esperado: (99) 99999-9999'),
    /*.matches(/!*!/^(?:\\d{2}\\s?)?(?:9\\d{4}-\\d{4})$/!*!/, "Número de Celular Inválido!"),*/
    bio: Yup.string(),

});

export const validateForgotPasswordStep1 = Yup.object().shape({
    email: Yup.string()
        .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Email inválido!")
        .required('Campo obrigatório!'),
});

export const validateForgotPasswordStep2 = Yup.object().shape({
    code: Yup.string().min(6, 'O código deve ter 6 caracteres!').max(6, 'O código deve ter 6 caracteres!').required('Campo obrigatório!'),
});

export const validateForgotPasswordStep3 = Yup.object().shape({
    password: Yup.string()
        .min(8, 'A senha deve ter no mínimo 8 caracteres!')
        .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*_])(?=.*[0-9])[A-Za-z0-9!@#$%^&*_\d]{8,255}$/, 'A senha deve conter letras maiúsculas, minúsculas e símbolos!')
        .required('Campo obrigatório!'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('rawPassword'), undefined], 'As senhas devem coincidir!')
        .required('Campo obrigatório!')
});
