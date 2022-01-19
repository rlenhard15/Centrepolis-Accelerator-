export default function validate(values) {
  let errors = {}

  if (!values.startupName) {
    errors.startupName = true
    errors.startupNameMessage = 'Startup name is required'
  }

  return errors
};
