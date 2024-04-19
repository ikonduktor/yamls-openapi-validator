const fsLib = require('./lib/fs.lib');

exports.getSpec = (specsFolderPath) => {
    const spec = fsLib.mergeYamlFiles(specsFolderPath);
    return spec;
};
