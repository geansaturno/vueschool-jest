class Model {
    constructor(records = []){
        this._collection = []

        if(records.length){
            this.add(records)
        }
    }

    add(records){
        this._collection.push(...records)
    }

    all(){
        return this._collection.map(record => Object.assign({}, record))
    }

    get(){}
    remove(){}
    update(){}
}

export default Model