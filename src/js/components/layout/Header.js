import React from 'react';
import { Layout, Typography } from 'antd';
import { Link } from 'react-router-dom';
import '../../../css/App.css';
 
const { Header } = Layout;
const { Title } = Typography;

const titleStyle = {
    color: 'white',
    marginBottom: '0rem'
}

function LayoutHeader() {
    return (
        <Header className="header-classes">
            <Link to="/"><Title style={titleStyle}>Mondiale</Title></Link>
            <nav>
                <ul className="nav-links">
                    <Link className="nav-link" to="/"><li>Home</li></Link>
                    <Link className="nav-link" to="/rooms"><li>Rooms</li></Link>
                </ul>
            </nav>
        </Header>
    )
}

export default LayoutHeader;
