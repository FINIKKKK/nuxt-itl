import * as yup from 'yup';

export const LoginScheme = yup.object().shape({
  email: yup
    .string()
    .email('Некорректный email')
    .required('Поле является обязательным'),
  password: yup.string().required('Поле является обязательным'),
});

export const RegisterScheme = yup.object().shape({
  firstName: yup.string().required('Поле является обязательным'),
  lastName: yup.string().required('Поле является обязательным'),
  email: yup
    .string()
    .required('Поле является обязательным')
    .email('Некорректный email'),
  password: yup
    .string()
    .required('Поле является обязательным')
    .min(6, 'Пароль должен состоять минимум из 6 символов'),
  password_confirmation: yup
    .string()
    .required('Поле является обязательным')
    .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
});

export const CompanyScheme = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Поле должно быть не менее 3 символов')
    .required('Поле является обязательным'),
  address: yup
    .string()
    .min(3, 'Поле должно быть не менее 3 символов')
    .required('Поле является обязательным'),
});

export const AddUsersScheme = yup.object().shape({
  email: yup
    .string()
    .email('Введите правильный адрес электронной почты')
    .transform((value) => value.trim().replace(/,+$/, '')),
});

export const PostScheme = yup.object().shape({
  title: yup
    .string()
    .min(5, 'Заголовок должен быть как минимум из 5 символов')
    .required('Вы не ввели название статьи'),
  body: yup.array().min(1, 'Вы не ввели информацию о статье'),
  section_id: yup.number().required('Вы не выбрали раздел'),
});

export const SectionScheme = yup.object().shape({
  title: yup
    .string()
    .min(5, 'Заголовок должен быть как минимум из 5 символов')
    .required('Вы не ввели название раздела'),
});

export const ResetPasswordScheme = yup.object().shape({
  email: yup
    .string()
    .email('Введите правильный адрес электронной почты')
    .required('Поле обязательно для заполнения'),
});

export const UserDataScheme = yup.object().shape({
  firstName: yup.string().required('Поле является обязательным'),
  lastName: yup.string().required('Поле является обязательным'),
  email: yup
    .string()
    .required('Поле является обязательным')
    .email('Некорректный email'),
});

export const PasswordScheme = yup.object().shape({
  old_password: yup.string().required('Поле является обязательным'),
  new_password: yup
    .string()
    .required('Поле является обязательным')
    .min(6, 'Пароль должен состоять минимум из 6 символов'),
  password_confirmation: yup
    .string()
    .required('Поле является обязательным')
    .oneOf([yup.ref('new_password')], 'Пароли должны совпадать'),
});


