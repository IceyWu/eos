import '@eosjs/components';

export default function Basic() {
  return (
    <eos-carousel autoplay loop interval={3200} style={{ maxWidth: 560, width: '100%' }}>
      <div style={{ alignItems: 'center', background: 'linear-gradient(135deg,#272442,#17161e)', borderRadius: 12, color: '#f7f5f1', display: 'flex', height: 180, justifyContent: 'center', letterSpacing: '.08em' }}>
        SLIDE / 01
      </div>
      <div style={{ alignItems: 'center', background: 'linear-gradient(135deg,#3a2935,#17161e)', borderRadius: 12, color: '#f7f5f1', display: 'flex', height: 180, justifyContent: 'center', letterSpacing: '.08em' }}>
        SLIDE / 02
      </div>
    </eos-carousel>
  );
}
