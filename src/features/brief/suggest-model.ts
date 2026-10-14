import { getService, type GroupId, type ServiceId } from '@/data/catalogue';

export function suggestModel(
  ids: readonly ServiceId[],
): { name: string; why: string } | null {
  if (!ids.length) return null;
  const by = (group: GroupId) => ids.filter((id) => getService(id).g === group);
  const build = by('build'),
    start = by('start'),
    run = by('run');
  let name: string, why: string;
  if (!build.length && !start.length) {
    if (run.length === 1 && run[0] === 'devs') {
      name = 'Dedicated team';
      why =
        'Our developers join your team, billed monthly per person, with a three-month minimum.';
    } else {
      name = 'Monthly retainer';
      why =
        'Billed monthly or yearly in advance, with what is included agreed up front.';
    }
  } else if (
    build.some((id) => ['webapp', 'mobile', 'erp', 'ai'].includes(id)) ||
    build.length >= 3
  ) {
    name = 'Paid discovery, then fixed price';
    why =
      'A short scoping phase pins down exactly what to build. Its fee is deducted from the build if you go ahead.';
  } else {
    name = 'Fixed price';
    why =
      'The scope is clear enough to agree one price, paid 40% to start, 30% mid-project and 30% on delivery.';
  }
  const ongoing = run
    .filter((id) => id !== 'devs')
    .map((id) => getService(id).name.toLowerCase());
  if (ongoing.length && (build.length || start.length))
    why += ` Ongoing ${ongoing.join(', ')} would be a monthly retainer.`;
  if (run.includes('devs') && (build.length || start.length || run.length > 1))
    why += ' Dedicated developers are billed monthly per person.';
  return { name, why };
}
