module.exports = {
  name: 'queue',
  columns: {
    total: {
      type: 'int', default: 0,
    },
    playlist: {
      primary: true,
      generated: false,
      type: 'varchar', default: '',
    },
    title: {
      type: 'varchar', default: '',
    },
    targetlink: {
      type: 'varchar', default: '',
    },
    type: {
      type: 'int', default: 0,
    },
    isfinish: {
      type: 'int', default: 0,
    },
    progress: {
      type: 'int', default: 0,
    },
  },
};