
import Model from './Model'

describe('Model', () => {
    test('Sanity test', () => {
        expect(new Model).toBeInstanceOf(Model)
    })

    test('Structure', () => {
        expect(new Model).toEqual(expect.objectContaining({
            _collection: expect.any(Array),
            add: expect.any(Function),
            remove: expect.any(Function),
            all: expect.any(Function),
            get: expect.any(Function),
            update: expect.any(Function),
        }))
    })
})



