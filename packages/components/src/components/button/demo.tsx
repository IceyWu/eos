import { useEffect, useRef, useState } from 'react';
import '@eosjs/components';

export default function Basic() {
  const ref = useRef<HTMLElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const element = ref.current;
    const onClick = () => setCount((value) => value + 1);
    element?.addEventListener('e-click', onClick);
    return () => element?.removeEventListener('e-click', onClick);
  }, []);

  return (
    <div style={{ display: 'grid', gap: 16, justifyItems: 'center' }}>
      <eos-button ref={ref}>Try the button</eos-button>
      <small style={{ color: '#858391' }}>Activated {count} times</small>
    </div>
  );
}
