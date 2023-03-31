const {readEnvFile} = require('./util/index.common');
let iconPath = require('path').join('image', 'icon');

const {
  // BITBUCKET_USERNAME, BITBUCKET_APP_PASSWORD,
  GITHUB_AUTHTOKEN,
} = readEnvFile('auth.env');

module.exports = {
  packagerConfig: {
    icon: iconPath,
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        setupIcon: `${iconPath}.ico`,
        fixUpPaths: true,
      },
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-webpack',
      config: {
        mainConfig: './webpack.main.config.js',
        renderer: {
          config: './webpack.renderer.config.js',
          entryPoints: [
            {
              html: './public/index.html',
              js: './public/renderer.js',
              name: 'main_window',
              preload: {
                js: './src/preload.js',
              },
            },
          ],
        },
      },
    },
  ],
  publishers: [
    // {
    //   name: '@electron-forge/publisher-bitbucket',
    //   config: {
    //     // replaceExistingFiles: true,
    //     repository: {
    //       owner: 'vacantthinker',
    //       name: 'queue-download-desktop',
    //     },
    //     auth: {
    //       username: BITBUCKET_USERNAME, // string
    //       appPassword: BITBUCKET_APP_PASSWORD, // string
    //     },
    //   },
    // },

    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'queue-download-youtube-playlist',
          name: 'queue-download-desktop',
        },
        // prerelease: true,
        authToken: GITHUB_AUTHTOKEN,
      },
    },
  ],

};
// https://github.com/queue-download-youtube-playlist/queue-download-desktop
