import { useTimer } from "@/hooks/useTimer";
import { CarService } from "@/services/car";
import type { Car } from "@/types/car";
import { formatDate, formatDuration } from "@/utils/dateTime";
import { useRouter } from "@tanstack/react-router";
import { HeartIcon } from "lucide-react";
import CarInfo from "./car-info";

export default function SpecificCar({ car }: { car: Car }) {
	const router = useRouter();

	const currentDate = new Date(2024, 3, 14, 8);

	const { timeLeft } = useTimer({
		timeInterval: Math.floor(
			(new Date(car.auctionDateTime).getTime() - currentDate.getTime()) / 1000,
		),
	});

	const timeLeftString = formatDuration(timeLeft);

	return (
		<div className="bg-white shadow-md rounded-xl overflow-hidden">
			<img
				src={"https://placehold.co/600x400"}
				alt={`${car.make} ${car.model}`}
				className="w-full h-64 object-cover"
			/>

			<div className="p-6">
				<div className="flex justify-between items-center mb-4">
					<h1 className="text-2xl font-bold">
						{car.make} {car.model}
					</h1>
					<button
						type="button"
						onClick={(e) => {
							e.preventDefault();
							CarService.toggleFavourite(car.id);
							router.invalidate();
						}}
						className="text-red-600 hover:scale-110 transition-transform"
					>
						<HeartIcon
							className={`w-6 h-6 ${car.favourite ? "fill-red-600 stroke-red-600" : "stroke-black"}`}
						/>
					</button>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
					<CarInfo label="Year" value={car.year} />
					<CarInfo label="Engine Size" value={car.engineSize} />
					<CarInfo label="Fuel" value={car.fuel} />
					<CarInfo label="Mileage" value={`${car.mileage} km`} />
					<CarInfo label="Starting Bid" value={`${car.startingBid} €`} />
					<CarInfo label="Time to Auction" value={timeLeftString} />
				</div>

				<hr className="my-6 border-gray-300" />

				<h2 className="text-xl font-semibold mb-2">Specifications</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
					<CarInfo
						label="Vehicle Type"
						value={car.details.specification.vehicleType}
					/>
					<CarInfo label="Colour" value={car.details.specification.colour} />
					<CarInfo label="Fuel Type" value={car.details.specification.fuel} />
					<CarInfo
						label="Transmission"
						value={car.details.specification.transmission}
					/>
					<CarInfo
						label="Number of Doors"
						value={car.details.specification.numberOfDoors}
					/>
					<CarInfo
						label="CO2 Emissions"
						value={car.details.specification.co2Emissions}
					/>
					<CarInfo
						label="NOx Emissions"
						value={`${car.details.specification.noxEmissions} mg/km`}
					/>
					<CarInfo
						label="Number of Keys"
						value={car.details.specification.numberOfKeys}
					/>
				</div>

				<hr className="my-6 border-gray-300" />

				<h2 className="text-xl font-semibold mb-2">Ownership</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
					<CarInfo label="Log Book" value={car.details.ownership.logBook} />
					<CarInfo
						label="Number of Owners"
						value={car.details.ownership.numberOfOwners}
					/>
					<CarInfo
						label="Date of Registration"
						value={formatDate(car.details.ownership.dateOfRegistration)}
					/>
				</div>

				<hr className="my-6 border-gray-300" />

				<h2 className="text-xl font-semibold mb-2">Equipment</h2>
				<ul className="list-disc list-inside text-sm space-y-1">
					{car.details.equipment.map((item) => (
						<li key={item}>{item}</li>
					))}
				</ul>
			</div>
		</div>
	);
}
