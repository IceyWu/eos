import { useEffect, useRef, useState } from 'react';
import '@eosjs/components';

const source = 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=900&q=80';

export default function Basic() {
  const ref = useRef<HTMLElement>(null);
  const [status, setStatus] = useState('Loading image…');

  useEffect(() => {
    const element = ref.current;
    const onLoad = () => setStatus('Loaded');
    const onError = () => setStatus('Unable to load image');
    element?.addEventListener('imageLoad', onLoad);
    element?.addEventListener('imageError', onError);
    return () => {
      element?.removeEventListener('imageLoad', onLoad);
      element?.removeEventListener('imageError', onError);
    };
  }, []);

  return (
    <div style={{ display: 'grid', gap: 12, justifyItems: 'center' }}>
      <eos-image
        ref={ref}
        src={source}
        alt="Snowy mountain under a starry sky"
        loading="lazy"
        object-fit="cover"
        style={{ borderRadius: 12, height: 220, maxWidth: '100%', width: 520 }}
      />
      <small style={{ color: '#858391' }}>{status}</small>
    </div>
  );
}
