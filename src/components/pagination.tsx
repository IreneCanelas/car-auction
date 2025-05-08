import { useNavigate } from "@tanstack/react-router";
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from "lucide-react";

export default function Pagination({
	page,
	size,
	carAmount,
}: { page: number; size: number; carAmount: number }) {
	const navigate = useNavigate();

	const isFirstPage = page === 1;
	const isLastPage = page >= carAmount / size;

	return (
		<>
			{!isFirstPage && (
				<>
					<button
						type="button"
						aria-label="first-page"
						onClick={() =>
							navigate({ to: ".", search: (prev) => ({ ...prev, page: 1 }) })
						}
					>
						<ChevronsLeft />
					</button>
					<button
						type="button"
						aria-label="previous-page"
						onClick={() =>
							navigate({
								to: ".",
								search: (prev) => ({ ...prev, page: page - 1 }),
							})
						}
					>
						<ChevronLeft />
					</button>
				</>
			)}
			<span className="font-semibold">Current Page: {page}</span>
			{!isLastPage && (
				<>
					<button
						type="button"
						aria-label="next-page"
						onClick={() =>
							navigate({
								to: ".",
								search: (prev) => ({ ...prev, page: page + 1 }),
							})
						}
					>
						<ChevronRight />
					</button>
					<button
						type="button"
						aria-label="last-page"
						onClick={() =>
							navigate({
								to: ".",
								search: (prev) => ({
									...prev,
									page: Math.ceil(carAmount / size),
								}),
							})
						}
					>
						<ChevronsRight />
					</button>
				</>
			)}
		</>
	);
}
