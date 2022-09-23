
class Success {

    constructor(data) {
        this.status = 'OK',
        this.data = data
    }
}
//ejemplo de como construir una respuesta satifactoria
//res.json(new Success(movies));


module.exports = Success;