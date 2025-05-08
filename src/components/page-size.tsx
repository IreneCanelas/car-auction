import { useNavigate } from "@tanstack/react-router";

export default function PageSize({ size }: { size: number }) {
	const navigate = useNavigate();

	return (
		<div>
			<label htmlFor="size" className="font-bold block mb-1">
				Results per page
			</label>
			<select
				name="size"
				className="w-full border border-black p-1"
				onChange={(e) =>
					navigate({
						to: ".",
						search: (prev) => ({ ...prev, size: Number(e.target.value) }),
					})
				}
				value={size}
			>
				{[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((val) => (
					<option key={val} value={val}>
						{val}
					</option>
				))}
			</select>
		</div>
	);
}
