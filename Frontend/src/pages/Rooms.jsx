import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import '../styles/rooms.css';

const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const [typedText, setTypedText] = useState('');
    const message = "Aulas Disponibles";

    useEffect(() => {
        let index = 0;
        const typingInterval = setInterval(() => {
            if (index < message.length) {
                setTypedText(message.substring(0, index + 1));
                index++;
            } else {
                clearInterval(typingInterval);
            }
        }, 100);

        return () => clearInterval(typingInterval);
    }, []);

    const fetchRooms = async () => {
        try {
            const response = await axios.get('http://localhost:5000/aulas');
            setRooms(response.data);
        } catch (error) {
            console.error('Error al obtener aulas:', error);
        }
    };
    
    return (
        <div className="rooms-page">
            <h2 className="typewriter-text">{typedText}</h2>
            <div className="button-container">
                <button onClick={fetchRooms} className="btn-fetch">Mostrar Aulas</button>
            </div>
            {rooms.length > 0 && (
                <div className="table-container">
                    <table className="flake-table">
                        <thead>
                            <tr>
                                <th>ID Aula</th>
                                <th>Grado (Texto)</th>
                                <th>Grado (Número)</th>
                                <th>Jornada</th>
                                <th>Grupo</th>
                                <th>ID Profesor</th>
                                <th>Código DANE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rooms.map((room) => (
                                <tr key={room.id_aula}>
                                    <td>{room.id_aula}</td>
                                    <td>{room.grad_text}</td>
                                    <td>{room.grad_num}</td>
                                    <td>{room.jornada}</td>
                                    <td>{room.num_grupo}</td>
                                    <td>{room.id_profesor}</td>
                                    <td>{room.cod_DANE}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Rooms;
