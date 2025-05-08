import type { Car } from "@/types/car.ts";

export namespace CarService {
	const cars: Car[] = [];

	export type getCarsOptions = {
		paginate?: { page: number; size: number };
		filter?: {
			make?: string;
			model?: string;
			onlyFavourites?: boolean;
			startingBid?: { from?: number; to?: number };
		};
		sort?: {
			make?: boolean;
			startingBid?: boolean;
			mileage?: boolean;
			auctionDate?: boolean;
		};
	};

	export async function getCars(
		options?: getCarsOptions,
	): Promise<[Car[], number]> {
		if (cars.length === 0) {
			await loadData();
		}

		let carsToReturn = cars;

		if (!options) {
			return [cars, cars.length];
		}

		if (options.filter) {
			carsToReturn = carsToReturn.filter((car) => {
				const matchesMake =
					!options.filter?.make ||
					car.make
						.toLowerCase()
						.startsWith(options.filter?.make.toLowerCase().trim());
				const matchesModel =
					!options.filter?.model ||
					car.model
						.toLowerCase()
						.startsWith(options.filter?.model.toLowerCase().trim());
				const matchesOnlyFavourite =
					!options.filter?.onlyFavourites || car.favourite;

				const matchesStartingBid =
					(!options.filter?.startingBid?.from ||
						car.startingBid >= options.filter?.startingBid.from) &&
					(!options.filter?.startingBid?.to ||
						car.startingBid <= options.filter?.startingBid.to);

				return (
					matchesMake &&
					matchesModel &&
					matchesOnlyFavourite &&
					matchesStartingBid
				);
			});
		}
		const carAmountAfterFilter = carsToReturn.length;

		if (options.sort) {
			const sortKey = Object.entries(options.sort).find(
				([_, value]) => value,
			)?.[0] as keyof Car;
			carsToReturn = carsToReturn.sort((carA, carB) => {
				const valA = carA[sortKey];
				const valB = carB[sortKey];
				if (typeof valA === "string" && typeof valB === "string") {
					return valA.localeCompare(valB);
				}

				if (valA instanceof Date && valB instanceof Date) {
					return valA.getTime() - valB.getTime();
				}

				if (typeof valA === "number" && typeof valB === "number") {
					return valA - valB;
				}

				return 0;
			});
		}

		if (options.paginate) {
			carsToReturn = carsToReturn.slice(
				options.paginate.size * (options.paginate.page - 1),
				options.paginate.size * options.paginate.page,
			);
		}
		return [carsToReturn, carAmountAfterFilter];
	}

	export async function getCar(id: number) {
		if (cars.length === 0) {
			await loadData();
		}

		return cars[id];
	}

	async function loadData() {
		const localCars = localStorage.getItem("cars");
		if (localCars) {
			cars.push(...(JSON.parse(localCars) as Car[]));
			return;
		}
		const res = await fetch("/../vehicles_dataset.json");
		const data = await res.json();
		for (let i = 0; i < data.length; i++) {
			cars.push({ id: i, ...data[i] });
		}
		localStorage.setItem("cars", JSON.stringify(cars));
	}

	export function toggleFavourite(id: number) {
		const car = cars[id];
		car.favourite = !car.favourite;
		save(id, car);
	}

	function save(id: number, car: Car) {
		cars[id] = car;
		localStorage.setItem("cars", JSON.stringify(cars));
	}

	// just for testing purposes, not suitable for production app as exposes unwanted functionalities
	export function invalidate() {
		cars.length = 0;
	}
}
