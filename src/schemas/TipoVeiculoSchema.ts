export default class TipoVeiculoSchema {
  static schema = {
    name: 'TipoVeiculoSchema',
    primaryKey: 'id',
    properties: {
      id: {type: 'int', indexed: true},
      tipoVeiculoId: {type: 'int'},
      descricao: 'string',
    },
  };
}
