module.exports = {
  name: 'video',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    vid: {
      type: 'varchar', default: ''
    },
    vlink: {
      type: 'varchar', default: ''
    },
    playlist: {
      type: 'varchar', default: ''
    },
    quality: {
      type: 'varchar', default: ''
    },
    size: {
      type: 'varchar', default: ''
    },
    author: {
      type: 'varchar', default: ''
    },
    title: {
      type: 'varchar', default: ''
    },
    filename: {
      type: 'varchar', default: ''
    },
    description: {
      type: 'varchar', default: ''
    },
    downlink: {
      type: 'text', default: '',
    },
  },
};