import { act, renderHook } from "@testing-library/react";
import { useTimer } from "./useTimer";

beforeEach(() => {
	jest.useFakeTimers();
});

afterEach(() => {
	jest.useRealTimers();
});

describe("useTimer", () => {
	it("initializes with the given time", () => {
		const { result } = renderHook(() => useTimer({ timeInterval: 5 }));
		expect(result.current.timeLeft).toBe(5);
	});

	it("counts down each second", () => {
		const { result } = renderHook(() => useTimer({ timeInterval: 3 }));

		act(() => {
			jest.advanceTimersByTime(1000);
		});

		expect(result.current.timeLeft).toBe(2);

		act(() => {
			jest.advanceTimersByTime(2000);
		});

		expect(result.current.timeLeft).toBe(0);
	});

	it("does not go below zero", () => {
		const { result } = renderHook(() => useTimer({ timeInterval: 1 }));

		act(() => {
			jest.advanceTimersByTime(5000);
		});

		expect(result.current.timeLeft).toBe(0);
	});

	it("clears interval on unmount", () => {
		const clearSpy = jest.spyOn(globalThis, "clearInterval");
		const { unmount } = renderHook(() => useTimer({ timeInterval: 3 }));

		unmount();

		expect(clearSpy).toHaveBeenCalled();
		clearSpy.mockRestore();
	});
});
