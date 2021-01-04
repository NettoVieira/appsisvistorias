import Realm from 'realm';

import EstruturaFotoSchema from '../schemas/EstruturaFotoSchema';
import FotoSchema from '../schemas/FotoSchema';
import StatusVestigioSchema from '../schemas/StatusVestigioSchema';
import TipoVeiculoSchema from '../schemas/TipoVeiculoSchema';
import TipoVestigioSchema from '../schemas/TipoVestigioSchema';
import VestigioSchmea from '../schemas/VestigioSchema';

export default function getRealm() {
  return Realm.open({
    schema: [
      EstruturaFotoSchema,
      FotoSchema,
      TipoVeiculoSchema,
      TipoVestigioSchema,
      StatusVestigioSchema,
      VestigioSchmea,
    ],
  });
}
