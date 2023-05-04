import * as yup from "yup";

export const AddUsersScheme = yup.object().shape({
  email: yup
    .string()
    .email("Введите правильный адрес электронной почты")
    .transform((value) => value.trim().replace(/,+$/, "")),
});
