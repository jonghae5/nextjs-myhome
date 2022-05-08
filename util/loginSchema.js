import { string, object } from 'yup';

export const loginSchema = object().shape({
  email: string().email('invalid email address').required('Email is Required'),
  password: string()
    .required('Passworid is Required')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
});
