const {Testimonials} = require ('../models/testimonials.js');

class TestimonialsController {

constructor() { }

async getTestimonialsById(req, res) {

    const {id} = req.params 
    const testimonials = await Testimonials.findByPk(id).catch(err => console.log(err))
    if(!testimonials) return res.status(404).json( {ok: false})
    return res.status(200).json({testimonials})
}

async  getAllTestimonials(req, res) { 
    
    const testimonials = await Testimonials.findAll().catch(err => console.log(err))
    if(!testimonials) return res.status(404).json( {ok: false})
    return res.status(200).json({ testimonials})
}

async  deleteTestimonial(req, res) {

    const {id} = req.body
    if(!id) return res.status(400).send("no id found");

    const isDeleted = await Testimonials.destroy({
        where: {
            id: id
        }
    }).catch(err => console.log(err))
    if(!isDeleted) return res.status(400).send(`Deletion failed Testimonial`).json({ok: false})
    return res.status(200).json({ok: false})

}

async  restoreTestimonial(req, res){

    const {id} = req.body
    if(!id) return res.status(404).send("no id found")
    const isRestored = await Testimonials.restore({
        where: {
            id: id
        }
    }).catch(err => console.log(err))
    if(!isRestored) return res.status(400).send("restoring failed").json({ok: false})
    return res.status(200).json({ok: false})
}

async  updateTestimonial(req, res){

    const {id, newValues} = req.body
    const updated = await Testimonials.update({...newValues}, {where: {id: id}}).catch(err => console.log(err))
    if(!updated) return res.status(400).json({ok: false})
    return res.status(200).send(updated)
}

async  createTestimonials(req, res){

    const {newValues} = req.body
    const created = await Testimonials.create({...newValues}).catch(err => console.log(err))
    if(!created) return res.status(400).json({ok: false})
    return res.status(200).send(created)
}
}
module.exports = { TestimonialsController };
