/**
 * const arr = ['icons', 'js', 'html', 'manifest.json'];
 *
 * zipAlotFileOrDir(arr); // dirRootName.zip
 *
 * @param arrAlot{Array:[String]}
 */
function zipAlotFileOrDir(arrAlot) {
  //Step 1 - require modules
  const path = require('path');
  const fs = require('fs');
  const archiver = require('archiver');

//Step 2 - create a file to stream archive data to
  let dirRootName = path.basename(__dirname);
  const output = fs.createWriteStream(__dirname + `/${dirRootName}.zip`);
  const archive = archiver('zip', {
    zlib: {level: 9},
  });

//Step 3 - callbacks
  output.on('close', () => {
    console.log('Archive finished.');
  });

  archive.on('error', (err) => {
    throw err;
  });

//Step 4 - pipe and append files
  archive.pipe(output);

  // collect all file
  let reduceArr = arrAlot.reduce((collectArr, value) => {
    const path = require('path');
    let pathEntry = path.join(__dirname, value);
    let arrResult = loopSearch(pathEntry, []);
    collectArr.push(...arrResult);

    return collectArr;
  }, []);

  // loop search all file
  function loopSearch(entry, arr) {
    const fs = require('fs');
    const path = require('path');
    if (fs.lstatSync(entry).isDirectory()) {
      let strings = fs.readdirSync(entry);
      let reduce = strings.reduce((result, val) => {
        let pathVal = path.join(entry, val);
        let search = loopSearch(pathVal, []);
        result.push(...search);
        return result;
      }, []);
      arr.push(...reduce);
      return arr;
    } else {
      arr.push(entry);
      return arr;
    }
  }

  // foreach append file; name: filename, prefix
  Array.from(reduceArr).forEach((value) => {
    let strpath = String(value).replace(__dirname, '');

    let endFilename = strpath.lastIndexOf('\\');
    let filename = strpath.substring(endFilename + 1, strpath.length);

    let prefix = strpath.replace(filename, '');
    console.log(`prefix= ${prefix}\nfilename= ${filename}\n`);
    archive.append(fs.readFileSync(String(value)),
      {name: filename, prefix});
  });

//Step 5 - finalize
  archive.finalize().then(r => {

  });
}

//***************************************************************************

const arr = [
  'image', 'public', 'server', 'src', 'util',

  'manifest.json', '',

];
zipAlotFileOrDir(arr);
