import Star from '../../assets/image/header/Star.svg';
import Like from '../../assets/image/header/Like.svg';
import Shkaf from '../../assets/image/сabinet/test.png';
import Button from '../Button/Button';

export default function Cabinet({ cabinet }) {
    return (
        <li className="cabinets__block">
            <a href="#">
                <div className="cabinets__img">
                    <img src={cabinet.image} alt={cabinet.title} />
                    <div className="cabinets_panel">
                        <a href="#">
                            <img src={Star} alt="Star" />
                        </a>
                        <a href="#">
                            <img src={Like} alt="Like" />
                        </a>
                    </div>
                </div>
                <h2 className="cabinets__title">{cabinet.title}</h2>
                <span className="cabinets__stock">В наличии: {cabinet.quantity} шт</span>
                <div className="cabinets__bottom">
                    <Button titleBtn="Купить" />
                    <div className="cabinets_cost">
                        <p>{cabinet.price} ₽</p>
                        <span>{cabinet.totalPrice} ₽</span>
                    </div>
                </div>
            </a>
        </li>
    );
}