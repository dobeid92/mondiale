import React from 'react'
import { Row, Col, Card, Typography } from 'antd';
import { Link } from 'react-router-dom';
const {Title} = Typography;


function Home() {
    return (
        // <div>
            <Row justify="center" align="middle" style={{padding: '2rem'}}>
                    <Col span="12">
                        <Link to="/rooms">
                            <Card className="card-classes" bordered={false} justify="center" align="middle">
                                <Title level={2}>Explore Rooms</Title>
                            </Card>
                        </Link>
                    </Col>
                </Row>
        // </div>
    )
}

export default Home
