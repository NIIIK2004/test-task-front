import { useEffect, useState } from 'react';
import Cabinet from './Сabinet'
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import * as images from '../images/image';

export default function ListСabinets({ titleSection, showAll }) {
    const [wardrobes, setWardrobes] = useState([]);

    useEffect(() => {
        const fetchWardrobes = async () => {
            try {
                const response = await axios.get('http://localhost:7362/all/wardrobe');
                setWardrobes(response.data.wardrobe || []);
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
            }
        };
        fetchWardrobes();
    }, []);

    const handleDeleteWardrobe = (id) => {
        setWardrobes((prevWardrobes) => prevWardrobes.filter((wardrobe) => wardrobe.id !== id));
    };

    const displayWardrobes = showAll ? wardrobes : wardrobes.slice(0, 5);
    const location = useLocation();

    return (
        <section className="cabinets__wrapper">
            <div className="container">
                <h1 className="title">{titleSection}</h1>
                <ul className="cabinets__list">
                    {location.pathname === '/' && (
                        <Link className='cabinets_create' to="/addCabinetForm">Добавить Шкаф</Link>
                    )}
                    {displayWardrobes.length > 0 ? (
                        displayWardrobes.map((wardrobe) => (
                            <Cabinet key={wardrobe.id} wardrobe={wardrobe} onDelete={handleDeleteWardrobe} />
                        ))
                    ) : (
                        <div className="CabinetNull cabinets__block">
                            <img src={images.CabinetNull} />
                            <p>Нет доступных
                                Шкафов</p>
                        </div>
                    )}
                </ul>
            </div>
        </section>
    )
}