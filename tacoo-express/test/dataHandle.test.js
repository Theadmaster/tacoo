const dataHandle = require('../utils/dataHandle')

const arr = [
    {
        id: 1,
        role_id: 1
    },
    {
        id: 1,
        role_id: 3
    },
    {
        id: 3,
        role_id: 2
    }
]

const arr1 = [
    {
        id: 1,
        role_id: [1, 3]
    },
    {
        id: 3,
        role_id: [2]
    }
]

test('arr to arr1', () => {
    expect(dataHandle.removeDuplicate(arr)).toEqual(arr1);
});