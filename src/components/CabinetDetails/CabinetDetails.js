import { useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function CabinetDetails() {
    const { id } = useParams;
    const [wardrobe, setWardrobes] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWardrobes = async () => {
            try {
                const response = await axios.get('http://localhost:7362/wardrobe/${id}');
                setWardrobes(response.data);
            } catch (error) {
                setError('Ошибка при загрузке данных');
                console.error('Ошибка при загрузке данных:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchWardrobes();
    }, [id]);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="cabinet-detail">
            {wardrobe ? (
                <>
                    <h1>{wardrobe.title}</h1>
                    <p>Количество: {wardrobe.quantity}</p>
                    <p>Цена: {wardrobe.price}</p>
                    <p>Старая цена: {wardrobe.oldPrice}</p>
                    <p>Описание: {wardrobe.description}</p>
                    <p>Высота: {wardrobe.height}</p>
                    <p>Ширина: {wardrobe.width}</p>
                    <p>Глубина: {wardrobe.depth}</p>
                    <img src={`http://localhost:7362/uploads/${wardrobe.filename}`} alt={wardrobe.title} />
                    <p><a href={wardrobe.link}>Ссылка</a></p>
                </>
            ) : (
                <p>Шкаф не найден</p>
            )}
        </div>
    );
}