export default function validate(values) {
  const errors = {};

  if (!values.password) {
    errors.password = true;
    errors.passwordError = '* is required';
  } else if (values.password.length < 6) {
    errors.password = true;
    errors.passwordError = 'Password must be 8 or more characters';
  }

  return errors;
}
