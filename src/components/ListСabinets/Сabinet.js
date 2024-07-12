import Star from '../../assets/image/header/Star.svg';
import Like from '../../assets/image/header/Like.svg';
import Shkaf from '../../assets/image/сabinet/test.png';
import Button from '../Button/Button';

export default function Сabinet() {
    return (
        <li className="cabinets__block">
            <a href="#">
                <div className="cabinets__img">
                    <img src={Shkaf} alt={Shkaf} />
                    <div className="cabinets_panel">
                        <a href="#">
                            <img src={Star} alt="" />
                        </a>
                        <a href="#">
                            <img src={Like} alt="" />
                        </a>
                    </div>
                </div>
                <h2 className="cabinets__title">Шкаф-купе дверный экспресс 2-х дверный (Зеркало)</h2>
                <span className="cabinets__stock">В наличии: (10шт)</span>
                <div className="cabinets__bottom">
                    <Button titleBtn="Купить" />
                    <div className="cabinets_cost">
                        <p>22 740 ₽</p>
                        <span>45 480 ₽</span>
                    </div>
                </div>
            </a>
        </li>
    );
}