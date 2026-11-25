import {describe,it,expect} from 'vitest';
import {render,screen} from '@testing-library/react';
import EmergencyRedirectDialog from '../EmergencyRedirectDialog';
describe('urgent help contact consistency',()=>{
 it('matches visible urgent and emergency numbers to their dial targets',()=>{
  render(<EmergencyRedirectDialog open category="septic_joint" onClose={()=>{}} />);
  expect(screen.getByRole('link',{name:/NHS 111 Urgent but not life-threatening/i})).toHaveAttribute('href','tel:111');
  expect(screen.getByRole('link',{name:/999 Life-threatening emergency/i})).toHaveAttribute('href','tel:999');
  expect(screen.getByRole('link',{name:/Samaritans 116 123/i})).toHaveAttribute('href','tel:116123');
  expect(screen.getByText(/Ask for an urgent GP appointment or get help from NHS 111 now/)).toBeInTheDocument();
 });
});
