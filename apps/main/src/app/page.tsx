'use client';

import { Button } from '@workspace/ui';

export default function Index() {
  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <section style={{
        maxWidth: '600px',
        padding: '3rem',
        borderRadius: '24px',
        background: 'rgba(30, 41, 59, 0.5)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: '800',
          marginBottom: '1rem',
          background: 'linear-gradient(to right, #0ea5e9, #22d3ee)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.025em'
        }}>
          Orbitto Service
        </h1>
        
        <p style={{
          fontSize: '1.25rem',
          color: '#94a3b8',
          marginBottom: '2.5rem'
        }}>
          Next.js 15 + Nx Monorepo Architecture.<br />
          Built with premium aesthetics and shared UI components.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Button 
            onClick={() => console.log('Primary Action')}
            style={{
              backgroundColor: '#0ea5e9',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'transform 0.2s, background-color 0.2s',
            }}
          >
            Get Started
          </Button>
          
          <Button 
            onClick={() => console.log('Secondary Action')}
            style={{
              backgroundColor: 'transparent',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '0.75rem 1.5rem',
              borderRadius: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            Read Documentation
          </Button>
        </div>
      </section>
      
      <footer style={{ marginTop: '3rem', color: '#64748b', fontSize: '0.875rem' }}>
        &copy; 2026 Orbitto Service Engineering Challenge
      </footer>
    </main>
  );
}
