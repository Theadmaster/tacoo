const { TestWatcher } = require('jest')
const method = require('../utils/method')

const arr = [
    {
        id: 1,
        name: 2
    },
    [ 1, 2, 3 ]
]

const arr2 = [
    {
        id: 1,
        name: 2
    },
    [ 1, 2, 3 ]
]

test('arr to arr2', () => {
    expect(method.deepCopy(arr)).toEqual(arr2)
})