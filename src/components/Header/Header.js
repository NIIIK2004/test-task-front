import Logo from '../../assets/image/header/Logo.svg';
import Location from '../../assets/image/header/Location.svg';
import Office from '../../assets/image/header/Office.svg';
import Phone from '../../assets/image/header/Phone.svg';
import Star from '../../assets/image/header/Star.svg';
import Like from '../../assets/image/header/Like.svg';
import Basket from '../../assets/image/header/Basket.svg';
import User from '../../assets/image/header/User.svg';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <div className="container">
        <div className="subheader">
          <ul>
            <li>
              <a href="#">
                <img src={Location} alt="" />Белореченск
              </a>
            </li>
            <li>
              <a href="tel:+8 (495) 744-72-33">
                <img src={Phone} alt="" />
                8 (495) 744-72-33
              </a>
            </li>
            <li>
              <a href="#">
                <img src={Office} alt="" />С 07:00 до 20:00 мск
              </a>
            </li>
          </ul>
        </div>

        <div className="header">
          <div className="header-left">
            <img src={Logo} />
            <label className="search" for="inputSearch">
              <input id="inputSearch" type="search" placeholder='Поиск' />
            </label>
          </div>
          <div className="header-right">
            <ul className='header_list-link'>
              <li>
                <a href="#">
                  <img src={Star} alt="" />
                  Сравниваемые
                </a>
              </li>
              <li>
                <a href="#">
                  <img src={Like} alt="" />
                  Избранное
                </a>
              </li>
              <li>
                <a href="#">
                  <img src={Basket} alt="" />
                  Корзина
                </a>
              </li>
              <li>
                <Link to="/auth">
                  <img src={User} alt="" />Войти
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}