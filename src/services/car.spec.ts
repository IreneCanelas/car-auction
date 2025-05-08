import type { Car } from "@/types/car";
import { CarService } from "./car";

const mockCars: Car[] = [
	{
		id: 1,
		make: "Toyota",
		model: "C-HR",
		engineSize: "1.8L",
		fuel: "diesel",
		year: 2022,
		mileage: 743,
		auctionDateTime: new Date("2024/04/15 09:00:00"),
		startingBid: 17000,
		favourite: true,
		details: {
			specification: {
				vehicleType: "Car",
				colour: "RED",
				fuel: "petrol",
				transmission: "Manual",
				numberOfDoors: 3,
				co2Emissions: "139 g/km",
				noxEmissions: 230,
				numberOfKeys: 2,
			},
			ownership: {
				logBook: "Present",
				numberOfOwners: 8,
				dateOfRegistration: "2015/03/31 09:00:00",
			},
			equipment: [
				"Air Conditioning",
				"Tyre Inflation Kit",
				"Photocopy of V5 Present",
				"Navigation HDD",
				"17 Alloy Wheels",
				"Engine Mods/Upgrades",
				"Modifd/Added Body Parts",
			],
		},
	},
	{
		id: 2,
		make: "Ford",
		model: "Fiesta",
		engineSize: "1.6L",
		fuel: "petrol",
		year: 2022,
		mileage: 9084,
		auctionDateTime: new Date("2024/04/15 09:00:00"),
		startingBid: 15000,
		favourite: false,
		details: {
			specification: {
				vehicleType: "Car",
				colour: "RED",
				fuel: "petrol",
				transmission: "Manual",
				numberOfDoors: 3,
				co2Emissions: "139 g/km",
				noxEmissions: 230,
				numberOfKeys: 2,
			},
			ownership: {
				logBook: "Present",
				numberOfOwners: 8,
				dateOfRegistration: "2015/03/31 09:00:00",
			},
			equipment: [
				"Air Conditioning",
				"Tyre Inflation Kit",
				"Photocopy of V5 Present",
				"Navigation HDD",
				"17 Alloy Wheels",
				"Engine Mods/Upgrades",
				"Modifd/Added Body Parts",
			],
		},
	},
	{
		id: 3,
		make: "Toyota",
		model: "Corolla",
		engineSize: "1.6L",
		fuel: "diesel",
		year: 2020,
		mileage: 17293,
		auctionDateTime: new Date("2024/04/15 10:00:00"),
		startingBid: 7000,
		favourite: true,
		details: {
			specification: {
				vehicleType: "Car",
				colour: "RED",
				fuel: "petrol",
				transmission: "Manual",
				numberOfDoors: 3,
				co2Emissions: "139 g/km",
				noxEmissions: 230,
				numberOfKeys: 2,
			},
			ownership: {
				logBook: "Present",
				numberOfOwners: 8,
				dateOfRegistration: "2015/03/31 09:00:00",
			},
			equipment: [
				"Air Conditioning",
				"Tyre Inflation Kit",
				"Photocopy of V5 Present",
				"Navigation HDD",
				"17 Alloy Wheels",
				"Engine Mods/Upgrades",
				"Modifd/Added Body Parts",
			],
		},
	},
];

beforeEach(() => {
	localStorage.clear();
	localStorage.setItem("cars", JSON.stringify(mockCars));
	CarService.invalidate();
});

describe("CarService.getCars", () => {
	it("returns all cars with no options", async () => {
		const [cars, count] = await CarService.getCars();

		expect(cars).toHaveLength(3);
		expect(count).toBe(3);
	});

	describe("filters", () => {
		it("filters by make", async () => {
			const [cars] = await CarService.getCars({ filter: { make: "For" } });
			expect(cars).toHaveLength(1);
			expect(cars[0].make).toBe("Ford");
		});

		it("filters by model", async () => {
			const [cars] = await CarService.getCars({ filter: { model: "Cor" } });
			expect(cars).toHaveLength(1);
			expect(cars[0].model).toBe("Corolla");
		});

		it("filters by onlyFavourites", async () => {
			const [cars] = await CarService.getCars({
				filter: { onlyFavourites: true },
			});
			expect(cars).toHaveLength(2);
			expect(cars.every((c) => c.favourite)).toBe(true);
		});

		it("filters by startingBid range", async () => {
			const [cars] = await CarService.getCars({
				filter: { startingBid: { from: 4000, to: 10000 } },
			});
			expect(cars).toHaveLength(1);
			expect(cars[0].startingBid).toBe(7000);
		});
	});

	describe("sorting", () => {
		it("sorts by make alphabetically", async () => {
			const [cars] = await CarService.getCars({ sort: { make: true } });
			expect(cars.map((c) => c.make)).toEqual(["Ford", "Toyota", "Toyota"]);
		});

		it("sorts by startingBid ascending", async () => {
			const [cars] = await CarService.getCars({ sort: { startingBid: true } });
			expect(cars.map((c) => c.startingBid)).toEqual([7000, 15000, 17000]);
		});

		it("sorts by mileage ascending", async () => {
			const [cars] = await CarService.getCars({ sort: { mileage: true } });
			expect(cars.map((c) => c.mileage)).toEqual([743, 9084, 17293]);
		});

		it("sorts by auctionDate ascending", async () => {
			const [cars] = await CarService.getCars({ sort: { auctionDate: true } });
			expect(cars.map((c) => c.auctionDateTime.toString())).toEqual([
				"2024-04-15T08:00:00.000Z",
				"2024-04-15T08:00:00.000Z",
				"2024-04-15T09:00:00.000Z",
			]);
		});
	});

	describe("pagination", () => {
		it("returns correct page slice", async () => {
			const [cars, count] = await CarService.getCars({
				paginate: { page: 2, size: 1 },
			});
			expect(cars).toHaveLength(1);
			expect(count).toBe(3);
			expect(cars[0].id).toBe(2);
		});
	});

	it("returns filtered count even with pagination", async () => {
		const [cars, count] = await CarService.getCars({
			filter: { make: "Toyota" },
			paginate: { page: 1, size: 1 },
		});

		expect(cars).toHaveLength(1);
		expect(count).toBe(2);
	});
});
