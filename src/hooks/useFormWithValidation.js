import { useState, useCallback } from "react";

function useFormWithValidation() {
  const [formValue, setFormValue] = useState({});
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const errorMessages = {
    name: "Имя может содержать буквы, пробел и дефис",
    email: "Пожалуйста, введите корректный email адрес",
    password: "Пароль должен быть не менее 8 символов",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({ ...formValue, [name]: value });
    setErrors({ ...errors, [name]: e.target.validationMessage });
    setIsFormValid(e.target.closest("form").checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setFormValue(newValues);
      setErrors(newErrors);
      setIsFormValid(newIsValid);
    },
    [setFormValue, setErrors, setIsFormValid]
  );

  return { formValue, handleChange, errors, isFormValid, resetForm, errorMessages };
}

export default useFormWithValidation;