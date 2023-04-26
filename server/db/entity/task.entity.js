module.exports = {
  name: 'task',
  columns: {
    tid: {
      primary: true,
      generated: false,
      type: 'varchar', default: '',
    },
    vid: {
      type: 'varchar', default: '',
    },
    index: {
      type: 'varchar', default: '',
    },
    playlist: {
      type: 'varchar', default: '',
    },
    finished: {
      type: 'boolean',  default: false,
    },

  },
};