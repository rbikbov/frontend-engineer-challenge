import { cn } from '@workspace/ui/utils/cn';

const SESSION_FACTS = [
  {
    term: 'Access token',
    description:
      'Short-lived HttpOnly cookie. The browser attaches it to every GraphQL request.',
  },
  {
    term: 'Refresh token',
    description:
      'HttpOnly cookie used only by the BFF route that issues a new token pair.',
  },
  {
    term: 'Client JavaScript',
    description:
      'Never sees either token. It only reads a flag cookie that says a session exists.',
  },
];

export function SessionInfo({ className }: { className?: string }) {
  return (
    <section
      aria-labelledby="session-info-title"
      className={cn(
        'bg-surface border-stroke rounded-button-lg border p-6',
        className,
      )}
    >
      <h2 id="session-info-title" className="text-h3 mb-6 font-bold">
        Session
      </h2>

      <dl className="mb-6 space-y-5">
        {SESSION_FACTS.map(({ term, description }) => (
          <div key={term}>
            <dt className="text-caption text-foreground-secondary mb-2">
              {term}
            </dt>
            <dd className="text-large">{description}</dd>
          </div>
        ))}
      </dl>

      <p className="border-stroke text-foreground-secondary text-large border-t pt-6">
        Try it: wait for the access token to expire and press{' '}
        <span className="text-foreground">Refresh profile</span>. The request
        comes back unauthorized, the client calls the refresh route once and
        retries it, so you stay signed in.
      </p>
    </section>
  );
}
