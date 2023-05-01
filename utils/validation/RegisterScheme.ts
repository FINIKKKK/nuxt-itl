import * as yup from "yup";

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
