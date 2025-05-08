import { useNavigate } from "@tanstack/react-router";

export default function Sort({ currentSort }: { currentSort: string }) {
	const navigate = useNavigate();

	return (
		<>
			<label htmlFor="sort" className="font-bold block mb-1">
				Sort By
			</label>
			<select
				name="sort"
				value={currentSort}
				className="w-full border border-black p-1"
				onChange={(e) =>
					navigate({
                        to: ".",
                        //@ts-ignore
						search: (prev) => ({ ...prev, sort: e.target.value }),
					})
				}
			>
				<option value="">None</option>
				<option value="make">Make</option>
				<option value="startingBid">Starting Bid</option>
				<option value="mileage">Mileage</option>
				<option value="auctionDate">Auction Date</option>
			</select>
		</>
	);
}
