import * as yup from "yup";

export const PostScheme = yup.object().shape({
  title: yup
    .string()
    .min(15, "Заголовок должен быть как минимум из 15 символов")
    .required("Поле обязательно для заполнения"),
  body: yup.array().min(1, "Поле обязательно для заполнения"),
});
