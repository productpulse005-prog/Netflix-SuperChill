import { Info, Play, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Recommendation } from "@/lib/chill-data";

interface ContentCardProps {
  recommendation: Recommendation;
  onWhy?: (recommendation: Recommendation) => void;
  onPlay?: () => void;
  learn?: boolean;
  showMatch?: boolean;
  progress?: number;
}

export default function ContentCard({ recommendation, onWhy, onPlay, learn = false, showMatch = true, progress }: ContentCardProps) {
  const { content } = recommendation;
  return (
    <article className="group relative min-w-[190px] max-w-[230px] flex-1 overflow-hidden rounded-md bg-[#1a1d24] shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-[0_16px_45px_rgba(0,0,0,.55)] sm:min-w-[210px]" data-testid={`content-card-${content.id}`}>
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={content.artwork} alt={`${content.title} demo artwork`} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101115] via-transparent to-transparent" />
        <Badge className="absolute left-3 top-3 border-0 bg-black/70 text-[10px] uppercase tracking-[.14em] text-white" data-testid={`content-card-kind-${content.id}`}>{content.kind}</Badge>
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <Button size="icon-sm" className="rounded-full bg-white text-black hover:bg-white/90" onClick={onPlay} data-testid={`content-card-play-${content.id}`} aria-label={`Play ${content.title}`}><Play className="ml-0.5 size-4 fill-current" /></Button>
          <Button variant="outline" size="icon-sm" className="rounded-full border-white/40 bg-black/40 text-white" data-testid={`content-card-add-${content.id}`} aria-label={`Add ${content.title} to My List`}><Plus className="size-4" /></Button>
        </div>
      </div>
      <div className="space-y-2 p-3.5">
        <div className="flex items-start justify-between gap-2"><h3 className="line-clamp-1 text-sm font-semibold text-white" data-testid={`content-card-title-${content.id}`}>{content.title}</h3><span className="shrink-0 text-[11px] text-zinc-500" data-testid={`content-card-year-${content.id}`}>{content.year}</span></div>
        <div className="flex flex-wrap gap-1.5 text-[11px] text-zinc-400" data-testid={`content-card-meta-${content.id}`}><span>{content.genres.slice(0, 2).join(" · ")}</span><span>·</span><span>{content.runtime}m</span></div>
        {progress !== undefined && <div className="h-1 overflow-hidden rounded-full bg-white/10" data-testid={`content-card-progress-${content.id}`}><div className="h-full rounded-full bg-[#E50914]" style={{ width: `${progress}%` }} /></div>}
        {(showMatch || onWhy) && <div className="flex items-center justify-between gap-2">
          {showMatch && <span className={`font-mono text-xs font-bold ${learn ? "text-cyan-300" : "text-emerald-300"}`} data-testid={`content-card-match-${content.id}`}>{recommendation.score}% {learn ? "Learning Match" : "Group Match"}</span>}
          {onWhy && <Button variant="ghost" size="xs" className="h-6 px-1.5 text-zinc-400 hover:bg-white/10 hover:text-white" onClick={() => onWhy(recommendation)} data-testid={`why-this-${content.id}`}><Info className="mr-1 size-3" />Why this?</Button>}
        </div>}
      </div>
    </article>
  );
}