export default function validate(values) {
  let errors = {};
  if (!values.first_name) {
    errors.first_name = true;
    errors.first_name_message = 'First name is required';
  }
  if (!values.last_name) {
    errors.last_name = true;
    errors.last_name_message = 'Last name is required';
  }
  if (!values.password) {
    errors.password = true;
    errors.password_message = 'Password is required';
  } else if (values.password.length < 6) {
    errors.password = true;
    errors.password_message = 'Password must be 8 or more characters';
  }
  return errors;
};