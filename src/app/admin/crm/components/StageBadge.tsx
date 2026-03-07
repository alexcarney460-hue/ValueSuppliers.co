'use client';

const stageColors: Record<string, { bg: string; text: string }> = {
  prospecting:   { bg: 'bg-blue-500/20',   text: 'text-blue-400' },
  qualification: { bg: 'bg-purple-500/20',  text: 'text-purple-400' },
  proposal:      { bg: 'bg-amber-500/20',   text: 'text-amber-400' },
  negotiation:   { bg: 'bg-orange-500/20',  text: 'text-orange-400' },
  closed_won:    { bg: 'bg-emerald-500/20', text: 'text-emerald-400' },
  closed_lost:   { bg: 'bg-red-500/20',     text: 'text-red-400' },
};

const stageLabels: Record<string, string> = {
  prospecting:   'Prospecting',
  qualification: 'Qualification',
  proposal:      'Proposal',
  negotiation:   'Negotiation',
  closed_won:    'Closed Won',
  closed_lost:   'Closed Lost',
};

export default function StageBadge({ stage }: { stage: string }) {
  const color = stageColors[stage] || { bg: 'bg-slate-500/20', text: 'text-slate-400' };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color.bg} ${color.text}`}>
      {stageLabels[stage] || stage}
    </span>
  );
}
