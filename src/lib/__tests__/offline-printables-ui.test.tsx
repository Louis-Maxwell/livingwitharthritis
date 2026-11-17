import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import InstallBanner from '@/components/pwa/InstallBanner';
vi.mock('@/lib/installPrompt',()=>({hasInstallPrompt:()=>false,isAppInstalled:()=>false,showInstallPrompt:vi.fn()}));
vi.mock('@/lib/offlinePrintables',()=>({saveBlankRecordsOffline:vi.fn().mockResolvedValue(undefined),removeOfflineBlankRecords:vi.fn().mockResolvedValue(undefined)}));

describe('opt-in offline/installation prompt',()=>{
 beforeEach(()=>vi.useFakeTimers());afterEach(()=>vi.useRealTimers());
 it('waits sixty seconds on an exercise guide, stays in page flow and can be dismissed',()=>{
  render(<MemoryRouter initialEntries={['/exercises/knee']}><InstallBanner /></MemoryRouter>);
  expect(screen.queryByRole('region',{name:'Save for another day'})).not.toBeInTheDocument();
  act(()=>vi.advanceTimersByTime(59999));expect(screen.queryByRole('button',{name:'Save blank sheets offline'})).not.toBeInTheDocument();
  act(()=>vi.advanceTimersByTime(1));const region=screen.getByRole('region',{name:'Save for another day'});expect(region.className).not.toMatch(/fixed|sticky/);
  expect(screen.getByRole('button',{name:'Dismiss'}).className).toContain('shrink-0');fireEvent.click(screen.getByRole('button',{name:'Dismiss'}));expect(screen.queryByRole('region',{name:'Save for another day'})).not.toBeInTheDocument();
 });
 it('does not appear on an unrelated clinical article',()=>{
  render(<MemoryRouter initialEntries={['/blog/some-guide']}><InstallBanner /></MemoryRouter>);act(()=>vi.advanceTimersByTime(60000));expect(screen.queryByRole('region')).not.toBeInTheDocument();
 });
 it('saves only after a click and reports the local-storage limits',async()=>{
  vi.useRealTimers();const {saveBlankRecordsOffline}=await import('@/lib/offlinePrintables');
  render(<MemoryRouter initialEntries={['/resources/symptom-flare-tracker']}><InstallBanner immediate /></MemoryRouter>);
  expect(saveBlankRecordsOffline).not.toHaveBeenCalled();fireEvent.click(screen.getByRole('button',{name:'Save blank sheets offline'}));
  expect(await screen.findByText(/Both blank sheets are saved/)).toBeInTheDocument();expect(saveBlankRecordsOffline).toHaveBeenCalledTimes(1);
  expect(screen.queryByRole('button',{name:'Add to home screen'})).not.toBeInTheDocument();
 });
});
