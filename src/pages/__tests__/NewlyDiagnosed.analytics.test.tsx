import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import NewlyDiagnosed from '../guides/NewlyDiagnosed';

beforeEach(() => {
  localStorage.clear(); window.gtag = vi.fn();
  vi.stubGlobal('ResizeObserver', class { observe() {} unobserve() {} disconnect() {} });
  vi.spyOn(window, 'print').mockImplementation(() => {});
});
afterEach(() => { localStorage.clear(); delete window.gtag; vi.restoreAllMocks(); vi.unstubAllGlobals(); });
const draw = () => render(<HelmetProvider><MemoryRouter><NewlyDiagnosed /></MemoryRouter></HelmetProvider>);
const print = () => fireEvent.click(screen.getByRole('button', { name: 'Print this guide' }));

describe('newly diagnosed printing remains useful without analytics', () => {
  it('prints without sending when consent is absent', () => {
    draw(); print(); expect(window.print).toHaveBeenCalledTimes(1); expect(window.gtag).not.toHaveBeenCalled();
  });
  it('rechecks withdrawal while keeping printing available', () => {
    draw(); localStorage.setItem('lwa_cv3', JSON.stringify({ a: true })); print();
    expect(vi.mocked(window.gtag!).mock.calls.filter(call => call[1] === 'print_newly_diagnosed')).toHaveLength(1);
    localStorage.setItem('lwa_cv3', JSON.stringify({ a: false })); print();
    expect(vi.mocked(window.gtag!).mock.calls.filter(call => call[1] === 'print_newly_diagnosed')).toHaveLength(1);
    expect(window.print).toHaveBeenCalledTimes(2);
  });
  it('still prints if the optional sender throws', () => {
    draw(); localStorage.setItem('lwa_cv3', JSON.stringify({ a: true }));
    window.gtag = vi.fn(() => { throw new Error('Blocked'); });
    expect(print).not.toThrow(); expect(window.print).toHaveBeenCalledTimes(1);
  });
});
