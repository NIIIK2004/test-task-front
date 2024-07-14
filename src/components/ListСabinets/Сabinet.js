import Star from '../../assets/image/header/Star.svg';
import Like from '../../assets/image/header/Like.svg';
import Shkaf from '../../assets/image/сabinet/test.png';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function Cabinet({ wardrobe, onDelete }) {

    const handleDelete = async () => {
        const confirmDelete = window.confirm(`Вы уверены, что хотите удалить шкаф "${wardrobe.title}"?`);
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:7362/admin/wardrobe/delete/${wardrobe.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            alert("Шкаф успешно удален");
            onDelete(wardrobe.id);
        } catch (error) {
            console.error('Ошибка при удалении шкафа:', error);
            alert("Произошла ошибка при удалении шкафа.");
        }
    }


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
            <div className="panel_admin">
                <button className="cabinet_delete" onClick={handleDelete}></button>
                <Link className="cabinet_edit" to={`/wardrobe/edit/${wardrobe.id}`}></Link>
            </div>

        </li>
    );
}