export default function validate(values) {
  let errors = {}

  if (!values.email) {
    errors.email = true
    errors.email_message = 'Email is required'
  } else if (!/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(values.email)) {
    errors.email = true
    errors.email_message = 'Email address is invalid'
  }

  return errors
}
