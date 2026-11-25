import {describe,it,expect,vi} from 'vitest';
import {render,screen,fireEvent} from '@testing-library/react';
import {FeedbackButtons} from '../FeedbackButtons';
describe('local chat helpfulness markers',()=>{
 it('states the local-only scope, uses pressed buttons and never offers an unsent comment form',()=>{
  const fetch=vi.spyOn(globalThis,'fetch');
  render(<FeedbackButtons assistantMessage="An educational answer" />);
  expect(screen.getByText(/Not sent to the charity/)).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button',{name:'Not helpful'}));
  expect(screen.getByRole('button',{name:'Not helpful'})).toHaveAttribute('aria-pressed','true');
  expect(screen.getByRole('status')).toHaveTextContent('Marked not helpful for this chat.');
  expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  expect(screen.queryByRole('button',{name:'Send feedback'})).not.toBeInTheDocument();
  expect(fetch).not.toHaveBeenCalled();
  fetch.mockRestore();
 });
});
