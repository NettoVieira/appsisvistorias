import React, {useCallback, useEffect, useState} from 'react';

import getRealm from '../../services/realm';

import {
  Container,
  Title,
  UserAvatarButton,
  UserAvatar,
  Label,
  Footer,
  TextFooter,
  ParamButton,
  ParamButtonText,
} from './style';

import {useAuth} from '../../hooks/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';
import {ActivityIndicator, Alert, StyleSheet, View} from 'react-native';

interface Profile {
  nomeRazaoSocial: string;
  apelidoUnidade: string;
  api: string;
  bd: string;
}

interface Data {
  descricao: string;
  empresaSetupFotoId: number;
  empresaId: number;
  ordem: number;
  tipoVeiculoId: number;
  obrigatorio: Boolean;
}

interface TipoVeiculo {
  id: number;
  tipoVeiculoId: number;
  descricao: string;
}

interface TipoVestigio {
  tipoVestigioId: number;
  tipoVeiculoId: number;
  descricao_TipoVestigio: string;
  ordem_Print_TipoVestigio: number;
  descricao_GrupoVestigio: string;
}

interface StatusVestigioSchema {
  statusVestigioId: number;
  descricao: string;
  tipoServicoId: number;
}

interface VestigioSchema {
  vestigioId: number;
  tipoVestigioId: number;
  statusVestigioId: number;
  descricao: string;
}

const Profile: React.FC = () => {
  const {user} = useAuth();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<Profile>();

  const handleSaveTipoVeiculo = useCallback(async () => {
    const realm = await getRealm();

    const [user] = await AsyncStorage.multiGet(['@sisvistorias:user']);
    const getuser = JSON.parse(user[1] || '{}');

    const response = await api.get('Tipo/TipoVeiculoFindAll', {
      params: {EmpresaId_Franqueador: getuser.empresaId_Franqueador},
    });

    realm.write(() => {
      const param = realm.objects('TipoVeiculoSchema');

      realm.delete(param);
    });

    response.data.map(async (item: TipoVeiculo) => {
      const data = {
        id: item.tipoVeiculoId,
        tipoVeiculoId: item.tipoVeiculoId,
        descricao: item.descricao,
      };

      realm.write(() => {
        realm.create('TipoVeiculoSchema', data);
      });
    });
  }, []);

  const handleSaveTipoVestigio = useCallback(async () => {
    const realm = await getRealm();

    realm.write(() => {
      const param = realm.objects('TipoVestigioSchema');

      realm.delete(param);
    });

    const [user] = await AsyncStorage.multiGet(['@sisvistorias:user']);
    const getuser = JSON.parse(user[1] || '{}');

    const param = realm.objects('TipoVeiculoSchema');

    const tipoVeicuilo = param.map((item) => {
      const data = {
        TipoVeiculoId: item.tipoVeiculoId,
      };

      return data;
    });

    tipoVeicuilo.map(async (item) => {
      const response = await api.get(
        'Tipo/FindAll_TipoVestigio_ByTipoVeiculoId',
        {
          params: {
            EmpresaId_Franqueador: getuser.empresaId_Franqueador,
            EmpresaId: getuser.empresaId,
            TipoVeiculoId: item.TipoVeiculoId,
          },
        },
      );
      response.data.map((value: TipoVestigio) => {
        const data = {
          id: value.tipoVestigioId,
          tipoVestigioId: value.tipoVestigioId,
          tipoVeiculoId: value.tipoVeiculoId,
          descricaoTipoVestigio: value.descricao_TipoVestigio,
          ordemPrintTipoVestigio: value.ordem_Print_TipoVestigio,
          descricaoGrupoVestigio: value.descricao_GrupoVestigio,
        };

        realm.write(() => {
          realm.create('TipoVestigioSchema', data);
        });
      });
    });
  }, []);

  const handleSaveStatusVestigio = useCallback(async () => {
    const realm = await getRealm();

    realm.write(() => {
      const param = realm.objects('StatusVestigioSchema');

      realm.delete(param);
    });

    const [user] = await AsyncStorage.multiGet(['@sisvistorias:user']);
    const getuser = JSON.parse(user[1] || '{}');

    const response = await api.get('Status/StatusVestigioFindAll', {
      params: {
        EmpresaId_Franqueador: getuser.empresaId_Franqueador,
        EmpresaId: getuser.empresaId,
      },
    });

    response.data.map((item: StatusVestigioSchema) => {
      const data = {
        id: item.statusVestigioId,
        statusVestigioId: item.statusVestigioId,
        tipoServicoId: item.tipoServicoId,
        descricao: item.descricao,
      };

      realm.write(() => {
        realm.create('StatusVestigioSchema', data);
      });
    });
  }, []);

  const handleSaveVestigio = useCallback(async () => {
    const realm = await getRealm();

    realm.write(() => {
      const param = realm.objects('VestigioSchema');

      realm.delete(param);
    });

    const [user] = await AsyncStorage.multiGet(['@sisvistorias:user']);
    const getuser = JSON.parse(user[1] || '{}');

    const response = await api.get('Vestigio/FindAllByTipoId', {
      params: {
        EmpresaId_Franqueador: getuser.empresaId_Franqueador,
        EmpresaId: getuser.empresaId,
      },
    });

    response.data.map((item: VestigioSchema) => {
      const data = {
        id: item.vestigioId,
        vestigioId: item.vestigioId,
        tipoVestigioId: item.tipoVestigioId,
        satatusVestigioId: item.statusVestigioId,
        descricao: item.descricao,
      };

      realm.write(() => {
        realm.create('VestigioSchema', data);
      });
    });
  }, []);

  const handleSaveFoto = useCallback(async (dadosFoto) => {
    const realm = await getRealm();

    realm.write(() => {
      const param = realm.objects('EstruturaFotoSchema');

      realm.delete(param);
    });

    dadosFoto.map(async (item: Data) => {
      const data = {
        id: item.empresaSetupFotoId,
        tipoVeiculoId: item.tipoVeiculoId,
        descricao: item.descricao,
        empresaId: String(item.empresaId),
        ordem: item.ordem,
        obrigatorio: Boolean(item.obrigatorio),
        empresaSetupFotoId: item.empresaSetupFotoId,
      };

      realm.write(() => {
        realm.create('EstruturaFotoSchema', data);
      });
    });
  }, []);

  useEffect(() => {
    async function getUser() {
      setProfile(user);
    }
    getUser();
  }, [user]);

  const handleAtualizaParametros = useCallback(async () => {
    setLoading(true);

    const [user] = await AsyncStorage.multiGet(['@sisvistorias:user']);

    const getUser = JSON.parse(user[1] || '{}');
    try {
      const {data} = await api.get(
        `Setup/FindEmpresaSetupFoto?empresaId=${getUser.empresaId}`,
      );
      handleSaveTipoVeiculo();
      handleSaveTipoVestigio();
      handleSaveStatusVestigio();
      handleSaveVestigio();

      handleSaveFoto(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      Alert.alert(
        'Erro',
        'Erro ao atualizar os parâmetros, verifique sua conexão a internet ou contate o Suporte',
      );
    }
  }, [
    handleSaveFoto,
    handleSaveStatusVestigio,
    handleSaveTipoVeiculo,
    handleSaveTipoVestigio,
    handleSaveVestigio,
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
      <Title>{profile?.nomeRazaoSocial}</Title>

      <UserAvatarButton onPress={() => {}}>
        <UserAvatar source={require('../../assets/avatar-user.png')} />
      </UserAvatarButton>

      <Label>{profile?.apelidoUnidade}</Label>
      <ParamButton onPress={handleAtualizaParametros}>
        <ParamButtonText>Atualizar Parametros</ParamButtonText>
      </ParamButton>

      <Footer>
        <TextFooter>Api Version: 1.30</TextFooter>
        <TextFooter>BD Version: 1.8</TextFooter>
      </Footer>
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

export default Profile;
