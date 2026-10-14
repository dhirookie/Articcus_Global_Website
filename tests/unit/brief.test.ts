import { describe, expect, it } from 'vitest';
import { parseBrief } from '@/features/brief/brief-storage';
import { suggestModel } from '@/features/brief/suggest-model';

describe('session brief restoration', () => {
  it.each([null, '{broken', 'null', '42', '"text"', '{"s":true}', '{"s":{}}'])(
    'tolerates malformed or missing storage: %s',
    (raw) => {
      expect(parseBrief(raw)).toEqual({ services: [], industry: '' });
    },
  );
  it('validates catalogue entries and deduplicates selections', () => {
    expect(
      parseBrief(
        '{"s":["website","invalid",null,"website","ai"],"i":"retail"}',
      ),
    ).toEqual({ services: ['website', 'ai'], industry: 'retail' });
  });
  it('preserves the other-industry option', () => {
    expect(parseBrief('{"s":[],"i":"other"}').industry).toBe('other');
  });
  it('discards unknown industries', () => {
    expect(parseBrief('{"s":[],"i":"not-real"}').industry).toBe('');
  });
});

describe('engagement recommendations', () => {
  it('does not invent a recommendation for an empty brief', () =>
    expect(suggestModel([])).toBeNull());
  it('suggests a fixed price for a small first project', () =>
    expect(suggestModel(['website'])?.name).toBe('Fixed price'));
  it('suggests discovery for a platform build', () =>
    expect(suggestModel(['webapp'])?.name).toBe(
      'Paid discovery, then fixed price',
    ));
  it('suggests a retainer for recurring maintenance', () =>
    expect(suggestModel(['maintenance'])?.name).toBe('Monthly retainer'));
  it('suggests a dedicated team for developers alone', () =>
    expect(suggestModel(['devs'])?.name).toBe('Dedicated team'));
  it('explains recurring work alongside a one-off build', () =>
    expect(suggestModel(['website', 'cloud', 'devs'])?.why).toContain(
      'Dedicated developers are billed monthly per person.',
    ));
});
