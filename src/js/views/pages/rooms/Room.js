import React, { useState, useEffect } from 'react'
import { Typography, Row, Col, Carousel, Card, DatePicker, Button, Divider } from 'antd';
import moment from 'moment'

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
function Room({ match }) {

    const dateFormat = 'YYYY-MM-DD';

    const initialDate = {
        checkIn: null,
        checkOut: null
    };

    const noImages = [
        {
            url: "/uploads/no_preview_a3b1ba7466.jpeg"
        }
    ];

    const [rentDate, setRentDate] = useState(initialDate)

    const [roomDetails, setRoomDetails] = useState([]);

    const [roomImages, setRoomImages] = useState([]);

    const fetchRoomDetails = async () => {
        const data = await fetch(`http://localhost:1337/rooms/${match.params.id}`);

        const room = await data.json();
        setRoomDetails(room);
        setRoomImages(room.room_image.length > 0 ? room.room_image : noImages)
    }
    useEffect(() => {
        fetchRoomDetails();
    }, []);

    const rentRoom = async () => {
        await fetch('http://localhost:1337/room-rents', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                room: match.params.id,
                check_in: rentDate.checkIn,
                check_out: rentDate.checkOut
            })
        });
        fetchRoomDetails();
    };

    return (
        <div style={{ padding: '0.5rem' }}>
            <Title level={2}>{roomDetails.title}</Title>
            <Carousel autoplay>
                {roomImages.map((image, i) => (
                    <div key={i} className="carousel-image">
                        <img src={'http://localhost:1337' + image.url} width="750px" heigh="750px" style={{ borderRadius: "1rem", marginRight: '1rem' }} />
                    </div>
                ))
                }
            </Carousel>
            <div className="site-card-wrapper">
                <Row gutter={16}>
                    <Col span="12">
                        <Card className="card-classes" title="Room Description" bordered={false}>
                            <Text>{roomDetails.description}</Text>
                        </Card>
                    </Col>
                    <Col span="12">
                        <Card className="card-classes" title="Rent Room" bordered={false}>
                            <RangePicker disabledDate={(current) => {
                                let dates = moment().add(-1, 'days') >= current;
                                roomDetails.rents.forEach((rent) => {
                                    dates = dates || (moment(current).isBetween(moment(rent.check_in), moment(rent.check_out)));
                                });
                                return dates;
                            }} format={dateFormat} onChange={(e, dates) => setRentDate({ checkIn: dates[0], checkOut: dates[1] })} />
                            <Divider style={{ borderTop: '1px solid white' }} />
                            <Row justify="center" align="middle">
                                <Button disabled={rentDate.checkIn == null || rentDate.checkOut == null} type='primary' shape="round" onClick={e => rentRoom()}>Reserve</Button>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Room;
