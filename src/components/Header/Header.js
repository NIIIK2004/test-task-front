import * as images from '../images/image';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import axios from 'axios';

export default function Header() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, []);


  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:7362/logout', null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      navigate('/');
    } catch (error) {
      console.error('Ошибка выхода из системы:', error);

    }
  }

  return (
    <header>
      <div className="container">
        <div className="subheader">
          <ul>
            <li>
              <a href="#">
                <img src={images.Location} alt="" />Белореченск
              </a>
            </li>
            <li>
              <a href="tel:+8 (495) 744-72-33">
                <img src={images.Phone} alt="" />
                8 (495) 744-72-33
              </a>
            </li>
            <li>
              <a href="#">
                <img src={images.Office} alt="" />С 07:00 до 20:00 мск
              </a>
            </li>
          </ul>
        </div>

        <div className="header">
          <div className="header-left">
            <Link to={"/"}>
              <img src={images.Logo} />
            </Link>
            <label className="search" for="inputSearch">
              <input id="inputSearch" type="search" placeholder='Поиск' />
            </label>
          </div>
          <div className="header-right">
            <ul className='header_list-link'>
              <li>
                <a href="#">
                  <img src={images.Star} alt="" />
                  Сравниваемые
                </a>
              </li>
              <li>
                <a href="#">
                  <img src={images.Like} alt="" />
                  Избранное
                </a>
              </li>
              <li>
                <a href="#">
                  <img src={images.Basket} alt="" />
                  Корзина
                </a>
              </li>
              {isLoggedIn ? (
                <>
                  <li>
                    <Link to="/profile">
                      <img src={images.User} alt="" />Профиль
                    </Link>
                  </li>
                  <li>
                    <Button onClick={handleLogout} titleBtn={"Выход"} />
                  </li>
                </>
              ) : (
                <li>
                  <Link to="/auth">
                    <img src={images.User} alt="" />Войти
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header >
  );
}