import { useNavigate } from "@tanstack/react-router";

export default function Filter({
	make,
	model,
	onlyFavourites,
	startingBidRange,
}: {
	make: string;
	model: string;
	onlyFavourites: boolean;
	startingBidRange: { from: string; to: string };
}) {
	const navigate = useNavigate();

	return (
		<>
			<div>
				<label htmlFor="make" className="font-bold block mb-1">
					Make
				</label>
				<input
					className="w-full border border-black p-1"
					name="make"
					type="text"
					placeholder="Search by Make"
					value={make}
					onChange={(e) =>
						navigate({
							to: ".",
							search: (prev) => ({ ...prev, make: e.target.value }),
						})
					}
				/>
			</div>

			<div>
				<label htmlFor="model" className="font-bold block mb-1">
					Model
				</label>
				<input
					className="w-full border border-black p-1"
					name="model"
					type="text"
					placeholder="Search by Model"
					value={model}
					onChange={(e) =>
						navigate({
							to: ".",
							search: (prev) => ({ ...prev, model: e.target.value }),
						})
					}
				/>
			</div>

			<div className="flex items-center space-x-2">
				<label htmlFor="onlyFavourites" className="font-bold">
					Only favourites
				</label>
				<input
					className="w-4 h-4"
					name="onlyFavourites"
					type="checkbox"
					checked={onlyFavourites}
					onChange={() =>
						navigate({
							to: ".",
							search: (prev) => ({
								...prev,
								onlyFavourites: !prev.onlyFavourites,
							}),
						})
					}
				/>
			</div>

			<div>
				<p className="font-bold mb-1">Starting bid range</p>
				<div className="flex space-x-2">
					<input
						className="w-1/2 border border-black p-1"
						name="startingBidRange"
						placeholder="From"
						type="number"
						min="0"
						value={startingBidRange.from}
						onChange={(e) =>
							navigate({
								to: ".",
								search: (prev) => ({
									...prev,
									startingBidRange: {
										...prev.startingBidRange,
										from: e.target.value,
									},
								}),
							})
						}
					/>
					<input
						className="w-1/2 border border-black p-1"
						name="startingBidRange"
						placeholder="To"
						type="number"
						min="0"
						value={startingBidRange.to}
						onChange={(e) =>
							navigate({
								to: ".",
								search: (prev) => ({
									...prev,
									startingBidRange: {
										...prev.startingBidRange,
										to: e.target.value,
									},
								}),
							})
						}
					/>
				</div>
			</div>
		</>
	);
}
