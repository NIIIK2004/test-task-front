import { useEffect, useState } from 'react';
import Cabinet from './Сabinet'
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function ListСabinets() {
    const [wardrobes, setWardrobes] = useState([]);

    useEffect(() => {
        const fetchWardrobes = async () => {
            try {
                const response = await axios.get('http://localhost:7362/all/wardrobe');
                setWardrobes(response.data.wardrobe);
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
            }
        };
        fetchWardrobes();
    }, []);

    return (
        <section className="cabinets__wrapper">
            <div className="container">
                <h1 className="title">Список доступных шкафов</h1>
                <Link to="/addCabinetForm">Добавить Шкаф</Link>
                <ul className="cabinets__list">
                    {wardrobes.map((wardrobe) => (
                        <Cabinet key={wardrobe.id} wardrobe={wardrobe} />
                    ))}
                </ul>
            </div>
        </section>
    )
}