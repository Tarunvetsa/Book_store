import express from 'express';
import { Book } from '../models/bookmodel.js';

const router=express.Router();

router.post('/', async (request, response) => {
    try{
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishyear
        ) {
            return response.status(400).send({
                message: 'Send all required fields: name, author, publishyear',
            });
        }
        const newbook={
            title: request.body.title,
            author: request.body.author,
            publishyear: request.body.publishyear,
        };
        
        const book = await Book.create(newbook);
        return response.status(201).send({book});
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
})

router.get('/',async(request, response) => {
    try{
        const books = await Book.find({});
        
        return response.status(200).json({
            count:books.length,
            books: books
        });
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
})

router.get('/:id',async(request, response) => {
    try{
        const {id} = request.params
        const books = await Book.findById(id);
        
        return response.status(200).json({books});
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
})

router.delete('/:id', async(request, response) =>{
    try{
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);
        
        if (!result){
            return response.status(404).json({message: 'Book not found'})
        }
        return response.status(200).json({message:"Book deleted successfully"})
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
})
router.put('/:id',async(request, response) => {
    try{
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishyear
        ) {
            return response.status(400).send({
                message: 'Send all required fields: name, author, publishyear',
            });
        }
        const {id} = request.params
        const result = await Book.findByIdAndUpdate(id, request.body);
        if (!result){
            return response.status(404).send({message:'Book not found' });
        }
        
        return response.status(200).send({message:'Book updated successfully'});
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
})

export default router