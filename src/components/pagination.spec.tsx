import { useNavigate } from "@tanstack/react-router";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pagination from "./pagination";

jest.mock("@tanstack/react-router", () => ({
  useNavigate: jest.fn(),
}));

describe("Pagination", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    mockNavigate.mockClear();
  });

  it("renders only next buttons when on first page", async () => {
    render(<Pagination page={1} size={10} carAmount={100} />);
    
    expect(screen.getByText(/Current Page: 1/i)).toBeInTheDocument();
    expect(screen.queryByLabelText("first-page")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("previous-page")).not.toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });

  it("renders only previous buttons when on last page", async () => {
    render(<Pagination page={10} size={10} carAmount={100} />);
    
    expect(screen.getByText(/Current Page: 10/i)).toBeInTheDocument();
    expect(screen.queryByLabelText("last-page")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("next-page")).not.toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });

  it("renders all buttons ", async () => {
    render(<Pagination page={5} size={10} carAmount={100} />);
    
    expect(screen.getByText(/Current Page: 5/i)).toBeInTheDocument();
    expect(screen.queryByLabelText("first-page")).toBeInTheDocument();
    expect(screen.queryByLabelText("previous-page")).toBeInTheDocument();
    expect(screen.queryByLabelText("last-page")).toBeInTheDocument();
    expect(screen.queryByLabelText("next-page")).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(4);
  });

  it("calculates correct pages", async () => {
    render(<Pagination page={1} size={10} carAmount={75} />);
    const firstPageButton = screen.getByLabelText("last-page");
    await userEvent.click(firstPageButton);
    expect(mockNavigate).toHaveBeenCalledWith({
        to: ".",
        search: expect.any(Function),
      });
      const callArgs = mockNavigate.mock.calls[0][0];
    const newSearch = callArgs.search({ page: 1 });
    expect(newSearch.page).toBe(8);
  })

  it("calls navigate to page 1 on first page button", async () => {
    render(<Pagination page={3} size={10} carAmount={100} />);
    const firstPageButton = screen.getByLabelText("first-page");
    await userEvent.click(firstPageButton);
    expect(mockNavigate).toHaveBeenCalledWith({
      to: ".",
      search: expect.any(Function),
    });
    const callArgs = mockNavigate.mock.calls[0][0];
    const newSearch = callArgs.search({ page: 2 });

    expect(newSearch.page).toBe(1);
  });

  it("calls navigate to next page on right click", async () => {
    render(<Pagination page={3} size={10} carAmount={100} />);
    const buttons = screen.getAllByRole("button");
    const rightArrow = buttons[2];
    await userEvent.click(rightArrow);
    expect(mockNavigate).toHaveBeenCalledWith({
      to: ".",
      search: expect.any(Function),
    });
  });
});
