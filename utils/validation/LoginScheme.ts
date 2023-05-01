import * as yup from "yup";

export const LoginScheme = yup.object().shape({
  email: yup
    .string()
    .email("Некорректный email")
    .required("Поле является обязательным"),
  password: yup.string().required("Поле является обязательным"),
});
