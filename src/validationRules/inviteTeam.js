export default function validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = true;
    errors.email_message = 'Email is required';
  } else if (!/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(values.email)) {
    errors.email = true;
    errors.email_message = 'Email address is invalid';
  }

  if (!values.userType?.value) {
    errors.userType = true;
    errors.userTypeMsg = 'User type is required';
  }

  return errors;
}
