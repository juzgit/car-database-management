import React, {useState} from "react";
import './CarForm.css'

const CarForm = () => {
    //a state variable called form and a function called setForm to update the state.
    //form is an object with empty strings for the make, model, registrationNumber, currentOwner, and manufacturingYear properties.
    const [form, setForm ] = useState({
        make:'',
        model:'',
        registrationNumber:'',
        currentOwner:'',
        manufacturingYear:'',
    });

    //extracts the name and value from the event target and updates the form state 
    //by spreading the existing form object and replacing the value of the corresponding property with the new value.
    const input = (e) => {
        const { name, value} = e.target;
        setForm({...form, [name]: value});
    };

    //handle the form submission.
    const Submit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch('https://car-database-api.onrender.com/cars/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(form),
            });
            const data = response.json();
            console.log('New car added:', data);
        }catch(error){
            console.error(error);
        }
    }

    //renders a form element with several input fields and a submit button.
    //each input field is associated with a specific property of the form state object and is updated using the input function.
    return(
    <div className="container">
        <form className="form" onSubmit={Submit}>
            <input
            type="text"
            placeholder="Make of the car"
            name="make" 
            value={form.make}
            onChange={input}
            />

            <input 
            type="text"
            placeholder="Model of the car"
            name="model"
            value={form.model}
            onChange={input}
            />

            <input
            type="text"
            placeholder="Registration Number"
            name="registrationNumber"
            value={form.registrationNumber}
            onChange={input}
            />

            <input 
            type="text"
            placeholder="Current owner"
            name="currentOwner"
            value={form.currentOwner}
            onChange={input}
            />

            <input 
            type="number"
            placeholder="Manufacturing Year"
            name="manufacturingYear"
            value={form.manufacturingYear}
            onChange={input}
            />

            <button className="formbtn" type="submit">Add</button>
        </form>
        </div>
    )
}

export default CarForm;