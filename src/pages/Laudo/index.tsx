import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useEffect, useState} from 'react';
import {Alert, ActivityIndicator, StyleSheet, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import api from '../../services/api';

import {
  Container,
  ComboBox,
  ComboBoxItem,
  ComboBoxButton,
  Button,
  ButtonText,
  Input,
} from './style';

interface consultaVeicular {
  nomeRazaoSocial_EmpresaConsultaVeicular: string;
  empresaConsultaVeicularId: string;
}

interface TipoServico {
  tipoServicoId: string;
  descricao: string;
}

interface TipoVeiculo {
  tipoVeiculoId: string;
  descricao: string;
}

const Laudo: React.FC = () => {
  const [Items, setItems] = useState<consultaVeicular[]>([]);

  const navigation = useNavigation();

  const [SelectedList, setSelectedList] = useState<consultaVeicular>();

  const [ItemsTipoServico, setItemsTipoServico] = useState<TipoServico[]>([]);
  // eslint-disable-next-line prettier/prettier
  const [SelectedListTipoServico, setSelectedListTipoServico] = useState<TipoServico>();

  const [ItemsTipoVeiculo, setItemsTipoVeiculo] = useState<TipoVeiculo[]>([]);
  // eslint-disable-next-line prettier/prettier
  const [SelectedListTipoVeiculo, setSelectedListTipoVeiculo] = useState<TipoVeiculo>();

  const [TextPlaca, changeTextPlaca] = useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function GetItems() {
      const [user] = await AsyncStorage.multiGet(['@sisvistorias:user']);

      const getUser = JSON.parse(user[1] || '{}');

      const {data} = await api.get(
        `PesquisaVeicular/FindAll_ByIdEmpresa_EmpresaConsultaVeicular?empresaId=${getUser.empresaId}`,
      );
      setItems(data);
    }

    GetItems();
  }, []);

  useEffect(() => {
    async function GetItemsTipoServico() {
      const [user] = await AsyncStorage.multiGet(['@sisvistorias:user']);

      const getUser = JSON.parse(user[1] || '{}');

      const {data} = await api.get(
        `Tipo/TipoServicoFindAll?empresaId_Franqueador=${getUser.empresaId_Franqueador}&empresaId=${getUser.empresaId}`,
      );
      setItemsTipoServico(data);
    }

    GetItemsTipoServico();
  }, []);

  useEffect(() => {
    async function GetItemsTipoVeiculo() {
      const [user] = await AsyncStorage.multiGet(['@sisvistorias:user']);

      const getUser = JSON.parse(user[1] || '{}');

      const {data} = await api.get(
        `Tipo/TipoVeiculoFindAll?EmpresaId_Franqueador=${getUser.empresaId_Franqueador}`,
      );
      setItemsTipoVeiculo(data);
    }
    GetItemsTipoVeiculo();
  }, []);

  const handleConsultaPlaca = useCallback(async () => {
    const [user] = await AsyncStorage.multiGet(['@sisvistorias:user']);
    const getUser = JSON.parse(user[1] || '{}');

    if (!SelectedListTipoServico) {
      Alert.alert('Atenção', 'Selecionar um tipo de serviço');
      return;
    }

    if (!SelectedList) {
      Alert.alert('Atenção', 'Selecionar um tipo de consulta');
      return;
    }

    if (!SelectedListTipoVeiculo) {
      Alert.alert('Atenção', 'Selecionar um tipo de veículo');
      return;
    }

    if (!TextPlaca) {
      Alert.alert('Atenção', 'Digite uma placa');
      return;
    }

    try {
      setLoading(true);
      const response = await api.post(
        'Vistoria/IntegracaoConsultaPlacaVistoria',
        null,
        {
          params: {
            empresaId_Franqueador: getUser.empresaId_Franqueador,
            empresaId: getUser.empresaId,
            usuarioId: getUser.usuarioId,
            empresaConsultaVeicularId: SelectedList?.empresaConsultaVeicularId,
            tipoServicoId: SelectedListTipoServico?.tipoServicoId,
            tipoVeiculoId: SelectedListTipoVeiculo?.tipoVeiculoId,
            placa: TextPlaca,
          },
        },
      );

      setLoading(false);

      if (response.data) {
        Alert.alert(
          'Sucesso ♥',
          'Laudo ' + response.data + ' gerado com sucesso',
        );
      }

      navigation.navigate('Andamento');
    } catch (err) {
      Alert.alert(
        err.toString(),
        'Se o codigo for 400 essa placa provavelmente já foi consultada dentro de 24 horas. Caso contrario contate o administrador',
      );
      setLoading(false);
    }
  }, [
    SelectedList,
    SelectedListTipoServico,
    SelectedListTipoVeiculo,
    TextPlaca,
    navigation,
  ]);

  if (loading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size={200} color="#00c853" animating={loading} />
      </View>
    );
  }

  return (
    <Container>
      <ComboBoxButton>
        {/* Combo box de tipo de consulta */}
        <ComboBox
          selectedValue={SelectedList}
          onValueChange={(item) => setSelectedList(item)}>
          <ComboBoxItem
            label="Selecione um tipo de consulta"
            value=""
            key={-1}
          />

          {Items &&
            Items.map((item, index) => (
              <ComboBoxItem
                label={item.nomeRazaoSocial_EmpresaConsultaVeicular}
                value={item}
                key={index}
              />
            ))}
        </ComboBox>
      </ComboBoxButton>
      {/* Combo box de tipo de serviço */}
      <ComboBoxButton>
        <ComboBox
          selectedValue={SelectedListTipoServico}
          onValueChange={(item) => setSelectedListTipoServico(item)}>
          <ComboBoxItem
            label="Selecione um tipo de Serviço"
            value=""
            key={-1}
          />

          {ItemsTipoServico &&
            ItemsTipoServico.map((item, index) => (
              <ComboBoxItem label={item.descricao} value={item} key={index} />
            ))}
        </ComboBox>
      </ComboBoxButton>
      {/* Combo box de tipo de Veiculo */}
      <ComboBoxButton>
        <ComboBox
          selectedValue={SelectedListTipoVeiculo}
          onValueChange={(item) => setSelectedListTipoVeiculo(item)}>
          <ComboBoxItem
            label="Selecione um tipo de Veículo"
            value=""
            key={-1}
          />

          {ItemsTipoVeiculo &&
            ItemsTipoVeiculo.map((item, index) => (
              <ComboBoxItem label={item.descricao} value={item} key={index} />
            ))}
        </ComboBox>
      </ComboBoxButton>

      <Input
        placeholder="Placa do Veiculo"
        autoCorrect={false}
        placeholderTextColor="#635b5b"
        onChangeText={(text) => changeTextPlaca(text)}
      />

      <Button onPress={handleConsultaPlaca}>
        <ButtonText>Consutar Placa</ButtonText>
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

export default Laudo;
