import { render, fireEvent, waitFor } from '@testing-library/react';
import { HomeButton } from './HomeButtom';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

const mockedNavigator = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedNavigator,
}));

describe('HomeButton', () => {
  it('should navigate to home page when clicked', async () => {
    const { getByRole } = render(<BrowserRouter><HomeButton /></BrowserRouter>);
    act(() => {
      const homeBtn = getByRole('home-btn');
      expect(homeBtn).toBeInTheDocument();
      fireEvent.click(homeBtn);
    });

    await waitFor(() => {
      expect(mockedNavigator).toHaveBeenCalledWith('/');
    });
  });
});
