export class Vehiculo{
    constructor(){
        this._data = [];
    }

    add(data){
        this._data.push(data);
    }

    get data(){
        return [].concat(this._data);
    }

    clear(){
        this._data = [];
    }

    get total(){
        return this._data.reduce((total, item) => total + item.Precio, 0);
    }
}