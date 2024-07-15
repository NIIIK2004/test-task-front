import { Link, useNavigate } from "react-router-dom";
import Logo from '../../assets/image/header/Logo.svg';
import Button from "../Button/Button";
import { useState, useRef, useEffect } from "react";
import axios from 'axios';
import IMask from 'imask';


export default function Registration() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const phoneInputRef = useRef(null);

    useEffect(() => {
        if (phoneInputRef.current) {
            const maskOptions = {
                mask: '+{7}(000)000-00-00'
            };
            const mask = IMask(phoneInputRef.current, maskOptions);
            return () => {
                mask.destroy();
            };
        }
    }, []);


    const handleRegistration = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:7362/auth/registration', {
                username: username,
                full_name: fullName,
                email: email,
                phone: phone,
                password: password,
                hashed_password: confirmPassword,
            });
            console.log(response.data);
            navigate("/auth");
        } catch (error) {
            if (error.response && error.response.data && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                console.error('Ошибка регистрации:', error);
            }
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
                            <input
                                className="input"
                                id="FIO"
                                type="text"
                                placeholder="Введите имя"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)} />
                            <span className="error">{errors.fullName}</span>
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
                            <span className="error">{errors.username}</span>
                        </div>

                        <div className="auth__input">
                            <label htmlFor="number">Телефон</label>
                            <input
                                className="input"
                                id="number"
                                type="text"
                                placeholder="+7-(918)"
                                ref={phoneInputRef}
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)} />
                            <span className="error">{errors.phone}</span>
                        </div>

                        <div className="auth__input">
                            <label htmlFor="email">Почта</label>
                            <input
                                className="input"
                                id="email"
                                type="email"
                                placeholder="Введите свою почту"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                            <span className="error">{errors.email}</span>
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
                            <span className="error">{errors.password}</span>
                        </div>

                        <div className="auth__input">
                            <label htmlFor="confirmPassword">Подтверждение пароля</label>
                            <input
                                className="input"
                                id="confirmPassword"
                                type="password"
                                placeholder="Повторите пароль"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <span className="error">{errors.confirmPassword}</span>
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