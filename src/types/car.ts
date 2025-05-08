export type Car = {
	id: number;
	make: string;
	model: string;
	engineSize: string;
	fuel: string;
	year: number;
	mileage: number;
	auctionDateTime: Date;
	startingBid: number;
	favourite: boolean;
	details: CarDetails;
};

export type CarDetails = {
	specification: CarSpecification;
	ownership: CarOwnership;
	equipment: string[];
};

export type CarSpecification = {
	vehicleType: string;
	colour: string;
	fuel: string;
	transmission: string;
	numberOfDoors: number;
	co2Emissions: string;
	noxEmissions: number;
	numberOfKeys: number;
};

export type CarOwnership = {
	logBook: string;
	numberOfOwners: number;
	dateOfRegistration: string;
};
