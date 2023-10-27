import React, {useState, useEffect} from "react";
import './CarList.css';

//displays a list of cars fetched from the server
const CarList = () => {
    const [cars, setCars] = useState([]);
    const [updatedCar, setUpdatedCar] = useState({});
    const [oldCars, setOldCars] = useState([]);

    useEffect(() => {
        //fetchCars function is responsible for making an asynchronous request to the server to fetch the list of cars.
        const fetchCars = async () => {
            try{
                const response = await fetch('/cars/list');
                const data = await response.json();
                setCars(data);
            }catch(error){
                console.error(error);
            }
        };
        fetchCars();
    }, []);

    //fetch the list of cars older than 5 years from the server.
    useEffect(() => {
        const fetchOldCars = async () => {
            try{
                const response = await fetch('/cars/olderthan5years');
                const data = await response.json();
                setOldCars(data);
            }catch(error){
                console.error(error);
            }
        }

        fetchOldCars();
    }, []);

    //updating a car's information.
    const Update = async (carId) => {
        try{
            //makes a PUT request to the /cars/update/${carId} endpoint with the updated car data.
            const response = await fetch(`cars/update/${carId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(updatedCar[carId]),
            });

            if(response.status === 200){
                const updatedCar = await response.json();
                setCars(updatedCar);
                setUpdatedCar({
                    ...updatedCar,
                    [carId]: {
                        registrationNumber: '',
                        currentOwner:''
                    },
                });
            } else {
                console.error('Failed to update car');
            }
        } catch(error){
            console.error(error);
        }
    };

    //when the user types in the input fields for updating a car's information.
    //updates the updatedCar state variable with the new values for the specific car.
    const InputChanges = (carId, property, value) => {
        setUpdatedCar({
            ...updatedCar,
            [carId]: {
                ...updatedCar[carId],
                [property]: value,
            },
        });
    };


    //responsible for deleting a car.
    //makes a DELETE request to the /cars/delete/${carId} endpoint.
    const Delete = async (carId) => {
        try{
            const response = await fetch(`/cars/delete/${carId}`, {
                method: 'DELETE'
            });

            if(response.status === 200){
                setCars(prevCars => prevCars.filter(car => car._id !== carId));
            } else {
                console.error('Failed to delete car');
            }
        } catch (error){
            console.error(error);
        }
    };

    //renders the list of cars and the list of cars older than 5 years.
    return(
        <div className="list">
            <h2 className="list-heading">Car List</h2>
            <ul>
                {cars.map((car)=> (
                    <li className="all-cars" key={car._id}>
                     <p className="cars-details"> {car.make} {car.model} {car.manufacturingYear} {car.currentOwner} {car.registrationNumber} </p>   
                        <input
                        type="text"
                        placeholder="New registration number"
                        value={updatedCar[car._id]?.registrationNumber || ''}
                        onChange={(e) => InputChanges(car._id, 'registrationNumber', e.target.value)}
                        />  
                        <input
                        type="text"
                        placeholder="New owner"
                        value={updatedCar[car._id]?.currentOwner || ''}   
                        onChange={(e) => InputChanges(car._id, 'currentOwner', e.target.value)}    
                        />
                        <button className="update-btn" onClick={() => Update(car._id)}>Update</button>                                       
                        <button className="delete-btn" onClick={() => Delete(car._id)}>Delete</button>
                    </li>
                ))}
            </ul>
            
            <h2 className="oldcars-heading">Cars Older Than 5 years</h2>
            <ul>
                {oldCars.map((oldcar) => (
                    <li className="oldcars-list" key={oldcar._id}>
                     <p className="oldcars-details">  Make: {oldcar.make}, Model: {oldcar.model}, Registration Number: {oldcar.registrationNumber}, Current Owner: {oldcar.currentOwner}</p>   
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CarList;