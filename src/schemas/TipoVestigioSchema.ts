export default class TipoVestigioSchema {
  static schema = {
    name: 'TipoVestigioSchema',
    primaryKey: 'id',
    properties: {
      id: {type: 'int', indexed: true},
      tipoVeiculoId: {type: 'int'},
      tipoVestigioId: {type: 'int'},
      descricaoTipoVestigio: 'string?',
      ordemPrintTipoVestigio: {type: 'int'},
      descricaoGrupoVestigio: 'string',
    },
  };
}
