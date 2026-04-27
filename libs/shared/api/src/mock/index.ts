export * from './handlers';
export * from './mock-auth.api';
export * from './db';

export async function initMocks() {
  if (typeof window === 'undefined') {
    const { setupServer } = await import('msw/node');
    const { handlers } = await import('./handlers');
    const server = setupServer(...handlers);
    server.listen({ onUnhandledRequest: 'bypass' });
    console.log('[MSW] Node.js mock server started', server.listHandlers().forEach((h) => console.log(h)));
  } else {
    const { setupWorker } = await import('msw/browser');
    const { handlers } = await import('./handlers');
    const worker = setupWorker(...handlers);
    await worker.start({ onUnhandledRequest: 'bypass' });
    console.log('[MSW] Browser mock worker started');
  }
}
