import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, Alert, StyleSheet, View} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import PhotoEditor from 'react-native-photo-editor';

import api from '../../services/api';
import getRealm from '../../services/realm';

import {
  Container,
  ItemsList,
  ItemContainer,
  Scroll,
  ImageItem,
  ItemText,
  ItemHeader,
  ItemFooter,
  ItemButtonFooter,
  ItemFooterText,
  ItemButtonFooterText,
  Icon,
  ItemRodaPe,
} from './styles';

export interface Items {
  descricao: string;
  empresaSetupFotoId: string;
  ordem: string;
  base64: string;
  obrigatorio: string;
  vistoria_FotoId: number;
  uri: string;
  path: string;
  icon: string;
  color: string;
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

const LaudoDetalhesFotos: React.FC = () => {
  const [items, setItems] = useState<Items[]>([]);
  const [loading, setLoading] = useState(false);

  const getDataView = useCallback(async (dataView) => {
    const View = dataView.map((item: Data) => {
      const data = {
        id: String(item.empresaSetupFotoId + item.vistoriaId),
        tipoVeiculoId: item.tipoVeiculoId,
        descricao: item.descricao,
        uri: item.uri,
        empresaId: String(item.empresaId),
        ordem: item.ordem,
        obrigatorio: Boolean(item.obrigatorio),
        empresaSetupFotoId: item.empresaSetupFotoId,
        path: item.path,
        icon: item.icon,
        vistoriaId: item.vistoriaId,
        color: item.color,
      };

      return data;
    });

    setItems(View);
  }, []);

  const setSalvaFotos = useCallback(
    async (dataFoto, saveAllFotos) => {
      if (saveAllFotos) {
        dataFoto.map(async (item: Data) => {
          const [vistoriaId] = await AsyncStorage.multiGet([
            '@sisvistorias:vistoriaId',
          ]);
          const getidVistoria = JSON.parse(vistoriaId[1] || '{}');

          const [user] = await AsyncStorage.multiGet(['@sisvistorias:user']);
          const getuser = JSON.parse(user[1] || '{}');

          if (item.uri != null) {
            try {
              const payload = new FormData();

              payload.append('file', {
                type: 'image/jpg',
                name: `${item.empresaSetupFotoId}.jpg`,
                uri: item.uri,
              });

              await api.post(
                `Vistoria/AddFoto?VistoriaId=${getidVistoria}&UsuarioId=${getuser.usuarioId}&Observacao=null&EmpresaSetupFotoId=${item.empresaSetupFotoId}&Print=true&Extra=false`,
                payload,
              );

              const realm = await getRealm();

              realm.write(() => {
                realm.create(
                  'FotoSchema',
                  {
                    id: String(item.empresaSetupFotoId + getidVistoria),
                    icon: 'check-circle',
                    color: '#00c853',
                  },
                  'modified',
                );

                const data = realm
                  .objects('FotoSchema')
                  .filtered(`vistoriaId = ${getidVistoria}`);

                getDataView(data);
              });
            } catch (err) {
              Alert.alert('Erro', 'Erro ao subir foto, verifique conexão');
            }
          }
        });
      } else {
        const [vistoriaId] = await AsyncStorage.multiGet([
          '@sisvistorias:vistoriaId',
        ]);
        const getidVistoria = JSON.parse(vistoriaId[1] || '{}');

        const [user] = await AsyncStorage.multiGet(['@sisvistorias:user']);
        const getuser = JSON.parse(user[1] || '{}');

        try {
          const payload = new FormData();

          payload.append('file', {
            type: 'image/jpg',
            name: `${dataFoto.empresaSetupFotoId}.jpg`,
            uri: dataFoto.uri,
          });

          await api.post(
            `Vistoria/AddFoto?VistoriaId=${getidVistoria}&UsuarioId=${getuser.usuarioId}&Observacao=null&EmpresaSetupFotoId=${dataFoto.empresaSetupFotoId}&Print=true&Extra=false`,
            payload,
          );

          const realm = await getRealm();

          realm.write(() => {
            realm.create(
              'FotoSchema',
              {
                id: String(dataFoto.empresaSetupFotoId + getidVistoria),
                icon: 'check-circle',
                color: '#00c853',
              },
              'modified',
            );

            const data = realm
              .objects('FotoSchema')
              .filtered(`vistoriaId = ${getidVistoria}`);

            getDataView(data);
            setLoading(false);
          });
        } catch (err) {
          Alert.alert('Erro', 'Erro ao subir foto, verifique conexão');
          setLoading(false);
        }
      }
    },
    [getDataView],
  );

  const handleEnviaFotoSelecionada = useCallback(
    (item) => {
      setLoading(true);
      setSalvaFotos(item, false);
      setLoading(false);
    },
    [setSalvaFotos],
  );

  const handleEnviaTodasFotos = useCallback(async () => {
    const realm = await getRealm();

    const [vistoriaId] = await AsyncStorage.multiGet([
      '@sisvistorias:vistoriaId',
    ]);
    const getidVistoria = JSON.parse(vistoriaId[1] || '{}');

    setLoading(true);

    realm.write(() => {
      const data = realm
        .objects('FotoSchema')
        .filtered(`vistoriaId = ${getidVistoria}`);

      setSalvaFotos(data, true);
      setLoading(false);
    });
  }, [setSalvaFotos]);

  useEffect(() => {
    async function setItemsFotos() {
      const [vistoriaId] = await AsyncStorage.multiGet([
        '@sisvistorias:vistoriaId',
      ]);
      const getidVistoria = JSON.parse(vistoriaId[1] || '{}');

      const realm = await getRealm();

      realm.write(() => {
        const data = realm
          .objects('FotoSchema')
          .filtered(`vistoriaId = ${getidVistoria}`);

        getDataView(data);
      });
    }

    setItemsFotos();
  }, [getDataView]);

  const handleEditImage = useCallback(
    async (item) => {
      const {path, empresaSetupFotoId} = item;

      const [vistoriaId] = await AsyncStorage.multiGet([
        '@sisvistorias:vistoriaId',
      ]);
      const getidVistoria = JSON.parse(vistoriaId[1] || '{}');

      try {
        PhotoEditor.Edit({
          path: path,

          onDone: async (path) => {
            const source = 'content://com.appsisvistorias.provider/root' + path;

            const realm = await getRealm();

            realm.write(() => {
              realm.create(
                'FotoSchema',
                {id: String(empresaSetupFotoId + getidVistoria), uri: source},
                'modified',
              );

              const data = realm
                .objects('FotoSchema')
                .filtered(`vistoriaId = ${getidVistoria}`);

              getDataView(data);
            });
          },
          onCancel: () => {
            return;
          },
        });
      } catch (err) {
        console.log('Deu erro aqui');
      }
    },
    [getDataView],
  );

  const handleSetImage = useCallback(
    async (item) => {
      const {empresaSetupFotoId} = item;

      const [vistoriaId] = await AsyncStorage.multiGet([
        '@sisvistorias:vistoriaId',
      ]);
      const getidVistoria = JSON.parse(vistoriaId[1] || '{}');

      ImagePicker.showImagePicker(
        {
          title: 'Selecione uma imagem',
          cancelButtonTitle: 'Cencelar',
          takePhotoButtonTitle: 'Usar a Camera',
          chooseFromLibraryButtonTitle: 'Escolher da Galeria',
        },
        async (response) => {
          if (response.didCancel) {
            return;
          }

          if (response.error) {
            Alert.alert('Atenção', 'Erro ao abrir a camera');
            return;
          }

          const realm = await getRealm();

          realm.write(() => {
            realm.create(
              'FotoSchema',
              {
                id: String(empresaSetupFotoId + getidVistoria),
                uri: response.uri,
                path: response.path,
              },
              'modified',
            );

            const data = realm
              .objects('FotoSchema')
              .filtered(`vistoriaId = ${getidVistoria}`);

            getDataView(data);
          });
        },
      );
    },
    [getDataView],
  );

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
        <ItemsList
          data={items}
          keyExtractor={(item) => item.ordem}
          numColumns={2}
          refreshing={false}
          scrollEnabled={true}
          horizontal={false}
          extraData={loading}
          renderItem={({item}) => (
            <ItemContainer
              key={item.ordem}
              onPress={() => {
                handleSetImage(item);
              }}
              onLongPress={() => {
                handleEditImage(item);
              }}>
              <ItemHeader>
                <ItemText>
                  {item.obrigatorio}
                  {item.descricao}
                </ItemText>
              </ItemHeader>
              <ImageItem source={{uri: item.uri}} />
              <ItemFooter>
                <ItemFooterText
                  onPress={() => {
                    handleEnviaFotoSelecionada(item);
                  }}>
                  <Icon name={item.icon} size={25} color={item.color} />
                </ItemFooterText>
              </ItemFooter>
            </ItemContainer>
          )}
        />
      </Scroll>
      <ItemRodaPe>
        <ItemButtonFooter onPress={handleEnviaTodasFotos}>
          <ItemButtonFooterText>Subir todas as fotos</ItemButtonFooterText>
        </ItemButtonFooter>
      </ItemRodaPe>
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

export default LaudoDetalhesFotos;
