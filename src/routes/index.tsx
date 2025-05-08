import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return (
		<div className="pt-20">
			<div className="text-center">
				<h1> Welcome to car-auction!</h1>
				<br />
				<Link className="underline" to="/cars">
					Explore available cars
				</Link>
			</div>
		</div>
	);
}
