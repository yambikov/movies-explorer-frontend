import React, { useState } from "react"
import { Link } from "react-router-dom"
import Logo from "../Logo/Logo"
import Input from "../Input/Input";

function Register({ onRegister }) {
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
  })

  const [isFormValid, setIsFormValid] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()

    onRegister(formValue.name, formValue.email, formValue.password)
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormValue({
      ...formValue,
      [name]: value,
    })

    validateForm()
  }

  // Функция валидации для проверки, является ли форма валидной
  const validateForm = () => {
    const { name, email, password } = formValue

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    const isPasswordValid = password.length >= 6
    const isNameValid = name.length >= 2

    setIsFormValid(isNameValid && isEmailValid && isPasswordValid)
  }

  return (
    <main className="register">
      <section className="auth">
        <Logo />
        <form
          className="auth__form"
          name="registration"
          onSubmit={handleSubmit}
        >
          <h2 className="auth__title">Добро пожаловать!</h2>

          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Имя"
            minLength={2}
            maxLength={30}
            autoComplete="off"
            value={formValue.name}
            onChange={handleChange}
          />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            minLength={2}
            maxLength={30}
            autoComplete="off"
            value={formValue.email}
            onChange={handleChange}
          />
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            minLength={6}
            autoComplete="off"
            value={formValue.password}
            onChange={handleChange}
          />

          <button
            className={`auth__button ${isFormValid ? "auth__button_type_active" : ""
              }`}
            type="submit"
            disabled={!isFormValid}
          >
            Зарегистрироваться
          </button>
          <p className="auth__text">
            Уже зарегистрированы?
            <Link className="auth__login-link" to="/signin">
              Войти
            </Link>
          </p>
        </form>
      </section>
    </main>

  )
}

export default Register







// function Register({ onRegister }) {
//   const [formValue, setFormValue] = useState({
//     email: "",
//     password: "",
//   })

//   const [isFormValid, setIsFormValid] = useState(false)

//   function handleSubmit(e) {
//     e.preventDefault()

//     onRegister(formValue.name, formValue.password, formValue.email)
//   }

//   const handleChange = (e) => {
//     const { name, value } = e.target

//     setFormValue({
//       ...formValue,
//       [name]: value,
//     })

//     validateForm()
//   }

//   // Функция валидации для проверки, является ли форма валидной
//   const validateForm = () => {
//     const { email, password } = formValue

//     const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
//     const isPasswordValid = password.length >= 6

//     setIsFormValid(isEmailValid && isPasswordValid)
//   }

//   return (
//     <main className="register">
//       <section className="auth">
//         <Logo />
//         <form
//           className="auth__form"
//           name="registration"
//           onSubmit={handleSubmit}
//         >
//           <h2 className="auth__title">Добро пожаловать!</h2>

//           <label htmlFor="name" className="auth__label">Имя</label>
//           <input
//             id="name"
//             className="auth__item"
//             name="name"
//             type="text"
//             placeholder="Имя"
//             minLength={2}
//             maxLength={30}
//             autoComplete="off"
//             required
//             value={formValue.name}
//             onChange={handleChange}
//           />
//           <span className="input-error-name error" />
//           {/* <span className="input-error-name error">123</span> */}

//           <label htmlFor="email" className="auth__label">E-mail</label>
//           <input
//             id="email"
//             className="auth__item"
//             name="email"
//             type="email"
//             placeholder="Email"
//             minLength={2}
//             maxLength={30}
//             autoComplete="off"
//             required
//             value={formValue.email}
//             onChange={handleChange}
//           />
//           <span className="input-error-name error" />
//           {/* <span className="input-error-name error">123</span> */}

//           <label htmlFor="password" className="auth__label">Пароль</label>
//           <input
//             id="password"
//             className="auth__item"
//             name="password"
//             type="password"
//             placeholder="Пароль"
//             required
//             autoComplete="off"
//             value={formValue.password}
//             onChange={handleChange}
//           />
//           <span className="input-error-link error" />
//           {/* <span className="input-error-name error">123</span> */}

//           <button
//             className={`auth__button ${isFormValid ? "auth__button_type_active" : ""
//               }`}
//             type="submit"
//             disabled={!isFormValid}
//           >
//             Зарегистрироваться
//           </button>
//           <p className="auth__text">
//             Уже зарегистрированы?
//             <Link className="auth__login-link" to="/signin">
//               Войти
//             </Link>
//           </p>
//         </form>
//       </section>
//     </main>

//   )
// }

// export default Register
