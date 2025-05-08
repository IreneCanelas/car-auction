import CarCard from "@/components/car-card.tsx";
import Pagination from "@/components/pagination";
import Sidebar from "@/components/sidebar";
import { CarService } from "@/services/car.ts";
import { createFileRoute, retainSearchParams } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";

export const Route = createFileRoute("/cars/")({
	validateSearch: zodValidator(
		z.object({
			page: z.number().default(1),
			size: z.number().default(10),
			make: z.string().default(""),
			model: z.string().default(""),
			startingBidRange: z
				.object({
					from: z.string().default(""),
					to: z.string().default(""),
				})
				.default({}),
			onlyFavourites: z.boolean().default(false),
			sort: z
				.enum(["", "make", "startingBid", "mileage", "auctionDate"])
				.default(""),
		}),
	),
	loaderDeps: ({ search }) => search,
	loader: ({
		deps: { page, size, make, model, startingBidRange, onlyFavourites, sort },
	}) => {
		const options: CarService.getCarsOptions = {
			paginate: { page, size },
			filter: {
				make,
				model,
				onlyFavourites,
				startingBid: {
					from:
						startingBidRange.from !== ""
							? Number(startingBidRange.from)
							: undefined,
					to:
						startingBidRange.to !== ""
							? Number(startingBidRange.to)
							: undefined,
				},
			},
		};
		if (sort) {
			options.sort = { [sort]: true };
		}
		return CarService.getCars(options);
	},
	search: {
		middlewares: [retainSearchParams(["size"])],
	},
	component: RouteComponent,
});

function RouteComponent() {
	const [cars, carAmount] = Route.useLoaderData();
	const search = Route.useSearch();

	return (
		<>
			<div className="pt-20 flex flex-col md:flex-row">
				<Sidebar
					size={search.size}
					make={search.make}
					model={search.model}
					onlyFavourites={search.onlyFavourites}
					startingBidRange={search.startingBidRange}
					currentSort={search.sort}
				/>
				<div className="flex-1 px-6 pb-24">
					{carAmount === 0 ? (
						<p className="p-6">There are no cars that match your criteria</p>
					) : (
						<div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
							{cars.map((car) => (
								<CarCard key={car.id} data={car} />
							))}
						</div>
					)}
					<div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-md z-10 p-4">
						<div className="ml-auto w-fit pr-5 flex items-center gap-2 text-sm">
							<Pagination
								page={search.page}
								size={search.size}
								carAmount={carAmount}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
