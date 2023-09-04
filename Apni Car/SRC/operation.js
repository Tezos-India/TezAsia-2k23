import * as sp from 'smartpy';

// Connect to the deployed SmartPy contract instance
const contractAddress = 'KT1M6C1CvfFqFoaY3C1VQgB7YmB85BS7VRJB';
const carRental = sp.Contract.at(contractAddress);

// UI Functions
const addCar = async (carId, carName) => {
  await carRental.add_car({ car_id: carId, car_name: carName }).send();
  console.log(`Car ${carId} - ${carName} added successfully.`);
};

const reserveCar = async (carId, uniqueId) => {
  await carRental.reserve_car({ car_id: carId, unique_ID: uniqueId }).send();
  console.log(`Car ${carId} reserved successfully.`);
};

const removeCar = async (carId) => {
  await carRental.remove_car({ car_id: carId }).send();
  console.log(`Car ${carId} removed successfully.`);
};

const cancelReservation = async (carId) => {
  await carRental.cancel_reservation({ car_id: carId }).send();
  console.log(`Reservation canceled for Car ${carId}.`);
};

// Example usage
const testUI = async () => {
  // Add cars
  await addCar(1, 'Car 1');
  await addCar(2, 'Car 2');
  await addCar(3, 'Car 3');

  // Reserve a car
  await reserveCar(2, 12345);

  // Remove a car
  await removeCar(3);

  // Cancel reservation
  await cancelReservation(2);
};

// Run the example UI test
testUI();
