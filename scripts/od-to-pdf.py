#!/usr/bin/env python3
"""
od-to-pdf — Open Design → PDF bridge.

Converts any OD HTML artifact into a print-quality PDF using WeasyPrint.
Detects whether the HTML already follows Kami's print design system
(parchment + ink-blue + @page rules) and, if not, injects print-optimized
CSS automatically.

Usage:
  python3 scripts/od-to-pdf.py input.html -o output.pdf
  python3 scripts/od-to-pdf.py input.html                    # auto-names output
  python3 scripts/od-to-pdf.py input.html --check-only       # just verify
  python3 scripts/od-to-pdf.py input.html --no-inject        # skip CSS injection

Dependencies:
  pip install weasyprint pypdf
"""

import argparse
import os
import re
import sys
import subprocess
from pathlib import Path

# ---------------------------------------------------------------------------
# CSS Templates
# ---------------------------------------------------------------------------

# Print-optimization CSS injected when the doc doesn't already have @page rules.
# Respects Kami tokens if present; provides sensible defaults otherwise.
PRINT_CSS = """
/* ── od-to-pdf injected print CSS ── */
@page {
  size: A4;
  margin: 20mm 22mm;
}
@page:first {
  @top-right { content: ""; }
  @bottom-center { content: ""; }
}

@media print {
  html, body {
    background: #ffffff !important;
    -weasy-print: true;
  }
  /* Hide screen-only UI elements */
  nav, .navbar, .sidebar, .banner, .toast,
  [role="navigation"], [aria-label="navigation"],
  .no-print, .screen-only, .print-hide {
    display: none !important;
  }
  /* Avoid page breaks inside important blocks */
  section, article, figure, table, blockquote,
  .card, .metric, .project-item, .quote, .code-block,
  .callout, .takeaway, .module, .module-note,
  .glance-grid, .pricing-card, pre {
    break-inside: avoid;
  }
  /* Headings shouldn't sit alone at page bottom */
  h1, h2, h3, h4, h5, h6 {
    break-after: avoid;
  }
  /* Widow/orphan protection */
  body { widows: 3; orphans: 3; }
  p    { widows: 2; orphans: 2; }
  /* Force font embedding */
  * { -weasy-font-load: embed; }
}
""".strip()

# Kami-specific print CSS (pre-blended backgrounds, warm parchment)
KAMI_PRINT_CSS = """
/* ── Kami parchment print CSS injected by od-to-pdf ── */
@page {
  size: A4;
  margin: 20mm 22mm;
  background: #f5f4ed;
}
@page:first {
  @top-right { content: ""; }
  @bottom-center { content: ""; }
}

@media print {
  html, body {
    background: #f5f4ed !important;
  }
  nav, .navbar, .sidebar, .banner, .toast,
  [role="navigation"], [aria-label="navigation"],
  .no-print, .screen-only, .print-hide {
    display: none !important;
  }
  .card, .metric, .project-item, .quote, .code-block,
  .callout, .takeaway, .module, .module-note,
  .glance-grid, .pricing-card, section, article,
  figure, table, blockquote, pre {
    break-inside: avoid;
  }
  h1, h2, h3, h4, h5, h6 { break-after: avoid; }
  body { widows: 3; orphans: 3; }
  p    { widows: 2; orphans: 2; }
  * { -weasy-font-load: embed; }
}
""".strip()

# ---------------------------------------------------------------------------
# Detection helpers
# ---------------------------------------------------------------------------

HAS_KAMI = re.compile(
    r'(kami|parchment|#f5f4ed|#1B365D|TsangerJinKai|ink-blue)',
    re.IGNORECASE,
)

HAS_PAGE_RULES = re.compile(r'@page\s*\{')


def is_kami_html(html: str) -> bool:
    """Detect if HTML uses Kami's design system."""
    return bool(HAS_KAMI.search(html))


def has_page_rules(html: str) -> bool:
    """Detect if HTML already has @page CSS rules."""
    return bool(HAS_PAGE_RULES.search(html))


def has_print_media(html: str) -> bool:
    """Detect if HTML already has @media print rules."""
    return '@media print' in html


# ---------------------------------------------------------------------------
# CSS injection
# ---------------------------------------------------------------------------

def inject_print_css(html: str, force_kami: bool = False) -> str:
    """
    Inject print-optimized CSS into HTML if needed.
    
    - If the doc already has @page rules, leave it alone.
    - If it's Kami-style without @page rules, inject Kami CSS.
    - Otherwise, inject generic print CSS.
    """
    if has_page_rules(html):
        return html  # Already has print layout

    css_to_inject = KAMI_PRINT_CSS if (force_kami or is_kami_html(html)) else PRINT_CSS

    # Inject before </head> or at end of <style> block
    if '</head>' in html:
        # Check if there's an existing <style> block
        style_match = re.search(r'</style>\s*</head>', html)
        if style_match:
            # Insert before </style></head>
            idx = style_match.start()
            return html[:idx] + f'\n{_indent(css_to_inject, "  ")}\n' + html[idx:]
        else:
            # Insert before </head>
            return html.replace('</head>', f'\n<style>\n{css_to_inject}\n</style>\n</head>', 1)
    
    # Fallback: prepend to body
    if '<body' in html:
        return html.replace('<body', f'<style>\n{css_to_inject}\n</style>\n<body', 1)
    
    return html


def _indent(text: str, prefix: str = "  ") -> str:
    """Indent each line of text with prefix."""
    return '\n'.join(prefix + line if line.strip() else line for line in text.split('\n'))


# ---------------------------------------------------------------------------
# WeasyPrint render
# ---------------------------------------------------------------------------

def html_to_pdf(html_path: str, pdf_path: str) -> dict:
    """
    Convert HTML to PDF using WeasyPrint.
    Returns dict with success, page_count, and error info.
    """
    from weasyprint import HTML
    
    result = {
        'success': False,
        'page_count': 0,
        'error': None,
        'pdf_path': pdf_path,
    }
    
    try:
        html_doc = HTML(filename=html_path)
        html_doc.write_pdf(pdf_path)
        result['success'] = True
    except Exception as e:
        result['error'] = str(e)
        return result
    
    # Count pages
    try:
        from pypdf import PdfReader
        reader = PdfReader(pdf_path)
        result['page_count'] = len(reader.pages)
    except Exception:
        pass
    
    return result


# ---------------------------------------------------------------------------
# Verification
# ---------------------------------------------------------------------------

def verify_pdf(pdf_path: str) -> dict:
    """Run post-render verification checks."""
    result = {
        'exists': False,
        'page_count': 0,
        'fonts_embedded': None,
        'valid': False,
    }
    
    if not os.path.exists(pdf_path):
        return result
    
    result['exists'] = True
    size = os.path.getsize(pdf_path)
    result['file_size'] = size
    
    # Page count
    try:
        from pypdf import PdfReader
        reader = PdfReader(pdf_path)
        result['page_count'] = len(reader.pages)
        result['valid'] = result['page_count'] > 0
    except Exception:
        pass
    
    # Font check (requires pdffonts)
    try:
        out = subprocess.check_output(
            ['pdffonts', pdf_path],
            stderr=subprocess.STDOUT,
            timeout=10,
        ).decode('utf-8', errors='replace')
        lines = [l.strip() for l in out.split('\n') if l.strip()]
        result['fonts_embedded'] = len(lines) > 2  # header + data rows
        result['fonts'] = lines
    except Exception:
        result['fonts_embedded'] = None
    
    return result


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(
        description='Open Design → PDF bridge. Convert OD HTML to print-quality PDF.',
    )
    parser.add_argument('input', help='Path to input HTML file')
    parser.add_argument('-o', '--output', help='Path to output PDF file (default: input name + .pdf)')
    parser.add_argument('--no-inject', action='store_true', help='Skip CSS injection (use as-is)')
    parser.add_argument(
        '--force-kami', action='store_true',
        help='Force Kami parchment CSS even if not detected',
    )
    parser.add_argument('--check-only', action='store_true', help='Only verify HTML/CSS, skip render')
    parser.add_argument('--verify', action='store_true', help='Run font/page verification after render')
    
    args = parser.parse_args()
    
    input_path = Path(args.input)
    if not input_path.exists():
        print(f'✗ Input not found: {args.input}', file=sys.stderr)
        sys.exit(1)
    
    # Read input
    html = input_path.read_text(encoding='utf-8')
    
    # Analysis
    is_kami = is_kami_html(html)
    has_page = has_page_rules(html)
    has_print = has_print_media(html)
    
    print(f'📄 Input: {args.input}')
    print(f'   Size: {len(html):,} bytes')
    print(f'   Kami design: {"✓" if is_kami else "—"}')
    print(f'   @page rules: {"✓" if has_page else "—"}')
    print(f'   @media print: {"✓" if has_print else "—"}')
    print()
    
    if args.check_only:
        if not has_page:
            print('⚠ No @page rules found. Run without --check-only to inject them.')
        if not has_print:
            print('⚠ No @media print rules found. Run without --check-only to inject them.')
        print('✓ Check complete (no render)')
        sys.exit(0)
    
    # Inject CSS if needed
    if args.no_inject:
        final_html = html
        print('→ CSS injection skipped (--no-inject)')
    elif has_page:
        final_html = html
        print('→ Already has @page rules, no injection needed')
    else:
        final_html = inject_print_css(html, force_kami=args.force_kami)
        
        if final_html != html:
            # Save injected version next to original
            injected_path = input_path.with_suffix('.print-ready.html')
            # Actually, save in same dir as the input
            injected_path = input_path.parent / f'{input_path.stem}.print-ready.html'
            final_html_short = 'print-ready' if len(str(injected_path)) > 100 else True
            
            # Write to the same directory
            Path(injected_path).write_text(final_html, encoding='utf-8')
            print(f'→ Print CSS injected → {injected_path.name}')
        else:
            print('→ No injection needed')
    
    # Determine output path
    if args.output:
        output_path = args.output
    else:
        output_path = str(input_path.with_suffix('.pdf'))
    
    # Render
    temp_html = args.input if args.no_inject or has_page else str(injected_path)
    
    print(f'\n🖨 Rendering PDF → {output_path}')
    result = html_to_pdf(temp_html, output_path)
    
    if not result['success']:
        print(f'✗ Render failed: {result["error"]}', file=sys.stderr)
        sys.exit(1)
    
    print(f'✓ PDF generated: {result["page_count"]} page(s), '
          f'{os.path.getsize(output_path):,} bytes')
    
    if args.verify:
        print('\n🔍 Verification:')
        v = verify_pdf(output_path)
        if v.get('fonts'):
            # Show just the unique font names
            font_names = set()
            for line in v['fonts'][2:]:  # Skip header lines
                parts = line.split()
                if parts:
                    font_names.add(parts[0])
            if font_names:
                print(f'   Fonts: {", ".join(sorted(font_names))}')
        print(f'   Pages: {v["page_count"]}')
        print(f'   Size:  {v.get("file_size", 0):,} bytes')
        
        if v['valid']:
            print('✓ PDF valid and ready')
        else:
            print('⚠ PDF may have issues (0 pages or missing)', file=sys.stderr)
    
    print(f'\n✅ Done: {output_path}')


if __name__ == '__main__':
    main()
