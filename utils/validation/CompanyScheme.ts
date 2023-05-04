import * as yup from "yup";

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
