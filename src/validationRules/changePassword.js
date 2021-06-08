export default function validate(values) {
  let errors = {}

  if (!values.currentPassword) {
    errors.currentPassword = true
    errors.currentPasswordError = '* is required'
  }

  if (!values.newPassword) {
    errors.newPassword = true
    errors.newPasswordError = '* is required'
  } else if (values.newPassword.length < 6) {
    errors.newPassword = true
    errors.newPasswordError = 'Password must be 8 or more characters'
  }

  return errors
};
