module.exports = {
  name: 'config',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    savelocation: {
      type: 'varchar', default: '',
    },
    tmplocation: {
      type: 'varchar', default: '',
    },
    appdatacache: {
      type: 'varchar', default: '',
    }
  },
};