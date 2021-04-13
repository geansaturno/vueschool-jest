
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

    describe('all', () => {
        let model

        beforeEach(() => {
            model = new Model
        })

        describe('When there is data recorded', () => {
            test('should return the stored data', () => {
                const heroes = [{name: 'Jacob'}, {name: 'Rebeca'}]
                model.add(heroes)
                expect(model.all()).toEqual(heroes)
            });

            describe('When the data is changed', () => {
                test('should not change the original data', () => {
                    model.add([{name: 'Moises'}])
                    const data = model.all()

                    data[0].name = 'Jacob'

                    expect(model._collection[0].name).toBe('Moises')
                });
                
            });
        });

        describe('When ther is no data recorded', () => {
            test('should return an empty array', () => {
                expect(model.all()).toEqual([])
            });
        });
        
    });

    describe('add', () => {
        const heroes = ['Moises', 'Abraham']
        test('should add data to the collection', () => {

            const model = new Model
            model.add(heroes)

            expect(model._collection).toEqual(heroes)
        });

        test('should gets called when data is passed to the constructor', () => {
            const spy = jest.spyOn(Model.prototype, 'add')
            const model = new Model(heroes)

            expect(spy).toBeCalled()

            spy.mockRestore()
        });
    });
})



