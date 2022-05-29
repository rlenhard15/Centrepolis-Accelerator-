import { useEffect, useState } from 'react';

const useForm = (callback, validate, initialValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  const handleSubmit = e => {
    if (e) e.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  const handleChange = e => {
    e.persist();
    setValues(values => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  return {
    handleChange,
    handleSubmit,
    setValues,
    values,
    errors,
    setErrors,
  };
};

export default useForm;
