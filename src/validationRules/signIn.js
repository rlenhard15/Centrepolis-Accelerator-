export default function validate(values) {
  const errors = {};
  if (!values.email) {
    errors.email = true;
    errors.email_message = 'Email is required';
  } else if (!/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(values.email)) {
    errors.email = true;
    errors.email_message = 'Email address is invalid';
  }
  if (!values.password) {
    errors.password = true;
    errors.password_message = 'Password is required';
  } else if (values.password.length < 6) {
    errors.password = true;
    errors.password_message = 'Password must be 8 or more characters';
  }

  return errors;
}
