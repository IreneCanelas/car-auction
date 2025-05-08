import { useEffect, useState } from "react";

export const useTimer = ({ timeInterval }: { timeInterval: number }) => {
	const [timeLeft, setTimeLeft] = useState(timeInterval);
	useEffect(() => {
		const intervalId = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev <= 1) {
					clearInterval(intervalId);
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);

	return { timeLeft };
};
