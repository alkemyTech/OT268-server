exports.checkSchema = ( req, res, next, keys) => {
    //console.log(req.body);
    //console.log(keys);
    let result = true;
    keys.map(item =>{
        !Object.keys(req.body).includes(item) && (result = false)
    })
    if (result) {
        next();
      } else {
        return res.status(401).json({ message: "Falla modelo, no contiene la keys necesarias" });
      }
   
  }
  