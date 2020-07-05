import React, {useState, useEffect} from 'react';

import { Layout, Menu, Card, Col, Row, Table  } from 'antd';

import axios from 'axios';

import { Link } from 'react-router-dom'

import logo from '../../assets/logo.svg'

const { Header, Content, Footer } = Layout;


export default function Geral() {
    const [casos, setCasos] = useState({ totalCases: 0, newCases: 0, activeCases: 0, totalDeaths:0, newDeaths:0, seriousCritical: 0, totalRecovered: 0, date: '' });

    useEffect( () => {
        axios.get('https://api.coronavairus.com.br/brazil/last')
        .then( response => {
            setCasos(response.data);
        })
    }, []);

    const [estados, setEstados] = useState([]);
    useEffect( () => {
        axios.get('https://api.coronavairus.com.br/state/last')
        .then( response => {
            console.log(response.data);
            setEstados(response.data);
        })
    }, []);
      
    const columns = [
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'UF',
            dataIndex: 'uf',
            key: 'uf',
        },
        {
            title: 'Casos',
            dataIndex: 'cases',
            key: 'cases',
        },
        {
            title: 'Óbitos',
            dataIndex: 'deaths',
            key: 'deaths'
        },
        {
            title: 'Novos casos',
            dataIndex: 'newCases',
            key: 'newCases'
        },
        {
            title: 'Novos óbitos',
            dataIndex: 'newDeaths',
            key: 'newDeaths'
        }
    ];

    return(
        <Layout className="layout">
        <Header>
          <Link to={'/'}>
            <div className="logo">
                <img src={logo} height={31} alt="coronalogo"/>
                Covid-19
            </div>
          </Link>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">Brasil</Menu.Item>
            <Menu.Item key="2">Mundo</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content">
            <Row gutter={16}>
                <Col span={8}>
                    <Card>
                        <h1>Casos confirmados</h1>
                        <p>{casos.totalCases} acumuladas</p>
                        <p>{casos.newCases} novos casos</p>
                        <p>{casos.activeCases} ativos</p>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <h1>Mortes confirmadas</h1>
                        <p>{casos.totalDeaths} acumuladas</p>
                        <p>{casos.newDeaths} novas mortes</p>
                        <p>{casos.seriousCritical} estado crítico</p>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <h1>Informações adicionais</h1>
                        <p>209,5 milhões de população</p>
                        <p>{ ((casos.totalDeaths/casos.totalCases)*100).toFixed(1)}% de letalidade</p>
                        <p>{casos.totalRecovered} recuperados</p>
                    </Card>
                </Col>
            </Row>
            <Table dataSource={estados} columns={columns} style={{ paddingTop: '30px'}} />;
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>©2020 </Footer>
      </Layout>
    );
}
