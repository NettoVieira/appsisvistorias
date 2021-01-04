export default class EstruturaFotoSchema {
  static schema = {
    name: 'EstruturaFotoSchema',
    primaryKey: 'id',
    properties: {
      id: {type: 'int', indexed: true},
      tipoVeiculoId: {type: 'int'},
      descricao: 'string',
      uri: 'string?',
      empresaId: {type: 'string'},
      ordem: {type: 'int'},
      obrigatorio: 'bool',
      empresaSetupFotoId: {type: 'int'},
      path: 'string?',
      icon: {type: 'string', default: 'upload-cloud'},
      color: {type: 'string', default: '#000'},
    },
  };
}
