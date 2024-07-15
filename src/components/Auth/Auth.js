import { Link, useNavigate } from "react-router-dom";
import Logo from '../../assets/image/header/Logo.svg';
import Button from "../Button/Button";
import { useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';
import axios from "axios";

axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default function Auth() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const userRole = decodedToken.role;
                localStorage.setItem('role', userRole);
                navigate('/');
            } catch (error) {
                console.error('Ошибка декодирования токена:', error);
                localStorage.removeItem('token');
                localStorage.removeItem('role');
            }
        }
    }, [navigate]);

    const handleAuth = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:7362/auth/login', {
                username: username,
                password: password,
            });
            console.log(response.data);
            localStorage.setItem('token', response.data.token);
            const decodedToken = jwtDecode(response.data.token); 
            const userRole = decodedToken.role;
            localStorage.setItem('role', userRole);
            navigate("/")
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error('Ошибка авторизации:', error);
                setError("Неверные учетные данные");
            } else {
                setError("Произошла ошибка. Пожалуйста, попробуйте снова.");
            }
        }
    };

    return (
        <section className="auth">
            <div className="container">
                <img src={Logo} className="logo_auth" />
                <form onSubmit={handleAuth} className="auth__wrapper">
                    <div className="auth_top">
                        <h1 className="auth__title">Авторизация</h1>
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
                        </div>
                    </div>
                    <div className="auth_send">
                        <Button titleBtn={'Войти'} />
                        {error && <span className="error">{error}</span>}
                    </div>
                </form>
            </div>
        </section>
    )
}