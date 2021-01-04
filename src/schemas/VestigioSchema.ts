export default class VestigioSchema {
  static schema = {
    name: 'VestigioSchema',
    primaryKey: 'id',
    properties: {
      id: {type: 'int', indexed: true},
      vestigioId: {type: 'int'},
      tipoVestigioId: {type: 'int'},
      satatusVestigioId: {type: 'int'},
      descricao: 'string',
    },
  };
}
