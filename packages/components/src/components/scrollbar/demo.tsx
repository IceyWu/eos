import { useEffect, useRef } from 'react';
import '@eosjs/components';

export default function Basic() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollbarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const scrollbar = scrollbarRef.current as HTMLElement & { attach?: (element: HTMLElement) => void };
    if (containerRef.current && scrollbar?.attach) scrollbar.attach(containerRef.current);
    return () => {
      const element = scrollbarRef.current as HTMLElement & { detach?: () => void };
      element?.detach?.();
    };
  }, []);

  return (
    <div style={{ display: 'grid', gap: 10, width: '100%' }}>
      <div ref={containerRef} style={{ border: '1px solid rgba(255,255,255,.12)', borderRadius: 10, height: 180, overflow: 'auto', padding: 18 }}>
        <div style={{ display: 'grid', gap: 12, minWidth: 720 }}>
          {Array.from({ length: 7 }, (_, index) => (
            <div key={index} style={{ background: index % 2 ? 'rgba(255,255,255,.06)' : 'rgba(255,255,255,.1)', borderRadius: 8, padding: 14 }}>
              Scrollable content / {String(index + 1).padStart(2, '0')}
            </div>
          ))}
        </div>
      </div>
      <eos-scrollbar ref={scrollbarRef} direction="horizontal" thumb-size="6" style={{ height: 6 }} />
    </div>
  );
}
