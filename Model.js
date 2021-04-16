class Model {
    constructor(options = {}){
        const records = options.data || []

        this._collection = []
        delete options.data

        this._options = Object.assign({primaryKey: 'id'}, options)

        if(records.length){
            this.add(records)
        }
    }

    add(records){
        const mappedRecords = records.map(record => {
            if(record.id) return record
            record.id = Date.now()
            return record
        })
        this._collection.push(...mappedRecords)
    }

    all(){
        return this._collection.map(record => Object.assign({}, record))
    }

    get(key){
        const entry = this._collection.find(entry => entry[this._options.primaryKey] === key)

        return entry? Object.assign({}, entry) : null
    }

    remove(key){
        const index = this._collection.findIndex(entry => entry[this._options.primaryKey] === key)

        if(index >= 0) {
            const entry = this.get(key)
            this._collection.splice(index, 1)
            return entry
        }

        return null
    }

    update(key, record){
        const index = this._collection.findIndex(entry => entry[this._options.primaryKey] === key)

        if(index < 0) return null

        this._collection.splice(index, Object.assign(this._collection[index], record))
    }
}

export default Model