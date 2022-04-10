import React, { useContext } from 'react'
import { AuthContext } from '../components/context'
import MyButton from '../components/UI/button/MyButton'
import MyInput from '../components/UI/input/MyInput'
import '../styles/App.css'

const Login = () => {
    const { isAuth, setIsAuth } = useContext(AuthContext);

    const login = event => {
        event.preventDefault();
        setIsAuth(true);
        localStorage.setItem('auth', 'true')
    }

    return (
        <div className="public__form">
            <h1>Сторінка для логіна</h1>
            <form onSubmit={login}>
                <MyInput type="text" placeholder="Введіть логін" />
                <MyInput type="password" placeholder="Введіть пароль" />
                <MyButton>Войти</MyButton>
            </form>
        </div>
    )
}

export default Login
