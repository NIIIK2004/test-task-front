import { useEffect, useState } from 'react'
import { Сabinet } from './Сabinet'
import axios from 'axios';

export default function ListСabinets() {

    const [cabinets, setCabinets] = useState([]);

    useEffect(() => {
        const fetchCabinets = async () => {
            try {
                const response = await axios.get('http://localhost:7362/admin/wardrobe/all');
                setCabinets(response.data.wardrobe); // Проверьте структуру ответа и доступ к массиву шкафов
            } catch (error) {
                console.error('Error fetching cabinets:', error);
            }
        };

        fetchCabinets();
    }, []);

    return (
        <section className="cabinets__wrapper">
            <div className="container">
                <h1 className="title">Список доступных шкафов</h1>
                <ul className="cabinets__list">
                    {cabinets.map((cabinet, index) => (
                        <Cabinet key={index} cabinet={cabinet} />
                    ))}
                </ul>
            </div>
        </section>
    )
}