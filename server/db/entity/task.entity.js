module.exports = {
  name: 'task',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
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
      type: 'int', default: 0,
    },

  },
};