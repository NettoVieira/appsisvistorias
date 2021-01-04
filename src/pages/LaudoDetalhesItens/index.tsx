import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useEffect, useState} from 'react';

import getRealm from '../../services/realm';

import {Container, Title, List, Scroll} from './styles';

interface TipoVestigio {
  id: number;
  tipoVeiculoId: number;
  tipoVestigioId: number;
  descricaoTipoVestigio: string;
  ordemPrintTipoVestigio: number;
  descricaoGrupoVestigio: string;
}

const LaudoDetalhesItens: React.FC = () => {
  const [Items, setItems] = useState<TipoVestigio[]>([]);

  const handleConsDetalhesItens = useCallback((item) => {
    const View = item.map((value: TipoVestigio) => {
      const data = {
        id: value.id,
        tipoVeiculoId: value.tipoVeiculoId,
        tipoVestigioId: value.tipoVestigioId,
        descricaoTipoVestigio: value.descricaoTipoVestigio,
        ordemPrintTipoVestigio: value.ordemPrintTipoVestigio,
        descricaoGrupoVestigio: value.descricaoGrupoVestigio,
      };
      return data;
    });
    setItems(View);
  }, []);

  useEffect(() => {
    async function DetalhesItens() {
      const realm = await getRealm();

      const tipoVeiculoId = await AsyncStorage.getItem(
        '@sisvistorias:tipoVeiculoId',
      );

      realm.write(() => {
        const data = realm
          .objects('TipoVestigioSchema')
          .filtered(`tipoVeiculoId = ${tipoVeiculoId}`);

        handleConsDetalhesItens(data);
      });

      console.log('teste');
    }

    DetalhesItens();
  }, [handleConsDetalhesItens]);

  return (
    <Container>
      <Scroll />
    </Container>
  );
};

export default LaudoDetalhesItens;
