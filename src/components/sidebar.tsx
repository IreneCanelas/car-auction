import Filter from "./filter";
import PageSize from "./page-size";
import Sort from "./sort";

export default function Sidebar({
	size,
	make,
	model,
	onlyFavourites,
	startingBidRange,
	currentSort,
}: {
	size: number;
	make: string;
	model: string;
	onlyFavourites: boolean;
	startingBidRange: { from: string; to: string };
	currentSort: string;
}) {
	return (
		<div className="w-full md:w-64 shrink-0 bg-white p-4 space-y-5 border-b md:border-b-0 md:border-r md:mb-20 border-gray-300 shadow-md h-fit">
			<Sort currentSort={currentSort} />
			<PageSize size={size} />
			<Filter
				make={make}
				model={model}
				onlyFavourites={onlyFavourites}
				startingBidRange={startingBidRange}
			/>
		</div>
	);
}
