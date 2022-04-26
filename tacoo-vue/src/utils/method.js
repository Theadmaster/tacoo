const deepCopy = function (target) {
    if (typeof target === 'object') {
        let cloneTarget = Array.isArray(target)? [] : {};
        for(const key in target) {
            cloneTarget[key] = deepCopy(target[key]);
        }
        return cloneTarget
    } else {
        return target
    }
}

module.exports = {
    deepCopy
}