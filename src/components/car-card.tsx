import { useTimer } from "@/hooks/useTimer.ts";
import { CarService } from "@/services/car.ts";
import type { Car } from "@/types/car.ts";
import { formatDuration } from "@/utils/dateTime";
import { Link, useRouter } from "@tanstack/react-router";
import { HeartIcon } from "lucide-react";
import Detail from "./detail";

export default function CarCard({ data }: { data: Car }) {
	const router = useRouter();

	const currentDate = new Date(2024, 3, 14, 8);

	const { timeLeft } = useTimer({
		timeInterval: Math.floor(
			(new Date(data.auctionDateTime).getTime() - currentDate.getTime()) / 1000,
		),
	});

	const timeLeftString = formatDuration(timeLeft);

	return (
		<Link to="/cars/$id" params={{ id: String(data.id) }}>
			<div className="relative w-full h-auto min-w-0 bg-white border border-gray-300 rounded-xl shadow-md hover:shadow-lg transition-shadow p-4">
				<img
					src="https://placehold.co/600x400"
					alt={`${data.make} ${data.model}`}
					className="rounded-md mb-4 w-full object-cover"
				/>

				<div className="space-y-2 text-sm px-1 pb-10">
					<Detail label="Make" value={data.make} />
					<Detail label="Model" value={data.model} />
					<Detail label="Mileage" value={`${data.mileage} km`} />
					<Detail label="Starting Bid" value={`${data.startingBid} €`} />
					<Detail label="Time to auction" value={timeLeftString} />
				</div>

				<button
					type="button"
					onClick={(e) => {
						e.preventDefault();
						CarService.toggleFavourite(data.id);
						router.invalidate();
					}}
					className="absolute right-3 bottom-3 hover:scale-110 transition-transform cursor-pointer"
				>
					<HeartIcon
						aria-label="favourite-button"
						className={`w-6 h-6 ${
							data.favourite ? "fill-red-600 stroke-red-600" : "stroke-black"
						}`}
					/>
				</button>
			</div>
		</Link>
	);
}
