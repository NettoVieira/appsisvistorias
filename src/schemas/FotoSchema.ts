export default class FotoSchema {
  static schema = {
    name: 'FotoSchema',
    primaryKey: 'id',
    properties: {
      id: {type: 'string', indexed: true},
      tipoVeiculoId: {type: 'int'},
      vistoriaId: {type: 'int'},
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
