import React, { useState } from 'react';
import { Button, Form, Input, Typography, Space, Tag, Row, Col } from 'antd';
import Gramatica from '../models/Gramatica';
import Derivacao from '../models/Derivacao';

const { Title } = Typography;

function GeraGramatica() {
  const [form] = Form.useForm();
  const [result, setResult] = useState('');
  const [sentenca, setSentenca] = useState('');
  const [erro, setErro] = useState('');
  const [inicial, setInicial] = useState('');

  function removeEspacos(value){
    return value.replace(/\s+/g, '');
  }

  const onFinish = (values) => {
    const { naoTerminais, terminais, producao, inicial } = values;
    const naoTerminaisArray = removeEspacos(naoTerminais).split(',');
    const terminaisArray = removeEspacos(terminais).split(',');
    const producaoObj = analisarProducoes(producao);
    const gramatica = new Gramatica(naoTerminaisArray, terminaisArray, producaoObj, inicial);
    const derivacao = new Derivacao(gramatica);

    const sentenca = derivacao.geraSentenca(gramatica,derivacao);

    console.log(sentenca);

    setInicial(inicial);
    setSentenca(sentenca.sentenca);
    setResult(sentenca.passos);
    setErro(sentenca.erro);
  };

  const analisarProducoes = (producao) => {
    const producaoObj = {};
    producao.split(',').forEach(production => {
      const [naoTerminal, regras] = production.split('->');
      producaoObj[naoTerminal.trim()] = regras.split('|').map(regra => regra.trim());
    });
    return producaoObj;
  };

  return (
    <Space direction="vertical" size="large" style={{ width: '100%', padding: '10px' }}>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Row>
          <Col span={24}>
            <Form.Item
              label="Não terminais (separados por vírgula)"
              name="naoTerminais"
              rules={[{ required: true, message: 'Por favor insira os não terminais.' }]}
            >
              <Input placeholder="S,A,B" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Terminais (separados por vírgula)"
              name="terminais"
              rules={[{ required: true, message: 'Por favor insira os terminais.' }]}
            >
              <Input placeholder="a,b,c" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Produções (S->aSb|ab)"
              name="producao"
              rules={[{ required: true, message: 'Por favor insira as produções.' }]}
            >
              <Input placeholder="S->aSb|ab,A->a|b" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Símbolo Inicial"
              name="inicial"
              rules={[{ required: true, message: 'Por favor insira o símbolo inicial.' }]}
            >
              <Input placeholder="S" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item>
              <Button type="primary" 
                htmlType="submit"
                onClick={() => 
                  {
                    setSentenca('');
                    setResult('');
                    setErro('');
                  }
                }
                block>
                Gerar Sentença
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div>
        <Title level={3}>Sentença Gerada: {sentenca}</Title>
        {
          result && !erro ?
            <React.Fragment>
              <Row align={'center'}>
                <Col>
                  <span>Passo a passo</span>
                </Col>
              </Row>
              <br/>
              {
                result.split(',').map((value, index) => (
                  <Row key={index}>
                    <Col span={24}>
                      <Tag color="geekblue"
                        style={{width:'100%', textAlign:'center'}}>
                        {inicial +' -> '+value}
                      </Tag>
                    </Col>
                  </Row>
                ))
              }
            </React.Fragment>
        : erro ? erro : ''}
      </div>
    </Space>
  );
}

export default GeraGramatica;