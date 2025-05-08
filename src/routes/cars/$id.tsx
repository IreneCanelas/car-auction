import SpecificCar from "@/components/specific-car";
import { CarService } from "@/services/car.ts";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cars/$id")({
	component: RouteComponent,
	errorComponent: ErrorComponent,
	loader: async ({ params: { id } }) => {
		return await CarService.getCar(Number(id));
	},
});

function RouteComponent() {
	const car = Route.useLoaderData();

	return (
		<>
			<div className="max-w-screen-lg mx-auto px-6 pt-24 pb-12">
				<Link
					to="/cars"
					className="inline-block mb-4 text-black-600 hover:underline font-medium transition-colors"
				>
					← Back to Car Listings
				</Link>

				<SpecificCar car={car} />
			</div>
		</>
	);
}

function ErrorComponent() {
	return (
		<div>
			<p>Error fetching car information</p>
		</div>
	);
}
