import { render, screen } from '@testing-library/react';
import { Hero } from '../landing_page/home/Hero';
import "@testing-library/jest-dom/extend-expect";

describe('Hero component', () => {
    test('renders Hero component with correct text', () => {
        render(<Hero />);
        const heroText = screen.getByText(/homeHero/i);
        expect(heroText).toBeInTheDocument();
        expect(heroText).toHaveAttribute('src', 'media/images/homeHero.png');
    });

    test('renders Hero component with correct button text', () => {
        render(<Hero />);
        const buttonText = screen.getByRole('button', { name: /Click Me/i });
        expect(buttonText).toBeInTheDocument();
    });
}
);