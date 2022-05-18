export default function validate(values) {
  const errors = {};

  if (!values.startupName) {
    errors.startupName = true;
    errors.startupNameMessage = 'Startup name is required';
  }

  return errors;
}
