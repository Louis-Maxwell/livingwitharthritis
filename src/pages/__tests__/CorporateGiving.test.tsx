import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import CorporateGiving from '../CorporateGiving';
import CorporatePartnerships from '../CorporatePartnerships';
import { submitContactInquiry } from '@/lib/backendSubmit';
vi.mock('@/components/Header', () => ({ default: () => <header /> }));
vi.mock('@/components/Footer', () => ({ default: () => <footer /> }));
vi.mock('@/lib/backendSubmit', () => ({ submitContactInquiry: vi.fn() }));
const renderPage = (alias = false) => render(<HelmetProvider><MemoryRouter>{alias ? <CorporatePartnerships /> : <CorporateGiving />}</MemoryRouter></HelmetProvider>);
const complete = () => {
  fireEvent.change(screen.getByLabelText('Your name *'), { target: { value: 'Test Visitor' } });
  fireEvent.change(screen.getByLabelText('Work email *'), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText('I am interested in *'), { target: { value: 'Team fundraising' } });
};
beforeEach(() => {
  vi.clearAllMocks();
  Element.prototype.scrollIntoView = vi.fn();
  vi.mocked(submitContactInquiry).mockResolvedValue({ ok: false, via: 'mailto', mailtoOpened: true, message: 'Review your draft' });
});
describe('Corporate giving visitor journey', () => {
  it('keeps real donation, guide, governance and privacy routes', () => {
    renderPage();
    expect(screen.getByRole('link', { name: 'Explore donation options' })).toHaveAttribute('href', '/donate');
    expect(screen.getByRole('link', { name: 'See the free guides' })).toHaveAttribute('href', '/guides');
    expect(screen.getByRole('link', { name: /our governance/ })).toHaveAttribute('href', '/governance');
    expect(screen.getByRole('link', { name: 'Privacy policy' })).toHaveAttribute('href', '/privacy');
    expect(screen.getByRole('link', { name: 'Discuss your idea' })).toHaveAttribute('href', '#partnership-form');
  });
  it('selects the exact contribution option and moves focus to the enquiry', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: 'Discuss employee matched giving' }));
    expect(screen.getByLabelText('I am interested in *')).toHaveValue('Employee matched giving');
    expect(screen.getByLabelText('Your name *')).toHaveFocus();
  });
  it('prepares the existing email-draft flow, retains fields and never confirms delivery', async () => {
    renderPage(); complete();
    fireEvent.change(screen.getByLabelText('Organisation'), { target: { value: 'Test Company' } });
    fireEvent.change(screen.getByLabelText(/Indicative budget/), { target: { value: 'To discuss' } });
    fireEvent.change(screen.getByLabelText('Your idea'), { target: { value: 'A sponsored team walk in spring.' } });
    fireEvent.click(screen.getByRole('button', { name: 'Prepare enquiry email' }));
    expect(await screen.findByText(/Your email app should open with a draft/)).toBeInTheDocument();
    expect(submitContactInquiry).toHaveBeenCalledWith({ name: 'Test Visitor', email: 'test@example.com', subject: 'Corporate giving enquiry', formId: 'corporate-giving', message: 'Organisation: Test Company\nInterest: Team fundraising\nIndicative budget: To discuss\nA sponsored team walk in spring.' });
    expect(screen.getByLabelText('Your name *')).toHaveValue('Test Visitor');
    expect(screen.getByRole('status')).toHaveTextContent('Nothing has been sent by this website');
  });
  it('preserves entered text and offers an email fallback on failure', async () => {
    vi.mocked(submitContactInquiry).mockRejectedValueOnce(new Error('draft failed'));
    renderPage(); complete();
    fireEvent.click(screen.getByRole('button', { name: 'Prepare enquiry email' }));
    expect(await screen.findByText(/draft could not be opened/)).toBeInTheDocument();
    expect(screen.getByLabelText('Your name *')).toHaveValue('Test Visitor');
  });
  it('bounds message and metadata below the existing helper limit', () => {
    renderPage();
    expect(screen.getByLabelText('Your idea')).toHaveAttribute('maxlength', '3500');
    expect(screen.getByLabelText('Organisation')).toHaveAttribute('maxlength', '200');
    expect(screen.getByLabelText(/Indicative budget/)).toHaveAttribute('maxlength', '100');
  });
  it('preserves corporate, employee and matched giving distinctions without claiming a live payroll scheme', () => {
    renderPage();
    for (const name of ['Corporate Giving', 'Employee Giving', 'Matched Giving', 'Charity of the Year', 'Community investment and ESG', 'Fund a project or programme', 'Payroll Giving', 'Monthly employee giving']) {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument();
    }
    expect(screen.getByText(/£3, £5 or £10/)).toBeInTheDocument();
    expect(screen.getByText(/before Income Tax, but after National Insurance/)).toBeInTheDocument();
    expect(screen.getByText(/Payroll Giving availability.*not confirmed/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /GOV.UK Payroll Giving/ })).toHaveAttribute('href', 'https://www.gov.uk/payroll-giving');
    expect(screen.getByText(/£10 employee gift plus £10.*£20/)).toBeInTheDocument();
  });
  it('selects payroll and monthly giving as enquiries, never payment commitments', () => {
    renderPage();
    fireEvent.click(screen.getByRole('button', { name: 'Discuss payroll giving' }));
    expect(screen.getByLabelText('I am interested in *')).toHaveValue('Payroll Giving');
    fireEvent.click(screen.getByRole('button', { name: 'Discuss monthly employee giving' }));
    expect(screen.getByLabelText('I am interested in *')).toHaveValue('Monthly employee giving (£3–£10)');
    expect(submitContactInquiry).not.toHaveBeenCalled();
  });
  it('keeps partnerships focused and links to the full giving page without inert perks', () => {
    renderPage(true);
    const main = screen.getByRole('main');
    expect(within(main).getByRole('heading', { level: 1 })).toHaveTextContent('Company donation or sponsorship');
    expect(within(main).getAllByRole('button', { name: /^Discuss / })).toHaveLength(4);
    expect(within(main).getByRole('link', { name: 'Corporate Giving' })).toHaveAttribute('href', '/corporate-giving');
    expect(within(main).queryByRole('heading', { name: 'Matched Giving' })).not.toBeInTheDocument();
    expect(within(main).getByLabelText('Your name *')).toBeInTheDocument();
    expect(main.textContent).not.toMatch(/100%.*tax|25% discount|2M UK|70% of consumers|X guides|Most Popular|within 2 business days|Lifetime naming|advisory board|clinically reviewed/i);
  });
});
