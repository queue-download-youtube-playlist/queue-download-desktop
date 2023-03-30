module.exports = {
  name: 'queue',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    vid: {
      type: 'varchar', default: ''
    },
    playlist: {
      type: 'varchar', default: ''
    },
    title: {
      type: 'varchar', default: ''
    },
    targetlink: {
      type: 'varchar', default: ''
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
    total: {
      type: 'int', default: 0,
    },
  },
};