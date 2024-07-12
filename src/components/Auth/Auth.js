import { Link, useNavigate } from "react-router-dom";
import Logo from '../../assets/image/header/Logo.svg';
import Button from "../Button/Button";
import { useState } from "react";
import axios from "axios";

export default function Auth() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const handleAuth = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:7362/auth/login', {
                username: username,
                password: password,
            });
            console.log(response.data);
            navigate("/")
        } catch (error) {
            console.error('Ошибка авторизации:', error);
        }
    }

    return (
        <section className="auth">
            <div className="container">
                <img src={Logo} className="logo_auth" />
                <form onSubmit={handleAuth} className="auth__wrapper">
                    <div className="auth_top">
                        <h1 className="auth__title">Регистрация</h1>
                        <Link className="auth__link" to="/reg">Нет аккаунта? Зарегистрироваться?</Link>
                    </div>
                    <div className="auth__inputs">
                        <div className="auth__input">
                            <label htmlFor="username">Логин</label>
                            <input
                                className="input"
                                id="username"
                                type="text"
                                placeholder="Ваш логин"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <span>Тут будет ошибка</span>
                        </div>

                        <div className="auth__input">
                            <label htmlFor="password">Пароль </label>
                            <input
                                className="input"
                                id="password"
                                type="password"
                                placeholder="Ваш пароль"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span>Тут будет ошибка</span>
                        </div>

                    </div>
                    <div className="auth_send">
                        <Button titleBtn={'Войти'} />
                    </div>
                </form>
            </div>
        </section>
    )
}