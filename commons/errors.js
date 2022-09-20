class AppError extends Error {
  constructor(message, code = 500, data){
      super(message);
      this.code = code;
      this.data = data;
  }
}
//ejemplo de como construir el error :
//throw new AppError('The id does not exist in DB', 400);


module.exports = AppError;