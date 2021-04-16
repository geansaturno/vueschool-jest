
import Model from './Model'

function createModel(data, options) {
    return new Model({data: data, ...options})
}

describe('Model', () => {
    test('Sanity test', () => {
        expect(new Model).toBeInstanceOf(Model)
    })

    test('Structure', () => {
        expect(new Model).toEqual(expect.objectContaining({
            _collection: expect.any(Array),
            _options: expect.objectContaining({
                primaryKey: 'id'
            }),
            add: expect.any(Function),
            remove: expect.any(Function),
            all: expect.any(Function),
            get: expect.any(Function),
            update: expect.any(Function),
        }))
    })

    describe('customization', () => {
        test('should change the primarykey', () => {
            const model = createModel([], {
                primaryKey: 'name'
            })

            expect(model._options).toEqual(expect.objectContaining({
                primaryKey: 'name'
            }))
        });
    })

    describe('all', () => {
        let model

        beforeEach(() => {
            model = createModel()
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
        const heroes = [{id: 1, name:'Moises'}, {name: 'Abraham'}]
        test('should add data to the collection', () => {

            const model = createModel()
            model.add(heroes)

            expect(model._collection).toEqual(heroes)
        });

        test('should create an id for the entry when ther is none', () => {
            const model = createModel(heroes)
            
            expect(model._collection).toEqual([
                heroes[0],
                {
                    name: heroes[1].name,
                    id: expect.any(Number)
                }

            ])
        })

        test('should gets called when data is passed to the constructor', () => {
            const spy = jest.spyOn(Model.prototype, 'add')
            const model = createModel(heroes)

            expect(spy).toBeCalled()

            spy.mockRestore()
        })
    })

    describe('get', () => {
        const heroes = [{id: 1, name:'Moises'}, {name: 'Abraham'}]

        describe('When no entry is found', () => {
            test('should return null', () => {
                const model = createModel();

                expect(model.get(1)).toBeNull()
            })
        })

        describe('When an entry is found', () => {
            test('should return the entry', () => {
                const model = createModel(heroes)

                expect(model.get(1)).toEqual(heroes[0])
            })
        })

        describe('With custom primaryKey', () => {
            test('should return the match entry', () => {
                const model = createModel(heroes, {primaryKey: 'name'})
                expect(model.get('Moises')).toEqual(heroes[0])
            });
        })
    })

    describe('update', () => {
        const heroes = [{id: 1, name:'Moises'}, {name: 'Abraham'}]
        let model
        let dataSet

        beforeEach(() => {
            dataSet = JSON.parse(JSON.stringify(heroes))
            model = createModel(dataSet)
        })
        
        test('should update an entry by id', () => {
            model.update(1, {name: 'Joshua'})
            const entry = model.get(1)
            expect(entry).toHaveProperty('name')
            expect(entry.name).toBe('Joshua')
        });

        test('should return null when an id dont exist', () => {
            expect(model.update(2, {name: 'Jesabel'})).toBeNull()
        });

        test('should extend an entry by id', () => {
            model.update(1, {rod: true})
            const entry = model.get(1)
            expect(entry).toHaveProperty('rod')
            expect(entry.rod).toBe(true)
        });

        describe('With custom primaryKey', () => {
            test('should update the match entry', () => {
                model = createModel(dataSet, {primaryKey: 'name'})
                model.update('Abraham', {rod: true})
                const entry = model.get('Abraham')
                expect(entry).toHaveProperty('rod')
                expect(entry.rod).toBe(true)
            });
        })
    })

    describe('remove', () => {
        const heroes = [{id: 1, name:'Moises'}, {name: 'Abraham'}]
        let model

        beforeEach(() => {
            const dataSet = JSON.parse(JSON.stringify(heroes))
            model = createModel(dataSet)
        })

        test('should remove an entry by id', () => {
            model.remove(1)
            expect(model._collection).toEqual([expect.objectContaining({
                id: expect.any(Number),
                name: heroes[1].name
            })])
            
        });

        test('should return the removed entry', () => {
            const entry = model.remove(1)
            expect(entry).toEqual(heroes[0])
        });

        test('should return null when no entry is found', () => {
            const value = model.remove(2)
            expect(value).toBeNull()
        });
    })
})



