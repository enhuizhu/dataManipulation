'use strict';
const Map  = require('immutable').Map;

function dataManipulation(entryObj, newEntry) {
    let newObj = JSON.parse(JSON.stringify(entryObj));
    let newEntryObj = convertEntryToComplicateObj(newEntry);
    let newEntryObjPaths = getAllKeyPathes(newEntryObj);
    let newKeys = [];
    
    newEntryObjPaths.map(path => {
        let firstLevelKey = path.split('.')[1];

        if (!newObj[firstLevelKey]) {
            newObj[firstLevelKey] = newEntryObj[firstLevelKey];
            newKeys.push(firstLevelKey);
            return ;
        }

        if (newKeys.indexOf(firstLevelKey) !== -1) {
            return ;
        }

        let calcStr = `newObj${path} = newObj${path} + newEntryObj${path}`;
        
        try {
            eval(calcStr);
        } catch (e) {
            console.log('error', e.message);
        }
    });

    return newObj;
}

function convertEntryToComplicateObj(entry) {
    let obj = {};
    let numbericObj = {count: 1};
    let entryKies = Object.keys(entry);

    entryKies.map(k => {
        if (typeof entry[k] === 'number') {
            let key = `${k}_total`;
            obj[key] = entry[k];
            numbericObj[key] = entry[k];
        }
    });

    entryKies.map(k => {
        if (typeof entry[k] === 'string') {
            obj[k] = {};
            obj[k][entry[k]] = Object.assign({}, numbericObj);
        }
    });

    obj.count = 1;

    return obj;
}

function getAllKeyPathes(obj, preFixPath) {
    if (!preFixPath) {
        preFixPath = '';
    }
    
    let keys = Object.keys(obj);
    let paths = [];
    
    keys.map(k => {
        if (typeof obj[k] === 'object') {
            paths = paths.concat(getAllKeyPathes(obj[k], preFixPath + '.' + k));
        } else {
            paths.push(preFixPath + '.' + k);
        }
    });

    return paths;
}

module.exports = {
    dataManipulation,
    convertEntryToComplicateObj,
    getAllKeyPathes
};