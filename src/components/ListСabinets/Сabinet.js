import Star from '../../assets/image/header/Star.svg';
import Like from '../../assets/image/header/Like.svg';
import Shkaf from '../../assets/image/сabinet/test.png';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';


export default function Cabinet({ wardrobe }) {
    return (
        <li className="cabinets__block" key={wardrobe.id}>
            <Link to={`/wardrobe/${wardrobe.id}`}>
                <div className="cabinets_img-inner">
                    <img className="cabinets__img" src={`http://localhost:7362/uploads/${wardrobe.filename}`} alt={wardrobe.title} />
                    <div className="cabinets_panel">
                        <a href="#">
                            <img src={Star} alt="" />
                        </a>
                        <a href="#">
                            <img src={Like} alt="" />
                        </a>
                    </div>
                </div>
                <h2 className="cabinets__title">{wardrobe.title}</h2>
                <span className="cabinets__stock">В наличии: ({wardrobe.quantity} шт)</span>
                <div className="cabinets__bottom">
                    <Button titleBtn="Купить" />
                    <div className="cabinets_cost">
                        <p>{wardrobe.price} ₽</p>
                        <span>{wardrobe.old_price} ₽</span>
                    </div>
                </div>
            </Link>
        </li>
    );
}