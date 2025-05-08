export default function Detail({
	label,
	value,
}: { label: string; value: string | number }) {
	return (
		<div className="flex justify-between">
			<span className="font-bold">{label}:</span>
			<span className="text-right">{value}</span>
		</div>
	);
}
