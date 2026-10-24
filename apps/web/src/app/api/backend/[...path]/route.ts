import { NextRequest, NextResponse } from 'next/server';

const API_BASE = 'http://127.0.0.1:4000/api';

export async function GET(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const targetPath = pathname.replace(/^\/api\/backend/, '');
  const url = `${API_BASE}${targetPath}${search}`;

  try {
    const res = await fetch(url, {
      headers: {
        cookie: request.headers.get('cookie') || '',
        'x-csrf-token': request.headers.get('x-csrf-token') || '',
        'content-type': 'application/json',
      },
    });

    const data = await res.json().catch(() => ({}));
    const response = NextResponse.json(data, { status: res.status });

    const setCookie = res.headers.get('set-cookie');
    if (setCookie) {
      response.headers.set('set-cookie', setCookie);
    }

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Backend unreachable' }, { status: 502 });
  }
}

export async function POST(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const targetPath = pathname.replace(/^\/api\/backend/, '');
  const url = `${API_BASE}${targetPath}${search}`;

  try {
    const body = await request.text();
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        cookie: request.headers.get('cookie') || '',
        'x-csrf-token': request.headers.get('x-csrf-token') || '',
        'content-type': request.headers.get('content-type') || 'application/json',
      },
      body: body || undefined,
    });

    const data = await res.json().catch(() => ({}));
    const response = NextResponse.json(data, { status: res.status });

    const setCookie = res.headers.get('set-cookie');
    if (setCookie) {
      response.headers.set('set-cookie', setCookie);
    }

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Backend unreachable' }, { status: 502 });
  }
}

export async function PUT(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const targetPath = pathname.replace(/^\/api\/backend/, '');
  const url = `${API_BASE}${targetPath}${search}`;

  try {
    const body = await request.text();
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        cookie: request.headers.get('cookie') || '',
        'x-csrf-token': request.headers.get('x-csrf-token') || '',
        'content-type': request.headers.get('content-type') || 'application/json',
      },
      body: body || undefined,
    });

    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json({ error: 'Backend unreachable' }, { status: 502 });
  }
}

export async function DELETE(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const targetPath = pathname.replace(/^\/api\/backend/, '');
  const url = `${API_BASE}${targetPath}${search}`;

  try {
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        cookie: request.headers.get('cookie') || '',
        'x-csrf-token': request.headers.get('x-csrf-token') || '',
      },
    });

    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json({ error: 'Backend unreachable' }, { status: 502 });
  }
}
