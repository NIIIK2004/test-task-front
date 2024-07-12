import { Link, useNavigate } from "react-router-dom";
import Logo from '../../assets/image/header/Logo.svg';
import Button from "../Button/Button";
import { useState } from "react";
import axios from 'axios';


export default function Registration() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const handleRegistration = async (event) => {
        event.preventDefault(); 
        if (password !== passwordConfirm) {
            setError("Пароли не совпадают");
            return;
        }

        try {
            const response = await axios.post('http://localhost:7362/auth/registration', {
                username: username,
                password: password,
            });
            console.log(response.data);
            navigate("/auth");
        } catch (error) {
            console.error('Ошибка регистрации:', error);
        }
    }

    return (
        <section className="auth">
            <div className="container">
                <img src={Logo} className="logo_auth" />
                <form onSubmit={handleRegistration} className="auth__wrapper">
                    <div className="auth_top">
                        <h1 className="auth__title">Регистрация</h1>
                        <Link className="auth__link" to="/auth">Уже имеете аккаунт? Войдите!</Link>
                    </div>
                    <div className="auth__inputs">
                        <div className="auth__input">
                            <label htmlFor="FIO">Ваше ФИО</label>
                            <input className="input" id="FIO" type="text" placeholder="Введите имя" />
                            <span>Тут будет ошибка</span>
                        </div>

                        <div className="auth__input">
                            <label htmlFor="login">Логин</label>
                            <input
                                className="input"
                                id="login"
                                type="text"
                                placeholder="Придумайте логин"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <span>Тут будет ошибка</span>
                        </div>

                        <div className="auth__input">
                            <label htmlFor="number">Телефон</label>
                            <input className="input" id="number" type="text" placeholder="+7-(918)" />
                            <span>Тут будет ошибка</span>
                        </div>

                        <div className="auth__input">
                            <label htmlFor="email">Почта</label>
                            <input className="input" id="email" type="email" placeholder="Введите свою почту" />
                            <span>Тут будет ошибка</span>
                        </div>

                        <div className="auth__input">
                            <label htmlFor="password">Пароль </label>
                            <input
                                className="input"
                                id="password"
                                type="password"
                                placeholder="Надежный, защищенный, Правильный"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span>Тут будет ошибка</span>
                        </div>

                        <div className="auth__input">
                            <label htmlFor="passwordConfirm">Подтверждение пароля</label>
                            <input
                                className="input"
                                id="passwordConfirm"
                                type="password"
                                placeholder="Повторите пароль"
                                value={passwordConfirm}
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                            />
                            <span>Тут будет ошибка</span>
                        </div>
                    </div>
                    <div className="auth_send">
                        <div className="auth__agreement">
                            <input id="OkSendForm" type="checkbox" />
                            <label htmlFor="OkSendForm" className="auth__link">Я согласен на обработку персональных данных</label>
                        </div>
                        <Button titleBtn={'Зарегистрироваться'} />
                    </div>
                </form>
            </div>
        </section>
    );
}