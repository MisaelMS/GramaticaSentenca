import React from 'react';
import { Layout } from 'antd';
import GeraGramatica from './componentes/GeraGramatica';
import './App.css';

const { Header, Content } = Layout;

function App() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#001529', padding: '0 20px' }}>
        <div className="logo" style={{ color: '#fff', fontSize: '20px' }}>
          Linguagens Formais e Autômatos: Gerador de Sentenças
        </div>
      </Header>
      
      <Content style={{ margin: '20px' }}>
        <div className="site-layout-content" style={{ background: '#fff', padding: '24px', minHeight: '280px' }}>
          <GeraGramatica />
        </div>
      </Content>
    </Layout>
  );
}

export default App;