import CarsHero from "../../components/CarsHero";
import Cars from "../../components/sections/Cars";
import { CarModel } from "../../models/Car";

async function getCars() {
  try {
    const cars = await CarModel.getAllCars();
    // Ensure _id is a string for frontend compatibility
    return cars.map((car) => ({
      ...car,
      _id: car._id?.toString() || "",
    }));
  } catch (error) {
    console.error("Error fetching cars:", error);
    return [];
  }
}

export default async function CarsPage() {
  const cars = await getCars();

  return (
    <main>
      <CarsHero />
      <Cars initialCars={cars} />
    </main>
  );
}


