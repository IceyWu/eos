type TextResponseOptions = {
  contentType: string;
  locale: string;
  title: string;
};

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (character) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
})[character]!);

export function textFileResponse(
  request: Request,
  content: string,
  { contentType, locale, title }: TextResponseOptions,
) {
  const headers = {
    'Cache-Control': 'public, max-age=300',
    Vary: 'Accept',
  };

  const wantsBrowserView = new URL(request.url).searchParams.get('view') === 'browser';
  if (wantsBrowserView || request.headers.get('accept')?.includes('text/html')) {
    return new Response(
      `<!doctype html><html lang="${escapeHtml(locale)}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="color-scheme" content="light dark"><title>${escapeHtml(title)}</title><style>body{box-sizing:border-box;max-width:92ch;margin:0 auto;padding:24px;color:CanvasText;background:Canvas;font:14px/1.7 ui-monospace,SFMono-Regular,Consolas,monospace}pre{margin:0;white-space:pre-wrap;overflow-wrap:anywhere;font:inherit;color:inherit}@media(max-width:640px){body{padding:16px}}</style></head><body><main><pre>${escapeHtml(content)}</pre></main></body></html>`,
      { headers: { ...headers, 'Cache-Control': 'no-store', 'Content-Type': 'text/html; charset=utf-8' } },
    );
  }

  return new Response(content, {
    headers: { ...headers, 'Content-Type': contentType },
  });
}
