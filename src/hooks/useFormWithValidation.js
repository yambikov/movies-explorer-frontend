import { useState, useCallback } from "react"

function useFormWithValidation() {
  const [formValue, setFormValue] = useState({})
  const [errors, setErrors] = useState({})
  const [isFormValid, setIsFormValid] = useState(false)

  const errorMessages = {
    name: "Имя должно содержать только латиницу, кириллицу, пробел или дефис",
    email: "Неверный формат email",
    password: "Пароль должен быть не менее 8 символов",
    search: "Нужно ввести ключевое слово"
  }

  const emailValidation = (e) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(e).toLowerCase());
  };

  const nameValidation = (name) => {
    // eslint-disable-next-line no-useless-escape
    const regex = /^[A-Za-zА-Яа-яЁё\s\-]+$/;
    return regex.test(name);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (e.target.type === "email") {
      const validation = emailValidation(value);
      setFormValue({ ...formValue, [name]: value })
      setErrors({ ...errors, [name]: !validation ? errorMessages.email : "" });
      setIsFormValid(validation && e.target.closest("form").checkValidity());
    } else if (name === "name") {
      const validation = nameValidation(value);
      setFormValue({ ...formValue, [name]: value });
      setErrors({ ...errors, [name]: !validation ? errorMessages.name : "" });
      setIsFormValid(validation && e.target.closest("form").checkValidity());
    } else {
      setFormValue({ ...formValue, [name]: value });
      setErrors({ ...errors, [name]: e.target.validationMessage });
      setIsFormValid(e.target.closest("form").checkValidity());
    }
  }

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setFormValue(newValues)
      setErrors(newErrors)
      setIsFormValid(newIsValid)
    },
    [setFormValue, setErrors, setIsFormValid]
  )

  return {
    formValue,
    handleChange,
    errors,
    isFormValid,
    resetForm,
    errorMessages,
  }
}

export default useFormWithValidation
