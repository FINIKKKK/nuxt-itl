import * as yup from "yup";

export const LoginScheme = yup.object().shape({
    email: yup
        .string()
        .email("Некорректный email")
        .required("Поле является обязательным"),
    password: yup.string().required("Поле является обязательным"),
});

export const RegisterScheme = yup.object().shape({
    firstName: yup.string().required("Поле является обязательным"),
    lastName: yup.string().required("Поле является обязательным"),
    email: yup
        .string()
        .required("Поле является обязательным")
        .email("Некорректный email"),
    password: yup
        .string()
        .required("Поле является обязательным")
        .min(6, "Пароль должен состоять минимум из 6 символов"),
    password_confirmation: yup
        .string()
        .required("Поле является обязательным")
        .oneOf([yup.ref("password")], "Пароли должны совпадать"),
});

export const CompanyScheme = yup.object().shape({
    name: yup
        .string()
        .min(3, "Поле должно быть не менее 3 символов")
        .required("Поле является обязательным"),
    address: yup
        .string()
        .min(3, "Поле должно быть не менее 3 символов")
        .required("Поле является обязательным"),
});

export const AddUsersScheme = yup.object().shape({
    email: yup
        .string()
        .email("Введите правильный адрес электронной почты")
        .transform((value) => value.trim().replace(/,+$/, "")),
});

export const PostScheme = yup.object().shape({
    title: yup
        .string()
        .min(5, "Заголовок должен быть как минимум из 5 символов")
        .required("Поле обязательно для заполнения"),
    body: yup.array().min(1, "Поле обязательно для заполнения"),
});

export const SectionScheme = yup.object().shape({
    title: yup
        .string()
        .min(5, "Заголовок должен быть как минимум из 5 символов")
        .required("Поле обязательно для заполнения"),
});


