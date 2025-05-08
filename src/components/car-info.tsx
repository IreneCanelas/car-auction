export default function CarInfo({
	label,
	value,
}: { label: string; value: string | number }) {
	return (
		<div className="flex justify-between border-b pb-1">
			<span className="font-semibold text-gray-700">{label}:</span>
			<span className="text-gray-900 text-right">{value}</span>
		</div>
	);
}
