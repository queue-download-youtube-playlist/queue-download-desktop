const {geneTypeormAll} = require('./util/index.typeorm');
const {geneUtilExpressJs} = require('./util/index.express');
const {readPackageJson} = require('./util/index.electron.vue');

geneTypeormAll();
geneUtilExpressJs();

// npmRunMakeOpenOutSquirrel();
// npmCacheClean();
// yarnInstallOnWindows()
// execSync(`npm run rebuild`)
// npmRunStart()