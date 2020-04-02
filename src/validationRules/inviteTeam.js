export default function validate(values) {
  let errors = {};
  if (!values.email) {
    errors.email = true;
    errors.email_message = '* email is required';
  } else if (!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(values.email)) {
    errors.email = true;
    errors.email_message = '* email address is invalid';
  }
  if (!values.company_name) {
    errors.company_name = true;
    errors.company_name_message = '* company name is required';
  }

  return errors;
};