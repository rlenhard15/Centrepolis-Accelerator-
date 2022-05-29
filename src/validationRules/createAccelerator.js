export default function validate(values) {
  const errors = {};

  if (!values.name) {
    errors.name = true;
    errors.name = 'Accelerator name is required';
  }

  return errors;
}
