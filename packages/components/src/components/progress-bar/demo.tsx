import { useEffect, useRef, useState } from 'react';
import '@eosjs/components';

export default function Basic() {
  const ref = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const element = ref.current;
    const onClick = (event: Event) => {
      const index = (event as CustomEvent<{ index: number }>).detail.index;
      setCurrent(index);
    };
    element?.addEventListener('segment-click', onClick);
    return () => element?.removeEventListener('segment-click', onClick);
  }, []);

  return (
    <div style={{ display: 'grid', gap: 18, width: '100%' }}>
      <eos-progress-bar ref={ref} total="4" current={String(current)} variant="tiktok" />
      <div style={{ color: '#858391', textAlign: 'center' }}>
        Step {current + 1} of 4 · click a segment to navigate
      </div>
    </div>
  );
}
