import { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Header from "../Header/Header";
import ListCabinet from "../ListСabinets/ListСabinets";
import * as images from '../images/image';
import Button, { ButtonBasket, ButtonLike, ButtonStars } from "../Button/Button";



export default function CabinetDetails() {
    const { id } = useParams();
    const [wardrobe, setWardrobe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWardrobe = async () => {
            try {
                const response = await axios.get(`http://localhost:7362/wardrobe/${id}`);
                setWardrobe(response.data);
            } catch (error) {
                setError('Ошибка при загрузке данных');
                console.error('Ошибка при загрузке данных:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchWardrobe();
    }, [id]);

    if (loading) return <p className="loading">
        <span class="loader"></span>
        Загрузка...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <Header />
            <section className="сabinet_details">
                <div className="container">
                    {wardrobe ? (
                        <>
                            <Link className="bread-crumbs" to={"/"}>Главная - Каталог - Шкафы - 2-х дверные шкафы-купе - {wardrobe.title}</Link>

                            <ul className="сabinet_details-blocks">
                                <li className="сabinet_details-block mw722">
                                    <img className="details-block-img" src={`http://localhost:7362/uploads/${wardrobe.filename}`} alt={wardrobe.title} />
                                </li>
                                <li className="сabinet_details-block mw1088">
                                    <div className="details_block-top">
                                        <h1 className="details_block-title">{wardrobe.title}</h1>
                                        <ul className="details_block-advantages">
                                            <li>
                                                <img src={images.Box} alt={images.Box} />
                                                В наличии ({wardrobe.quantity}шт)
                                            </li>
                                            <li>
                                                <img src={images.Percent} alt={images.Box} />
                                                Экономия {wardrobe.old_price} руб.
                                            </li>
                                            <li>
                                                <img src={images.PackageCheck} alt={images.Box} />
                                                Самовывоз
                                            </li>
                                            <li>
                                                <img src={images.Truck} alt={images.Box} />
                                                Доставка от 24 часов
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="details_block-middle">
                                        <div className="block-middle-top">
                                            <div className="block-middle-top-left">
                                                <h2 className="title">Конфигурация</h2>
                                                <ul className="top-left-config">
                                                    <li>
                                                        <img src={images.MoveVertical} alt="" />
                                                        Высота: <strong>{wardrobe.height} мм</strong>
                                                    </li>
                                                    <li>
                                                        <img src={images.MoveDiagonal2} alt="" />
                                                        Глубина: <strong>{wardrobe.depth} мм</strong>
                                                    </li>
                                                    <li>
                                                        <img src={images.MoveHorizontal} alt="" />
                                                        Ширина: <strong>{wardrobe.width} мм</strong>
                                                    </li>
                                                    <li>
                                                        <img src={images.Wand} alt="" />
                                                        Цвет корпуса: <strong>Дима не сделал</strong>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="block-middle-top-right">
                                                <a href={wardrobe.link}>Скачать инструкция по сборке</a>
                                                <a href={wardrobe.link}>Посмотреть видео</a>
                                            </div>
                                        </div>
                                        <div className="block-middle-bottom">
                                            <div className="block-middle-bottom-left">
                                                <h2 className="title">Дополнительная информация</h2>
                                                <ul className="bottom-left-decription">
                                                    <li>{(wardrobe.description)}</li>
                                                </ul>
                                            </div>
                                            <div className="block-middle-bottom-right">
                                                <span className="bottom-right-oldCost">{wardrobe.old_price}₽</span>
                                                <p className="bottom-right-newCost">{wardrobe.price}₽</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="details_block-bottom">
                                        <Button titleBtn="В корзину" className="button button-basket" />
                                        <Button titleBtn="В избранное" className="button button-stars" />
                                        <Button titleBtn="Сравнить" className="button button-like" />
                                        <Button titleBtn="Купить в 1 клик" />
                                    </div>
                                </li>
                            </ul>
                        </>
                    ) : (
                        <p>Шкаф не найден</p>
                    )}
                </div>
            </section>

            <ListCabinet titleSection="Другие шкафы" showAll={false} />
        </>
    );
}