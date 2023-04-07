const {geneTypeormAll} = require('./util/index.typeorm');
const {geneUtilExpressJs} = require('./util/index.express');
const {readPackageJson, execSync, npmRunStart} = require('./util/index.electron.vue');

geneTypeormAll();
geneUtilExpressJs();

// npmRunMakeOpenOutSquirrel();
// npmCacheClean();
// yarnInstallOnWindows()
// execSync(`npm run rebuild`)
//  npmRunStart()

// execSync(`start "" node server/app.js`)