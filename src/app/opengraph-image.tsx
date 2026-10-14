import { ImageResponse } from 'next/og';

export const alt = 'Articcus — Websites, business software and automation';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        padding: '80px',
        background: '#EAF5FF',
        color: '#0B1E45',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '28px',
          marginBottom: '54px',
        }}
      >
        <span style={{ fontSize: 54, fontWeight: 700 }}>articcus</span>
        <span
          style={{
            width: 36,
            height: 36,
            borderTop: '9px solid #004AAD',
            borderRight: '9px solid #004AAD',
            transform: 'rotate(0deg)',
          }}
        />
        <span
          style={{
            width: 36,
            height: 36,
            borderTop: '9px solid #38B6FF',
            borderRight: '9px solid #38B6FF',
            marginTop: '-30px',
          }}
        />
      </div>
      <div
        style={{
          fontSize: 64,
          fontWeight: 700,
          lineHeight: 1.12,
          maxWidth: 1000,
        }}
      >
        Systems built around your business.
      </div>
      <div
        style={{
          display: 'flex',
          marginTop: '34px',
          color: '#465163',
          fontSize: 28,
        }}
      >
        Websites · Business software · Automation
      </div>
      <div
        style={{
          display: 'flex',
          marginTop: '48px',
          color: '#004AAD',
          fontSize: 24,
        }}
      >
        Colombo, Sri Lanka · articcus.com
      </div>
    </div>,
    size,
  );
}
