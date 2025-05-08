import { Link } from "@tanstack/react-router";

export default function Navbar() {
	return (
		<>
			<nav className="bg-black fixed w-full z-20 top-0 start-0 border-b border-gray-800">
				<div className="w-full flex items-center p-4">
					<Link to="/" className="text-2xl font-bold text-white pl-4">
						Car Auction
					</Link>
				</div>
			</nav>
		</>
	);
}
