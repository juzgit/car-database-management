const express = require("express");

const router = express.Router();
const Car = require('../models/Car');

//handles the addition of a new car to the database
router.post('/add', async (req, res) => {
    try{
        const { make, model, registrationNumber, currentOwner, manufacturingYear } = req.body;
        const newCar = new Car({
            make,
            model,
            registrationNumber,
            currentOwner,
            manufacturingYear
        });
        await newCar.save();
        res.status(201).json(newCar);
    }catch (error){
        res.status(500).json({ error: error.message });
    }
});

//used to update a specific car in the database based on its id.
router.put('/update/:id', async (req, res) => {
    try{
        const {make, model, registrationNumber, currentOwner, manufacturingYear} = req.body;
        const updatedCar = await Car.findByIdAndUpdate(
            //used to retrieve the id from the request URL.
            req.params.id,
            { make, model, registrationNumber, currentOwner, manufacturingYear },
            { new: true }
        );

        if(!updatedCar){
            return res.status(404).json({error: error.message });
        }

        const updatedCars = await Car.find();
        res.json(updatedCars);
    } catch (error){
        console.error(error);
        res.status(500).json({ error: 'Failed to update car'});
    }
})

//used to update multiple cars in the database based on an array of car ids.
router.put('/bulkUpdate', async (req, res) => {
    try{
        const { carIds, newOwner } = req.body;
        await Car.updateMany(
            { _id: {$in: carIds } },
            { $set: {currentOwner: newOwner }}
        );

        const updatedCars = await Car.find();
        res.status(200).json(updatedCars);
    } catch (error){
        console.error(error);
        res.status(500).json({ error: 'Failed to update cars'});
    }
});

//handles the deletion of a car from the database
router.delete('/delete/:id', async (req, res) => {
    try{
        const deleteCar = await Car.findByIdAndDelete(req.params.id);
        if(!deleteCar){
            return res.status(404).json({ error: 'Car not found'});
        }
        res.json(deleteCar);
    }catch(error){
        res.status(500).json({ error: error.message });
    }
});

//retrieves a list of all cars from the database
router.get('/list', async(req, res) => {
    try{
        const cars = await Car.find();
        res.json(cars);
    } catch(error){
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

//retrieves a list of cars that are older than 5 years from the current year
router.get('/olderthan5years', async (req, res) => {
    try{
        const currentYear = new Date().getFullYear();
        const cars = await Car.find({ manufacturingYear: { $lt: currentYear - 5 }});
        res.json(cars);
    }catch(error){
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;