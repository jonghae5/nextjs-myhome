import { string, object } from 'yup';

export const loginSchema = object().shape({
  email: string().email('invalid email address').required('Required'),
  password: string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
});
