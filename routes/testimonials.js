const express = require('express');
const router = express.Router();
const { checkRol} = require('../middlewares/checkRol/checkRol')
const { 
    createTestimonials,
    getAllTestimonials,
    getTestimonialsById,
    updateTestimonial,
    deleteTestimonial,
    restoreTestimonial
 } = require('../controllers/testimonials.controller');


router.get('/', getAllTestimonials );
router.put('/:id',checkRol, updateTestimonial );
router.delete('/:id',checkRol, deleteTestimonial );
//router.post('/:id',checkRol, createTestimonials );
router.post('/', createTestimonials );

module.exports = router;
//agregar checkRol al post y get luego de hacer paginacion y arreglar error de auth user