import { NextRequest, NextResponse } from 'next/server';

const API_BASE = process.env.API_INTERNAL_URL || 'http://127.0.0.1:4000/backend';

async function forwardRequest(request: NextRequest, method: string) {
  const { pathname, search } = request.nextUrl;
  const targetPath = pathname.replace(/^\/api\/backend/, '');
  const url = `${API_BASE}${targetPath}${search}`;

  try {
    const headers: Record<string, string> = {};
    const cookie = request.headers.get('cookie');
    const csrfToken = request.headers.get('x-csrf-token');
    const contentType = request.headers.get('content-type');

    if (cookie) headers['cookie'] = cookie;
    if (csrfToken) headers['x-csrf-token'] = csrfToken;
    if (contentType) headers['content-type'] = contentType;

    let body: BodyInit | undefined = undefined;
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      const arrayBuffer = await request.arrayBuffer();
      if (arrayBuffer.byteLength > 0) {
        body = Buffer.from(arrayBuffer);
      }
    }

    const res = await fetch(url, {
      method,
      headers,
      body,
      cache: 'no-store',
    });

    const resContentType = res.headers.get('content-type') || '';
    let responseData: any;
    if (resContentType.includes('application/json')) {
      responseData = await res.json().catch(() => ({}));
    } else {
      const text = await res.text().catch(() => '');
      responseData = { text };
    }

    const response = NextResponse.json(responseData, { status: res.status });

    // Forward set-cookie header (preserving session/refresh tokens)
    const setCookie = res.headers.get('set-cookie');
    if (setCookie) {
      response.headers.set('set-cookie', setCookie);
    }

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Backend gateway unreachable', details: error?.message || 'Connection refused' },
      { status: 502 }
    );
  }
}

export async function GET(request: NextRequest) {
  return forwardRequest(request, 'GET');
}

export async function POST(request: NextRequest) {
  return forwardRequest(request, 'POST');
}

export async function PUT(request: NextRequest) {
  return forwardRequest(request, 'PUT');
}

export async function PATCH(request: NextRequest) {
  return forwardRequest(request, 'PATCH');
}

export async function DELETE(request: NextRequest) {
  return forwardRequest(request, 'DELETE');
}
