const {Testimonials} = require ('../models/testimonials.js');

const getTestimonialsById = async (req, res) => {

    const {id} = req.params 
    const testimonials = await Testimonials.findByPk(id).catch(err => console.log(err))
    if(!testimonials) return res.status(404).json( {ok: false})
    return res.status(200).json({testimonials})
}

const getAllTestimonials = async (req, res) => { 
    
    const testimonials = await Testimonials.findAll().catch(err => console.log(err))
    if(!testimonials) return res.status(404).json( {ok: false})
    return res.status(200).json({ testimonials})
}

const deleteTestimonial = async (req, res) => {

    const {id} = req.params;
    if(!id) return res.status(400).send("no id found");

    const isDeleted = await Testimonials.destroy({
        where: {
            id: id
        }
    }).catch(err => console.log(err))
    if(!isDeleted) return res.status(400).send(`Deletion failed Testimonial`).json({ok: false})
    return res.status(200).json({ok: false})

}

const restoreTestimonial = async(req, res) =>{

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

const updateTestimonial = async(req, res) => {
    const { id } = req.params
    const {newValues} = req.body
    if(!id) return res.status(404).send("no id found");
    const updated = await Testimonials.update({...newValues}, {where: {id: id}}).catch(err => console.log(err))
    if(!updated) return res.status(400).json({ok: false})
    return res.status(200).send(updated)
}

const createTestimonials = async (req, res) =>{

    const {newValues} = req.body
    const created = await Testimonials.create({...newValues}).catch(err => console.log(err))
    if(!created) return res.status(400).json({ok: false})
    return res.status(200).send(created)
}

module.exports = {
    getAllTestimonials,
    getTestimonialsById,
    createTestimonials,
    updateTestimonial,
    deleteTestimonial,
    restoreTestimonial
};
