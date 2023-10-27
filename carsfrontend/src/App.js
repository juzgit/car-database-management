import React from "react";
//importing the components
import CarForm from "./components/CarForm";
import CarList from "./components/CarsList";
import BulkUpdate from "./components/BulkUpdateForm";
import './App.css'

function App() {
  return (
    <div className="App">
      <h1 className="heading">Car Inventory </h1>
      <p className="addCars">Add a new car</p>

      <CarForm />
      <CarList />
      <BulkUpdate />
    </div>
  );
};

export default App;
