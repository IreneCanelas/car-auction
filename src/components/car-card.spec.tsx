import { render, screen, fireEvent } from '@testing-library/react';
import CarCard from './car-card';
import { CarService } from '@/services/car';
import { useRouter } from '@tanstack/react-router';
import { useTimer } from '@/hooks/useTimer';

jest.mock('@tanstack/react-router', () => ({
  useRouter: jest.fn(),
  Link: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock('@/hooks/useTimer.ts', () => ({
  useTimer: jest.fn(),
}));

jest.mock('@/services/car', () => ({
  CarService: {
    toggleFavourite: jest.fn(),
  },
}));

jest.mock('@/utils/dateTime', () => ({
  formatDuration: jest.fn(() => '1d 00h 00m 00s'),
}));

describe('CarCard', () => {
  const mockRouterInvalidate = jest.fn();

  const mockCar = {
    id: 1,
    make: "Toyota",
    model: "C-HR",
    engineSize: "1.8L",
    fuel: "diesel",
    year: 2022,
    mileage: 743,
    auctionDateTime: new Date("2024/04/15 09:00:00"),
    startingBid: 17000,
    favourite: true,
    details: {
      specification: {
        vehicleType: "Car",
        colour: "RED",
        fuel: "petrol",
        transmission: "Manual",
        numberOfDoors: 3,
        co2Emissions: "139 g/km",
        noxEmissions: 230,
        numberOfKeys: 2
      },
      ownership: {
        logBook: "Present",
        numberOfOwners: 8,
        dateOfRegistration: "2015/03/31 09:00:00"
      },
      equipment: [
        "Air Conditioning",
        "Tyre Inflation Kit",
        "Photocopy of V5 Present",
        "Navigation HDD",
        "17 Alloy Wheels",
        "Engine Mods/Upgrades",
        "Modifd/Added Body Parts"
      ]
    }
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      invalidate: mockRouterInvalidate,
    });

    (useTimer as jest.Mock).mockReturnValue({
      timeLeft: 86400, // 1 day in seconds
    });


    jest.clearAllMocks();
  });

  it('renders all car details correctly', () => {
    render(<CarCard data={mockCar} />);

    expect(screen.getByText('Toyota')).toBeInTheDocument();
    expect(screen.getByText('C-HR')).toBeInTheDocument();
    expect(screen.getByText('743 km')).toBeInTheDocument();
    expect(screen.getByText('17000 €')).toBeInTheDocument();
    expect(screen.getByText('1d 00h 00m 00s')).toBeInTheDocument();
    expect(screen.getByAltText('Toyota C-HR')).toBeInTheDocument();
  });

  it('calls toggleFavourite and router.invalidate on heart click', () => {
    render(<CarCard data={mockCar} />);

    const heartButton = screen.getByRole('button');

    fireEvent.click(heartButton);

    expect(CarService.toggleFavourite).toHaveBeenCalledWith(mockCar.id);
    expect(mockRouterInvalidate).toHaveBeenCalled();
  });

  it('renders filled heart icon if favourite is true', () => {
    render(<CarCard data={{ ...mockCar, favourite: true }} />);

    const heartIcon = screen.getByLabelText("favourite-button");
    expect(heartIcon).toHaveClass('fill-red-600');
  });

  it('renders outlined heart icon if favourite is false', () => {
    render(<CarCard data={{ ...mockCar, favourite: false }} />);

    const heartIcon = screen.getByLabelText("favourite-button");
    expect(heartIcon).toHaveClass('stroke-black');
  });
});
