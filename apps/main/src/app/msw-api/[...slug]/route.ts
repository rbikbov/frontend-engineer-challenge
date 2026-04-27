import { NextResponse } from 'next/server';

/**
 * Этот catch-all роут принимает любые запросы к /msw-api/* 
 * и пробрасывает их в fetch. 
 * Так как на сервере запущен MSW (через instrumentation.ts), 
 * он перехватит этот fetch и вернет мок-ответ.
 */
async function handle(request: Request) {
  try {
    // Подготавливаем URL: убираем /msw-api из пути, чтобы он соответствовал хендлерам
    const url = new URL(request.url);
    const targetUrl = url.href.replace('/msw-api', '');
    
    // Пробрасываем запрос во внутренний fetch
    const response = await fetch(new Request(targetUrl, {
      method: request.method,
      headers: request.headers,
      body: request.method !== 'GET' && request.method !== 'HEAD' ? await request.blob() : undefined,
      credentials: 'include',
    }));
    
    // Читаем тело ответа, если оно есть
    let data = null;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      await response.text(); // Потребляем поток в любом случае
    }
    
    // Создаем ответ для браузера, сохраняя статус и заголовки (включая Set-Cookie)
    return new NextResponse(data ? JSON.stringify(data) : null, {
      status: response.status,
      headers: response.headers,
    });
  } catch (error) {
    console.error('[MSW Bridge Error]:', error);
    return NextResponse.json(
      { error: (error as Error).message || 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}

export const GET = handle;
export const POST = handle;
export const PUT = handle;
export const PATCH = handle;
export const DELETE = handle;
