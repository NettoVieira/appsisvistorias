import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useEffect, useState} from 'react';
import api from '../../services/api';
import {ActivityIndicator, StyleSheet, View, Linking} from 'react-native';

import {Container, Input, Scroll, Button, ButtonText} from './styles';

interface dadosForm {
  chassi: string;
  marca: string;
  modelo: string;
  combustivel: string;
  cor: string;
  anoFab: string;
  anoMod: string;
  municipio: string;
  uf: string;
  renavam: string;
  numeroMotor: string;
  capacidadeCarga: string;
  potencia: string;
  cilindrada: string;
  tipoEspecie: string;
  categoria: string;
}

const LaudoDetalhes: React.FC = () => {
  const [texts, setText] = useState<dadosForm>();
  const [loading, setLoading] = useState(true);

  const handleConsultaPdf = useCallback(async () => {
    const [user] = await AsyncStorage.multiGet(['@sisvistorias:user']);

    const getuser = JSON.parse(user[1] || '{}');

    const [vistoriaId] = await AsyncStorage.multiGet([
      '@sisvistorias:vistoriaId',
    ]);

    const getidVistoria = JSON.parse(vistoriaId[1] || '{}');

    const response = await api.get('Vistoria/IntegracaoConsultaGetLastPdf', {
      params: {
        EmpresaId_Franqueador: getuser.empresaId_Franqueador,
        EmpresaId: getuser.empresaId,
        VistoriaId: getidVistoria,
      },
    });

    Linking.openURL(response.data);
  }, []);

  useEffect(() => {
    async function fillTexts() {
      try {
        const [user] = await AsyncStorage.multiGet(['@sisvistorias:user']);

        const getuser = JSON.parse(user[1] || '{}');

        const [vistoriaId] = await AsyncStorage.multiGet([
          '@sisvistorias:vistoriaId',
        ]);

        const getidVistoria = JSON.parse(vistoriaId[1] || '{}');

        const {data} = await api.get(
          `Vistoria/FindAllById?empresaId_Franqueador=${getuser.empresaId_Franqueador}&empresaId=${getuser.empresaId}
            &VistoriaId=${getidVistoria}`,
        );

        console.log(data.tipoVeiculoId);

        await AsyncStorage.multiSet([
          ['@sisvistorias:tipoVeiculoId', JSON.stringify(data.tipoVeiculoId)],
        ]);

        setText(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }

    fillTexts();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size={200} color="#00c853" animating={loading} />
      </View>
    );
  }

  return (
    <Container>
      <Scroll>
        <Input label="Chassi" value={texts?.chassi} disabled />
        <Input label="Marca" value={texts?.marca} disabled />
        <Input label="Modelo" value={texts?.modelo} disabled />
        <Input label="Combustível" value={texts?.combustivel} disabled />
        <Input label="Cor" value={texts?.cor} disabled />
        <Input label="Ano Fabricação" value={texts?.anoFab} disabled />
        <Input label="Ano Modelo" value={texts?.anoMod} disabled />
        <Input label="Municipio" value={texts?.municipio} disabled />
        <Input label="Estado" value={texts?.uf} disabled />
        <Input label="Renavam" value={texts?.renavam} disabled />
        <Input label="Motor" value={texts?.numeroMotor} disabled />
        <Input label="Cap. Carga" value={texts?.capacidadeCarga} disabled />
        <Input label="Potência" value={texts?.potencia} disabled />
        <Input label="Cilindrada" value={texts?.cilindrada} disabled />
        <Input label="Espécie" value={texts?.tipoEspecie} disabled />
        <Input label="Categoria" value={texts?.categoria} disabled />
      </Scroll>

      <Button onPress={handleConsultaPdf}>
        <ButtonText>PDF da consulta</ButtonText>
      </Button>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default LaudoDetalhes;
