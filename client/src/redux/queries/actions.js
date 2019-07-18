import { makeActionCreator } from '../utils';

const prefix = 'Queries/';

const TYPES = {
  QUERY_SAVE       : `${prefix}query-save`,
  QUERY_REMOVE     : `${prefix}query-remove`,

  QUERIES_SET      : `${prefix}queries-set`,
  QUERIES_RESTORE  : `${prefix}queries-restore`,

  MODAL_DATA_SET   : `${prefix}modal-data-set`,
  MODAL_DATA_RESET : `${prefix}modal-data-reset`,
};

const actions = {
  ...TYPES,

  querySave      : makeActionCreator(TYPES.QUERY_SAVE, 'query'),
  queryRemove    : makeActionCreator(TYPES.QUERY_REMOVE, 'id'),

  queriesSet     : makeActionCreator(TYPES.QUERIES_SET, 'queries'),
  queriesRestore : makeActionCreator(TYPES.QUERIES_RESTORE),

  modalDataSet   : makeActionCreator(TYPES.MODAL_DATA_SET, 'modal'),
  modalDataReset : makeActionCreator(TYPES.MODAL_DATA_RESET),
};

export default actions;
