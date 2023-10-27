import React, {useEffect, useState} from "react"; 
import './BulkUpdate.css';

const BulkUpdate = () => {
    const [selectedCars, setSelectedCars] = useState([]); //state to store the selected cars
    const [newOwner, setNewOwner] = useState('');  //stores the value of the new owner's name.
    const [cars, setCars] = useState([]); //state to store the list of cars

    const Checkbox = (carId) => {
        if(selectedCars.includes(carId)){
            setSelectedCars(selectedCars.filter(id => id !== carId)); //if the car is already selected, remove it from the selectedCars array
        } else {
            setSelectedCars([...selectedCars, carId]); //if the car is not selected, add it to the selectedCars array
        }
    };

    const Update = async () => {
        try{
            const response = await fetch('/cars/bulkUpdate', { //send a PUT request to the server to update the selected cars
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                //the request includes the selected car IDs (selectedCars) and the new owner's name (newOwner) in the request body as JSON.
                body: JSON.stringify({
                    carIds: selectedCars, //pass the selected car IDs
                    newOwner: newOwner,
                }),
            });

            if(response.status === 200){
                console.log('Updated cars successfully.') //log a success message if the cars are successfully updated
            } else {
                console.log('Failed to update cars.') //log an error message if the cars failed to update
            }
        } catch(error){
            //log any errors that occur during the update process
            console.error(error);
        }
    };

    //fetch the list of cars from the server when the component mounts.
    useEffect(() => {
        const fetchCars = async () => {
            try{
                //fetch the list of cars from the server
                const response = await fetch('/cars/list');
                const data = await response.json();
                //update the cars state with the fetched data
                setCars(data);
            } catch (error){
                //log any errors that occur during the fetch process
                console.error(error);
            }
        };
        fetchCars();
    }, []);

    return(
        <div className="bulk-update">
            <h2 className="bulk-update-heading">Bulk Update Cars</h2>
            <div>
                {cars.map((car) => (
                    <div className="check" key={car._id}>
                        <input
                        type="checkbox"
                        checked={selectedCars.includes(car._id)}
                        onChange={() => Checkbox(car._id)}
                        />
                    <p className="bulk-p"> Make:{car.make} | Model:{car.model} | Owner: {car.currentOwner} (ID: {car._id})</p>    
                    </div>
                ))}

            <div className="input-bulk">
            <input className="bulk-input"
                type="text"
                placeholder="New owner"
                value={newOwner}
                onChange={(e) => setNewOwner(e.target.value)}
                />
            </div>


                <button className="bulk-update-btn" onClick={Update}>Update Selected Cars</button>
            </div>
           
        </div>
    )
}

export default BulkUpdate;