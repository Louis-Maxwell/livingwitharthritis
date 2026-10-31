/** Searchable text export; print-to-PDF retains the page's diagrams and layout. */
export async function saveTextPdf(title: string, text: string, filename: string) {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF();
  let y = 18;
  const clean = (s: string) => s.replace(/[\u2018\u2019]/g, "'").replace(/[\u201c\u201d]/g, '"').replace(/[\u2013\u2014]/g, '-').replace(/\u2022/g, '-');
  const write = (value: string, size: number) => {
    doc.setFontSize(size);
    for (const line of doc.splitTextToSize(clean(value), 180) as string[]) {
      if (y > 276) { doc.addPage(); y = 18; }
      doc.text(line, 15, y); y += size === 16 ? 8 : 5;
    }
    y += 4;
  };
  write(title, 16);
  const htmlUrl = window.location.origin + window.location.pathname;
  doc.setFontSize(10);
  doc.textWithLink('Accessible HTML version: ' + htmlUrl, 15, y, { url: htmlUrl });
  y += 9;
  write('Educational information only, not a diagnosis or personal treatment plan. For emergencies call 999. Text export; use Print / Save as PDF for diagrams and page layout.', 10);
  text.split(/\n+/).filter(Boolean).forEach(p => write(p, 11));
  for (let i = 1; i <= doc.getNumberOfPages(); i++) {
    doc.setPage(i); doc.setFontSize(8);
    doc.text(`Living With Arthritis - ${i} / ${doc.getNumberOfPages()}`, 15, 290);
  }
  doc.save(filename);
  const { trackFileDownload } = await import('@/lib/ga-events');
  trackFileDownload({ file_name: filename, file_extension: 'pdf', file_url: htmlUrl, source: 'generated_pdf' });
}

export async function downloadUrlDirectory() {
  const response = await fetch('/sitemap.xml');
  if (!response.ok) throw new Error('The URL directory is unavailable. Please try again.');
  const xml = new DOMParser().parseFromString(await response.text(), 'application/xml');
  if (xml.querySelector('parsererror')) throw new Error('The URL directory could not be read.');
  const urls = Array.from(xml.querySelectorAll('url > loc')).map(n => n.textContent?.trim() ?? '').filter(url => url.startsWith('https://livingwitharthritis.org.uk/'));
  if (!urls.length) throw new Error('No public page URLs were found.');
  await saveTextPdf('Public website URL directory', `Generated ${new Date().toLocaleDateString('en-GB')}\n${urls.length} public URLs from the sitemap. Open each page to download or print its content.\n` + urls.join('\n'), 'living-with-arthritis-public-urls.pdf');
}
