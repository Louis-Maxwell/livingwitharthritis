#!/usr/bin/env python3
"""Compare two unfiltered GSC Pages CSV exports for equal-length date windows.

Usage: python scripts/compare-gsc-pages.py before.csv after.csv \
  --before 2026-09-19 2026-10-16 --after 2026-10-17 2026-11-13
Use identical property, search type, country, device and appearance filters.
Missing rows are unavailable, not assumed to have zero traffic. Output is CSV.
"""
import argparse
import csv
import sys
from datetime import date
from decimal import Decimal


def load(path):
    with open(path, encoding="utf-8-sig", newline="") as source:
        reader = csv.DictReader(source)
        fields = reader.fieldnames or []
        page = next((x for x in ("Top pages", "Page", "Pages") if x in fields), None)
        if not page or not {"Clicks", "Impressions"}.issubset(fields):
            raise ValueError("Expected GSC Pages CSV with Top pages/Page/Pages, Clicks and Impressions columns")
        rows = {}
        for row in reader:
            url = row[page].strip()
            if url in rows:
                raise ValueError("Duplicate page row: " + url)
            clicks, impressions = (int(row[k].replace(",", "")) for k in ("Clicks", "Impressions"))
            if min(clicks, impressions) < 0 or clicks > impressions:
                raise ValueError("Invalid clicks/impressions: " + url)
            rows[url] = (clicks, impressions)
        return rows


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("before_csv")
    parser.add_argument("after_csv")
    parser.add_argument("--before", nargs=2, required=True, type=date.fromisoformat)
    parser.add_argument("--after", nargs=2, required=True, type=date.fromisoformat)
    args = parser.parse_args()
    a, b = args.before, args.after
    if a[1] < a[0] or b[1] < b[0] or a[1] - a[0] != b[1] - b[0]:
        parser.error("Windows must be valid and equal in length")
    if b[0] <= a[1]:
        parser.error("Use chronological, non-overlapping windows")
    try:
        before, after = load(args.before_csv), load(args.after_csv)
    except (ValueError, OSError) as error:
        parser.error(str(error))
    print("Compare identical GSC filters; changes do not prove causation. Missing rows are unavailable.", file=sys.stderr)
    writer = csv.writer(sys.stdout)
    writer.writerow(["page", "before_clicks", "after_clicks", "click_change", "before_impressions", "after_impressions", "before_ctr_percent", "after_ctr_percent", "ctr_change_percentage_points", "status"])
    def ctr(row):
        return Decimal(row[0]) * 100 / row[1] if row[1] else None
    def display(value):
        return "" if value is None else f"{value:.2f}"
    for url in sorted(before.keys() | after.keys()):
        old, new = before.get(url), after.get(url)
        oc, nc = ctr(old) if old else None, ctr(new) if new else None
        writer.writerow([url, old[0] if old else "", new[0] if new else "", new[0]-old[0] if old and new else "", old[1] if old else "", new[1] if new else "", display(oc), display(nc), display(nc-oc if nc is not None and oc is not None else None), "comparable" if old and new else "missing row: unavailable"])


if __name__ == "__main__":
    main()
