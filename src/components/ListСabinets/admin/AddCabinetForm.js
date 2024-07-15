import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Link, useNavigate, useParams } from 'react-router-dom';
import Button from '../../Button/Button';

import '../../../assets/css/global.css';


export default function AddCabinetForm() {
    const { id } = useParams();
    const [userRole, setUserRole] = useState('');
    const navigate = useNavigate();

    const initialFormData = {
        title: '',
        quantity: '',
        price: '',
        old_price: '',
        description: '',
        height: '',
        width: '',
        depth: '',
        filename: '',
        link: ''
    };

    const [formData, setFormData] = useState(initialFormData);
    const [file, setFile] = useState(null);

    useEffect(() => {
        if (id) {
            fetchWardrobe(id);
        }

        const role = localStorage.getItem('role');
        setUserRole(role);
        if(role === 'user' || role === null) {
            navigate("/");
        }
    }, [id]);

    const fetchWardrobe = async (id) => {
        try {
            const response = await axios.get(`http://localhost:7362/admin/wardrobe/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            setFormData(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке данных шкафа:', error);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();

        Object.keys(formData).forEach(key => {
            formDataToSend.append(key, formData[key]);
        });

        if (file) {
            formDataToSend.append('filename', file);
        }

        try {
            let response;
            const config = {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data',
                },
            };
            if (id) {
                response = await axios.put(`http://localhost:7362/admin/wardrobe/update/${id}`, formDataToSend, config);
            } else {
                response = await axios.post('http://localhost:7362/admin/wardrobe/add', formDataToSend, config);
            }
            console.log('Ответ сервера:', response.data);
            navigate('/');
        } catch (error) {
            console.error('Ошибка при сохранении шкафа:', error);
        }
    };


    return (
        <section className="auth cabinet_section">
            <div className="container">
                <div className="cabinet_title">
                    <h1 className="title">{id ? 'Редактирование шкафа' : 'Добавление шкафа'}</h1>
                    <Link to={"/"}>Вернуться назад</Link>
                </div>
                <form onSubmit={handleSubmit} className="cabinet_form-add">
                    <div className="cabinet_form-top">
                        <div className="auth__input">
                            <label>Название:</label>
                            <input className='input' type="text" name="title" value={formData.title} onChange={handleChange} placeholder='Например Пончик' />
                        </div>

                        <div className="auth__input">
                            <label>Цена:</label>
                            <input className='input' type="text" name="price" value={formData.price} onChange={handleChange} placeholder='47 000 Руб' />
                        </div>

                        <div className="auth__input">
                            <label>Количество:</label>
                            <input className='input' type="text" name="quantity" value={formData.quantity} onChange={handleChange} placeholder='В  наличии: 19' />
                        </div>

                        <div className="auth__input">
                            <label>Старая цена:</label>
                            <input className='input' type="text" name="old_price" value={formData.old_price} onChange={handleChange} placeholder='Например 1 000 000' />
                        </div>

                        <div className="auth__input">
                            <label>Высота:</label>
                            <input className='input' type="text" name="height" value={formData.height} onChange={handleChange} placeholder='Например 12 мм' />
                        </div>

                        <div className="auth__input">
                            <label>Ширина:</label>
                            <input className='input' type="text" name="width" value={formData.width} onChange={handleChange} placeholder='Например 1 мм' />
                        </div>

                        <div className="auth__input">
                            <label>Глубина:</label>
                            <input className='input' type="text" name="depth" value={formData.depth} onChange={handleChange} placeholder='Например 59 мм' />
                        </div>

                        <div className="auth__input">
                            <label>Ссылка на инструкцию:</label>
                            <input className='input' type="text" name="link" value={formData.link} onChange={handleChange} placeholder='Например на Ютуб' />
                        </div>
                    </div>
                    <div className="cabinet_form-bottom">
                        <div className="inputFile">
                            <label className='inputFile-label' htmlFor='file'>
                                {file ? file.name : formData.filename ? formData.filename : 'Загрузите изображение'}
                            </label>
                            <input type="file" name="file" id='file' onChange={handleFileChange} />
                        </div>
                        <div className="auth__input">
                            <label>Описание или особенности:</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} />
                        </div>
                        <Button titleBtn={id ? 'Сохранить изменения' : 'Добавить шкаф'} />
                    </div>
                </form>
            </div>
        </section >
    )
}