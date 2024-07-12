import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, useNavigate } from 'react-router-dom';
import Button from '../../Button/Button';

import '../../../assets/css/global.css';


export default function AddCabinetFor() {
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
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }, []);

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
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };

            const response = await axios.post('http://localhost:7362/admin/wardrobe/add', formDataToSend, config);
            console.log('Новый шкаф добавлен:', response.data);
            navigate('/');
        } catch (error) {
            console.error('Ошибка при добавлении шкафа:', error);
        }
    };

    return (
        <section className="auth cabinet_section">
            <div className="container">
                <h1 className="title">Добавление шкафа</h1>
                <form onSubmit={handleSubmit} className="cabinet_form-add">
                    <div className="cabinet_form-top">
                        <div className="auth__input">
                            <label>Название:</label>
                            <input className='input' type="text" name="title" value={formData.title} onChange={handleChange} placeholder='Например Пончик' />
                        </div>

                        <div className="auth__input">
                            <label>Цена:</label>
                            <input className='input' type="text" name="price" value={formData.price} onChange={handleChange} placeholder='Например 47 000' />
                        </div>

                        <div className="auth__input">
                            <label>Количество:</label>
                            <input className='input' type="text" name="quantity" value={formData.quantity} onChange={handleChange} placeholder='Например 123' />
                        </div>

                        <div className="auth__input">
                            <label>Старая цена:</label>
                            <input className='input' type="text" name="old_price" value={formData.old_price} onChange={handleChange} placeholder='Например 1 000 000' />
                        </div>

                        <div className="auth__input">
                            <label>Высота:</label>
                            <input className='input' type="text" name="height" value={formData.height} onChange={handleChange} placeholder='Например 12 См' />
                        </div>

                        <div className="auth__input">
                            <label>Ширина:</label>
                            <input className='input' type="text" name="width" value={formData.width} onChange={handleChange} placeholder='Например 1 См' />
                        </div>

                        <div className="auth__input">
                            <label>Глубина:</label>
                            <input className='input' type="text" name="depth" value={formData.depth} onChange={handleChange} placeholder='Например 59 См' />
                        </div>

                        <div className="auth__input">
                            <label>Ссылка:</label>
                            <input className='input' type="text" name="link" value={formData.link} onChange={handleChange} placeholder='Например на Ютуб' />
                        </div>
                    </div>
                    <div className="cabinet_form-bottom">
                        <div className="inputFile">
                            <label className='inputFile-label' htmlFor='file'>
                                {file ? file.name : 'Загрузите изображение'}
                            </label>
                            <input type="file" name="file" id='file' onChange={handleFileChange} />
                        </div>
                        <div className="auth__input">
                            <label>Описание:</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} />
                        </div>
                        <Button titleBtn="Добавить шкаф" />
                    </div>
                </form>
            </div>
        </section >
    )
}