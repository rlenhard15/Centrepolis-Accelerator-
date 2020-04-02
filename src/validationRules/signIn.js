
export default function validate(values) {
  let errors = {};
  if (!values.email) {
    errors.email = true;
    errors.email_message = '* email is required';
  } else if (!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(values.email)) {
    errors.email = true;
    errors.email_message = '* email address is invalid';
  }
  if (!values.password) {
    errors.password = true;
    errors.password_message = '* password is required';
  } else if (values.password.length < 6) {
    errors.password = true;
    errors.password_message = '* password must be 8 or more characters';
  }

  return errors;
};