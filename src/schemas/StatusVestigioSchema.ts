export default class StatusVestigioSchema {
  static schema = {
    name: 'StatusVestigioSchema',
    primaryKey: 'id',
    properties: {
      id: {type: 'int', indexed: true},
      statusVestigioId: {type: 'int'},
      tipoServicoId: {type: 'int'},
      descricao: 'string',
    },
  };
}
