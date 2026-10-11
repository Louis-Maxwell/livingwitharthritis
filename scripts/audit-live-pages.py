"""Read-only, six-worker audit of sitemap response HTML (not rendered DOM/CWV)."""
import concurrent.futures,json,re,subprocess,time,pathlib
site='https://livingwitharthritis.org.uk'
sitemap=subprocess.run(['curl','-fsS','--max-time','30',site+'/sitemap.xml'],capture_output=True,text=True,check=True).stdout
urls=re.findall(r'<loc>([^<]+)</loc>',sitemap)
def audit(url):
 try:
  r=subprocess.run(['curl','-sS','--max-time','20','--max-redirs','3','-L','-w','\nLWA_STATUS:%{http_code}',url],capture_output=True,text=True,timeout=25)
  status=re.search(r'LWA_STATUS:(\d+)\s*$',r.stdout);h=re.sub(r'\nLWA_STATUS:\d+\s*$','',r.stdout)
  canonical=next((re.search(r'href=["\']([^"\']+)',t).group(1) for t in re.findall(r'<link\b[^>]*>',h,re.I) if re.search(r'rel=["\']canonical["\']',t)),None)
  title=re.search(r'<title>(.*?)</title>',h,re.S|re.I)
  return {'url':url,'status':int(status.group(1)) if status else 0,'canonical':canonical,'title':title.group(1) if title else '', 'h1_count':len(re.findall(r'<h1\b',h,re.I)),'related_reading':'aria-label="Related reading"' in h,'noindex':bool(re.search(r'<meta\b[^>]*name=["\']robots["\'][^>]*content=["\'][^"\']*noindex',h,re.I)),'transport_error':r.stderr if r.returncode else ''}
 except Exception as e:return {'url':url,'status':0,'transport_error':str(e)}
rows=[]
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
 for row in pool.map(audit,urls):
  rows.append(row)
  if len(rows)%100==0:print('Audited',len(rows),'/',len(urls),flush=True)
issues=[r for r in rows if r['status']!=200 or r.get('canonical')!=r['url'] or r.get('noindex') or r.get('h1_count')!=1]
report={'ran_at':time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime()),'scope':'All live sitemap URLs; response HTML, not browser rendering or Core Web Vitals','pages_audited':len(rows),'issue_pages':len(issues),'related_reading_pages':sum(r.get('related_reading',False) for r in rows),'issues':issues,'pages':rows}
pathlib.Path('.preflight-reports').mkdir(exist_ok=True);pathlib.Path('.preflight-reports/live-page-audit.json').write_text(json.dumps(report,indent=2)+'\n');print({k:v for k,v in report.items() if k not in ['pages','issues']})
