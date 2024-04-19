const yaml = require('yaml');
const path = require('path');
const fs = require('fs');

function mergeObjects(obj1, obj2) {
    const merged = { ...obj1 };

    for (let key in obj2) {
        if (
            merged.hasOwnProperty(key) &&
            typeof obj2[key] === 'object' &&
            !Array.isArray(obj2[key])
        ) {
            merged[key] = mergeObjects(merged[key], obj2[key]);
        } else {
            if (merged.hasOwnProperty(key))
                console.log('WARNING! Openapi spec duplicated key: ', key);
            merged[key] = obj2[key];
        }
    }

    return merged;
}

function readRecursively(folderPath) {
    const pathes = [];
    const files = fs.readdirSync(folderPath);
    files.forEach((file) => {
        const childPath = `${folderPath}/${file}`;
        if (file.indexOf('.') !== 0 && file.slice(-4) === '.yml') pathes.push(childPath);
        else {
            const childFolderFiles = readRecursively(childPath);
            pathes.push(...childFolderFiles);
        }
    });
    return pathes;
}

exports.mergeYamlFiles = (specsFolderPath) => {
    let mergedData = {};

    const pathes = readRecursively(specsFolderPath);
    pathes.forEach((filePath) => {
        const yamlData = fs.readFileSync(filePath, 'utf8');
        const parsedYaml = yaml.parse(yamlData);
        mergedData = mergeObjects(mergedData, parsedYaml);
    });

    return mergedData;
};
