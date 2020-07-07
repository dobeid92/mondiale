import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Row, Col, Divider, Typography, DatePicker, Space, Input, Button } from 'antd';

const { Title, Text } = Typography;

function RoomsList() {

    const initialFilters = {
        price: 0,
        location: '',
        checkIn: null,
        checkOut: null
    }

    const dateFormat = "YYYY-MM-DD"

    const [rooms, setRooms] = useState([]);
    const [allRooms, setAllRooms] = useState([]);

    const [filters, setFilters] = useState(initialFilters);

    const resetFilters = () => {
        setFilters(initialFilters);
        setRooms(allRooms)
    }

    useEffect(() => {
        fetchRooms();
    }, []);

    const filterRooms = async () => {
        if (filters === initialFilters) {
            setRooms(allRooms);
            return;
        }
        
        let filteredRooms = await allRooms.filter((room) => {
            if (room.price === undefined || (filters.price > 0 &&room.price > filters.price)) {
                return false;
            } else if (room.location === undefined || room.location.toLowerCase().indexOf(filters.location.toLowerCase()) < 0) {
                return false;
            } else if (room.rents.length > 0 && (filters.checkIn !== null || filters.checkOut !== null)) {
                let notOverlap = true;
                for (let i = 0; i < room.rents.length; i++) {
                    if (filters.checkIn && filters.checkIn <= room.rents[i]['check_in'] && filters.checkIn && filters.checkOut >= room.rents[i]['check_out']) {
                        notOverlap = false;
                        break;
                    }
                }
                return notOverlap
            } else {
                return true;
            }
        });
        setRooms(filteredRooms);
    }

    const fetchRooms = async () => {
        const data = await fetch('http://localhost:1337/rooms');
        const rooms = await data.json();
        setAllRooms(rooms);
        setRooms(rooms);
    }

    return (
        <div>
            <Row style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '0.5rem', marginBottom: '2rem' }}>
                <Col span={5}>
                    <Space direction="vertical" className="filters-container">
                        <Text>Location</Text>
                        <Input type="text" value={filters.location} placeholder="Enter Location" onChange={e => setFilters({ ...filters, location: e.target.value })} />
                    </Space>
                </Col>
                <Col span={5}>
                    <Space direction="vertical" className="filters-container">
                        <Text>Check In</Text>
                        <DatePicker placeholder="Enter Start Date" format={dateFormat} onChange={(date, dateFormat) => setFilters({ ...filters, checkIn: dateFormat })} />
                    </Space>
                </Col>
                <Col span={5}>
                    <Space direction="vertical" className="filters-container">
                        <Text>Check Out</Text>
                        <DatePicker placeholder="Enter End Date" format={dateFormat} onChange={(date, dateFormat) => setFilters({ ...filters, checkOut: dateFormat })} />
                    </Space>
                </Col>
                <Col span={5}>
                    <Space direction="vertical" className="filters-container">
                        <Text>Price</Text>
                        <Input type="number" value={filters.price} placeholder="Enter Max Price " onChange={e => setFilters({ ...filters, price: e.target.value })} />
                    </Space>
                </Col>
                <Col span={4} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                    <span style={{ padding: '0rem 0.25rem' }}>
                        <Button type="danger" shape="round" onClick={() => resetFilters()}>Reset</Button>
                    </span>
                    <span style={{ padding: '0rem 0.25rem' }}>
                        <Button type="primary" shape="round" onClick={() => filterRooms()}>Filter</Button>
                    </span>
                </Col>
            </Row>
            <Row style={{ display: rooms.length === 0 ? 'flex' : 'none', justifyContent: 'center', alignItems: 'center' }}>
                <Title level={3}>No Results Found</Title>
            </Row>
            {
                rooms.map((room, i) => (
                    <div key={room.id}>
                        <Link to={`/rooms/${room.id}`}>
                            <Row style={{ padding: '0.5rem' }}>
                                <img alt="" src={'http://localhost:1337' + (room.room_image.length > 0 ? room.room_image[0].url : '/uploads/no_preview_a3b1ba7466.jpeg')} width="300px" heigh="300px" style={{ borderRadius: "1rem", marginRight: '1rem' }} />
                                <Col span={18} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <Row>
                                        <Space direction="vertical">
                                            <Title level={3} style={{ color: "blue" }}>{room.title}</Title>
                                            <Text>{room.location}</Text>
                                            <Title level={4}>{room.description.slice(0, Math.min(room.description.length, 300))}...</Title>
                                        </Space>
                                    </Row>
                                    <Row>
                                        <Col span={12}>Rating: {room.rating}</Col>
                                        <Col style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }} span={12}>${room.price}/night</Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Link>
                        <Divider style={{ borderTop: '1px solid lightgrey', display: i === rooms.length - 1 ? 'none' : 'block' }} />
                    </div>
                ))
            }
        </div>
    );
}

export default RoomsList
