module.exports = {
  name: 'task',
  columns: {
    vid: {
      primary: true,
      generated: false,
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