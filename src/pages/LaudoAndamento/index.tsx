import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useEffect, useState} from 'react';
import {Alert} from 'react-native';

import getRealm from '../../services/realm';
import api from '../../services/api';
import {useNavigation} from '@react-navigation/native';

import {
  Container,
  Label,
  ItemsList,
  ItemContainer,
  ItemInfo,
  ItemTitle,
  ItemMeta,
  ItemText,
  Scroll,
} from './style';

export interface Items {
  vistoriaId: string;
  placa: string;
  cor: string;
  modelo: string;
}

interface Data {
  descricao: string;
  empresaSetupFotoId: string;
  empresaId: number;
  ordem: number;
  tipoVeiculoId: number;
  obrigatorio: Boolean;
  uri: string;
  path: string;
  icon: string;
  color: string;
  vistoriaId: string;
}

const LaudoAndamento: React.FC = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState<Items[]>([]);

  const handleAtualizaEstruturaFoto = useCallback(async (datafoto, item) => {
    const realm = await getRealm();

    datafoto.map((value: Data) => {
      const data = {
        id: String(value.empresaSetupFotoId + item.vistoriaId),
        tipoVeiculoId: value.tipoVeiculoId,
        descricao: value.descricao,
        empresaId: String(value.empresaId),
        ordem: value.ordem,
        obrigatorio: Boolean(value.obrigatorio),
        empresaSetupFotoId: value.empresaSetupFotoId,
        vistoriaId: item.vistoriaId,
      };

      realm.write(() => {
        realm.create('FotoSchema', data);
      });
    });
  }, []);

  const handleLaudoIniciado = useCallback(
    async (item) => {
      const [user] = await AsyncStorage.multiGet(['@sisvistorias:user']);
      const getuser = JSON.parse(user[1] || '{}');

      const realm = await getRealm();

      const dados = realm
        .objects('EstruturaFotoSchema')
        .filtered(`tipoVeiculoId = ${item.tipoVeiculoId}`);

      if (dados.length === 0) {
        Alert.alert(
          'Atenção',
          'Antes de continuar vá no seu perfil e clique em ATUALIZAR PARÂMETROS',
        );
        return;
      }

      if (item.dtH_Iniciado === null) {
        try {
          await api.post('Vistoria/EditVistoriaIniciado', null, {
            params: {
              EmpresaId_Franqueador: getuser.empresaId_Franqueador,
              EmpresaId: getuser.empresaId,
              VistoriaId: item.vistoriaId,
              usuarioId: getuser.usuarioId,
            },
          });
          const realm = await getRealm();

          realm.write(() => {
            const data = realm
              .objects('EstruturaFotoSchema')
              .filtered(`tipoVeiculoId = ${item.tipoVeiculoId}`);

            handleAtualizaEstruturaFoto(data, item);
          });

          navigation.navigate('LaudoDetalhe');
        } catch (err) {
          Alert.alert(
            'Erro',
            'Erro ao iniciar, verifique sua conexão com a internet ou ligue para o Andre',
          );
          return;
        }
      } else {
        navigation.navigate('LaudoDetalhe');
      }
    },
    [navigation, handleAtualizaEstruturaFoto],
  );

  const handleIniciaLaudo = useCallback(
    async (item) => {
      await AsyncStorage.multiSet([
        ['@sisvistorias:vistoriaId', JSON.stringify(item.vistoriaId)],
      ]);

      Alert.alert(
        'Atenção',
        `Deseja inciar o Laudo ${item.vistoriaId}?`,
        [
          {
            text: 'Não',
            onPress: () => {
              return;
            },
            style: 'cancel',
          },
          {
            text: 'Sim',
            onPress: () => handleLaudoIniciado(item),
          },
        ],
        {cancelable: false},
      );
    },
    [handleLaudoIniciado],
  );

  useEffect(() => {
    async function getItems() {
      try {
        const [user] = await AsyncStorage.multiGet(['@sisvistorias:user']);

        const getuser = JSON.parse(user[1] || '{}');

        const {data} = await api.get(
          `Vistoria/FindAllByUser?empresaId_Franqueador=${getuser.empresaId_Franqueador}&empresaId=${getuser.empresaId}
            &usuarioId=${getuser.usuarioId}`,
        );

        setItems(data);
      } catch (err) {
        Alert.alert('Erro', 'Verifique sua conexão, ou contate o Suporte!');
      }
    }

    getItems();
  }, [items]);

  return (
    <Container>
      <Scroll>
        <ItemsList
          data={items}
          keyExtractor={(item) => item.vistoriaId}
          renderItem={({item}) => (
            <ItemContainer onPress={() => handleIniciaLaudo(item)}>
              <ItemTitle>Num Laudo: {item.vistoriaId}</ItemTitle>
              <ItemInfo>
                <ItemMeta>
                  <Label>Modelo:</Label>
                  <ItemText>{item.modelo}</ItemText>
                </ItemMeta>

                <ItemMeta>
                  <Label>Placa:</Label>
                  <ItemText>{item.placa}</ItemText>
                </ItemMeta>

                <ItemMeta>
                  <ItemText>{item.cor}</ItemText>
                </ItemMeta>
              </ItemInfo>
            </ItemContainer>
          )}
        />
      </Scroll>
    </Container>
  );
};

export default LaudoAndamento;
