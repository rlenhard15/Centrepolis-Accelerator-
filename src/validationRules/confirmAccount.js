export default function validate(values) {
  let errors = {};
  if (!values.first_name) {
    errors.first_name = true;
    errors.first_name_message = '* first name is required';
  }
  if (!values.last_name) {
    errors.last_name = true;
    errors.last_name_message = '* last name is required';
  }
  if (!values.password) {
    errors.password = true;
    errors.password_message = '* password is required';
  } else if (values.password.length < 6) {
    errors.password = true;
    errors.password_message = '* password must be 8 or more characters';
  }
  if (!values.password_confirmation) {
    errors.password_confirmation = true;
    errors.password_confirmation_message = '* password confirmation is required';
  } else if (values.password !== values.password_confirmation) {
    errors.password_confirmation = true;
    errors.password_confirmation_message = '* password do not match ';
  }
  return errors;
};