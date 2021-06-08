export default function validate(values) {
  let errors = {}

  if (!values.firstName) {
    errors.firstName = true
    errors.firstNameError = '* is required'
  }

  if (!values.lastName) {
    errors.lastName = true
    errors.lastNameError = '* is required'
  }

  if (!values.email) {
    errors.email = true
    errors.emailError = '* is required'
  } else if (!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(values.email)) {
    errors.email = true
    errors.email_message = 'Email address is invalid'
  }

  if (!values.phoneNumber) {
    errors.phoneNumber = true
    errors.phoneNumberError = '* is required'
  }

  return errors
};
