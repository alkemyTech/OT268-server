async function getOrganizationController(req,res){
  return res.status(200).json({message:'some content'})
}

module.exports = {
  getOrganizationController,
}