import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CaudaEquinaQuestions from '../CaudaEquinaQuestions';
describe('Cauda equina education safety', () => {
  it('shows emergency action before any answers and never offers a safe score', () => {
    render(<CaudaEquinaQuestions />);
    expect(screen.getByText(/Do not wait to answer/)).toBeInTheDocument();
    screen.getAllByLabelText('No').forEach(radio => fireEvent.click(radio));
    expect(screen.getByRole('status')).toHaveTextContent('does not exclude');
    expect(screen.getByRole('status')).toHaveTextContent('There is no safe score');
  });
  it('escalates uncertainty as well as a positive symptom and clears answers', () => {
    render(<CaudaEquinaQuestions />);
    fireEvent.click(screen.getAllByLabelText('Not sure')[0]);
    expect(screen.getByRole('status')).toHaveTextContent('call 999 or go to A&E now');
    fireEvent.click(screen.getByRole('button', {name: 'Clear answers'}));
    expect(screen.getAllByRole('radio').every(r => !(r as HTMLInputElement).checked)).toBe(true);
    fireEvent.click(screen.getAllByLabelText('Yes')[1]);
    expect(screen.getByRole('status')).toHaveTextContent('urgent medical assessment');
  });
});
