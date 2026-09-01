import { useMemo, useRef, useState } from "react";
import { Check, ChevronLeft, Heart, Pause, Play, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LEARNING_QUESTIONS } from "@/lib/chill-data";
import type { Content, LearningGoal, LearningQuestion } from "@/lib/chill-data";

const DEMO_VIDEO_URL = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm";

const formatTime = (seconds: number) => {
  const safe = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
  return `${String(Math.floor(safe / 60)).padStart(2, "0")}:${String(safe % 60).padStart(2, "0")}`;
};

function buildQuestions(content: Content, goal: LearningGoal): LearningQuestion[] {
  const themes = content.themes.length ? content.themes : [goal.topic];
  const prompts = [
    `What do you think will happen next, and how might it connect to ${themes[0].toLowerCase()}?`,
    `What evidence in this moment helps explain ${goal.topic.toLowerCase()}?`,
    `How could ${themes[1 % themes.length].toLowerCase()} affect your family, class, or community?`,
    `Whose perspective is missing from this moment, and why might that matter?`,
    `What is one idea about ${themes[2 % themes.length].toLowerCase()} you would explain in your own words?`,
  ];
  return LEARNING_QUESTIONS.map((question, index) => ({ ...question, question: prompts[index] }));
}

interface LearningPlayerProps {
  content: Content;
  goal: LearningGoal;
  onExit: () => void;
  onComplete: (questions: string[]) => void;
}

export default function LearningPlayer({ content, goal, onExit, onComplete }: LearningPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const promptedPauseRef = useRef(false);
  const baseQuestions = useMemo(() => buildQuestions(content, goal), [content, goal]);
  const [extraQuestions, setExtraQuestions] = useState<LearningQuestion[]>([]);
  const questions = [...baseQuestions, ...extraQuestions];
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState<LearningQuestion | null>(null);
  const [askedIds, setAskedIds] = useState<string[]>([]);
  const [skippedIds, setSkippedIds] = useState<string[]>([]);
  const [answeredIds, setAnsweredIds] = useState<string[]>([]);
  const [usefulIds, setUsefulIds] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<LearningQuestion["difficulty"]>(goal.context === "parent" ? "Foundational" : "Stretch");

  const nextQuestion = () => questions.find((question) => !askedIds.includes(question.id) && !skippedIds.includes(question.id)) ?? questions[0];

  const askQuestion = (question: LearningQuestion) => {
    promptedPauseRef.current = Boolean(videoRef.current && !videoRef.current.paused);
    videoRef.current?.pause();
    setPlaying(false);
    setActiveQuestion({ ...question, difficulty });
    setAskedIds((current) => current.includes(question.id) ? current : [...current, question.id]);
  };

  const handlePause = () => {
    const video = videoRef.current;
    setPlaying(false);
    if (promptedPauseRef.current) { promptedPauseRef.current = false; return; }
    if (!video || video.currentTime < 0.15 || video.ended || activeQuestion) return;
    askQuestion(nextQuestion());
  };

  const continueWatching = async () => {
    setActiveQuestion(null);
    await videoRef.current?.play().catch(() => undefined);
  };

  const generateQuestion = () => {
    const index = extraQuestions.length;
    const theme = content.themes[index % content.themes.length] ?? goal.topic;
    const generated: LearningQuestion = {
      id: `generated-${index + 1}`,
      timestamp: Math.max(1, elapsed),
      timestampLabel: formatTime(elapsed),
      type: "CONNECT TO REAL LIFE",
      icon: "🔗",
      question: `Where have you noticed ${theme.toLowerCase()} in your own life, family, school, or community?`,
      concepts: [theme, "Real-world connection"],
      difficulty,
    };
    setExtraQuestions((current) => [...current, generated]);
  };

  const discussedQuestions = questions.filter((question) => answeredIds.includes(question.id)).map((question) => question.question);
  const guideLabel = goal.context === "teacher" ? "Teacher guide" : "Parent guide";

  return <div className="player-shell min-h-screen px-5 pb-16 pt-24 sm:px-10 lg:px-14" data-testid="lesson-player"><div className="mx-auto max-w-7xl"><div className="mb-5 flex items-center justify-between"><button className="back-button" onClick={onExit} data-testid="player-exit"><ChevronLeft className="size-4" />Exit experience</button><div className="flex items-center gap-2"><span className="text-xs text-zinc-500" data-testid="adult-guide-label">{guideLabel}</span><span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.14em] text-emerald-300" data-testid="player-demo-badge">Concept player · CC0 footage</span></div></div><div className="grid gap-6 xl:grid-cols-[1.45fr_.55fr]"><div><div className="overflow-hidden rounded-xl border border-white/10 bg-black shadow-[0_24px_70px_rgba(0,0,0,.45)]"><div className="relative bg-black"><video ref={videoRef} className="aspect-video w-full bg-black object-cover" controls playsInline preload="metadata" poster={content.artwork} onPlay={() => setPlaying(true)} onPause={handlePause} onTimeUpdate={(event) => setElapsed(event.currentTarget.currentTime)} data-testid="lesson-video"><source src={DEMO_VIDEO_URL} type="video/webm" />Your browser does not support video playback.</video><div className="pointer-events-none absolute left-4 top-4 flex flex-wrap gap-2"><span className="rounded-full border border-black/20 bg-black/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.15em] text-white backdrop-blur-md" data-testid="lesson-content-label">{content.title} learning experience</span><span className="rounded-full border border-cyan-300/30 bg-cyan-400/20 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.15em] text-cyan-100 backdrop-blur-md" data-testid="lesson-age-band">{goal.grade}</span></div></div><div className="grid gap-4 border-t border-white/10 bg-[#14161b] p-5 sm:grid-cols-[1fr_auto] sm:items-center"><div><div className="text-[10px] font-bold uppercase tracking-[.18em] text-cyan-300">{playing ? "Watch" : "Meaningful moment"} · {goal.topic}</div><h1 className="mt-1 font-display text-2xl font-bold text-white">{content.title}</h1><p className="mt-2 text-sm text-zinc-400">{playing ? "Watch naturally, or choose Ask at a recommended moment." : elapsed > 0 ? "The content is paused. Use the recommended question to start a conversation." : "Press play, then use a recommended moment to pause, ask, discuss and continue."}</p></div><div className="flex items-center gap-4"><div className="text-right"><div className="font-mono text-lg font-bold text-white" data-testid="real-video-timestamp">{formatTime(elapsed)}</div><div className="text-[10px] uppercase tracking-[.14em] text-zinc-600">{answeredIds.length} discussed</div></div><Button variant="outline" className="border-white/15 text-zinc-300 hover:bg-white/10 hover:text-white" onClick={() => onComplete(discussedQuestions)} data-testid="session-complete-button">Finish Session <Check className="ml-2 size-4" /></Button></div></div></div></div><aside className="rounded-xl border border-white/10 bg-[#14161b]/90 p-4 sm:p-5" data-testid="recommended-questions-panel"><div className="mb-5"><div className="mb-1 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.18em] text-cyan-300"><SparklesIcon />Context-aware layer</div><h2 className="font-display text-xl font-bold text-white" data-testid="recommended-questions-title">Recommended Questions</h2><p className="mt-2 text-xs leading-5 text-zinc-500">Suggested for specific moments in this content.</p></div><div className="mb-4"><label htmlFor="question-difficulty" className="mb-2 block text-[10px] font-bold uppercase tracking-[.15em] text-zinc-500">Question difficulty</label><select id="question-difficulty" value={difficulty} onChange={(event) => setDifficulty(event.target.value as LearningQuestion["difficulty"])} className="field-select" data-testid="question-difficulty-select"><option>Foundational</option><option>Stretch</option><option>Challenge</option></select></div><div className="max-h-[540px] space-y-3 overflow-y-auto pr-1">{questions.map((question) => <article key={question.id} className={`question-card ${askedIds.includes(question.id) ? "used" : ""}`} data-testid={`question-card-${question.id}`}><div className="flex items-center justify-between"><span className="font-mono text-xs font-bold text-cyan-300">{question.timestampLabel}</span><span className="text-[9px] font-bold uppercase tracking-[.12em] text-zinc-600">{question.icon} {question.type}</span></div><p className="mt-2 text-sm leading-5 text-zinc-200">{question.question}</p><div className="mt-3 flex items-center justify-between gap-2"><span className="rounded bg-white/[.06] px-2 py-1 text-[10px] text-zinc-500">{askedIds.includes(question.id) ? "Asked" : skippedIds.includes(question.id) ? "Skipped" : difficulty}</span><div className="flex gap-1.5"><button className="rounded border border-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-zinc-400 transition hover:border-white/25 hover:text-white" onClick={() => setSkippedIds((current) => current.includes(question.id) ? current : [...current, question.id])} data-testid={`skip-question-${question.id}`}>Skip</button><button className="rounded bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-black transition hover:bg-zinc-200" onClick={() => askQuestion(question)} data-testid={`ask-question-${question.id}`}>Ask</button></div></div></article>)}</div><button className="mt-4 w-full rounded-md border border-white/10 py-2.5 text-xs font-semibold text-zinc-400 transition hover:border-cyan-400/30 hover:text-white" onClick={generateQuestion} data-testid="generate-question-button"><Plus className="mr-1.5 inline size-3.5" />Generate another question</button></aside></div></div>{activeQuestion && <div className="modal-backdrop" role="presentation" data-testid="pause-discuss-backdrop"><div className="pause-modal" role="dialog" aria-modal="true" data-testid="pause-discuss-modal"><div className="mb-5 flex items-center justify-between"><span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.16em] text-cyan-200"><Pause className="mr-1.5 inline size-3" />Content paused</span><span className="font-mono text-xs text-zinc-500">{activeQuestion.timestampLabel}</span></div><div className="text-xs font-semibold text-zinc-400">{activeQuestion.icon} {activeQuestion.type} · {activeQuestion.difficulty}</div><h2 className="mt-5 font-display text-3xl font-bold text-white" data-testid="pause-discuss-title">Pause &amp; Discuss</h2><p className="mt-4 text-2xl font-semibold leading-snug text-zinc-100" data-testid="pause-discuss-question">{activeQuestion.question}</p><div className="mt-7"><div className="mb-3 text-[10px] font-bold uppercase tracking-[.18em] text-zinc-500">Suggested talking points</div><div className="flex flex-wrap gap-2">{["Cause", "Effect", "Evidence", "Real-world connection"].map((point) => <span key={point} className="rounded-full border border-white/10 bg-white/[.05] px-3 py-2 text-xs text-zinc-300">{point}</span>)}</div></div><div className="mt-8 grid gap-2 sm:grid-cols-3"><Button variant="outline" className={answeredIds.includes(activeQuestion.id) ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-200" : "border-white/15 text-zinc-200"} onClick={() => setAnsweredIds((current) => current.includes(activeQuestion.id) ? current : [...current, activeQuestion.id])} data-testid="answered-question-button"><Check className="mr-2 size-4" />{answeredIds.includes(activeQuestion.id) ? "Answered ✓" : "Answered"}</Button><Button variant="outline" className={usefulIds.includes(activeQuestion.id) ? "border-violet-400/40 bg-violet-400/10 text-violet-200" : "border-white/15 text-zinc-200"} onClick={() => setUsefulIds((current) => current.includes(activeQuestion.id) ? current.filter((id) => id !== activeQuestion.id) : [...current, activeQuestion.id])} data-testid="mark-useful-button"><Heart className="mr-2 size-4" />Useful</Button><Button className="bg-white font-bold text-black hover:bg-zinc-200" onClick={continueWatching} data-testid="continue-watching-button"><Play className="mr-2 size-4 fill-current" />Continue</Button></div></div></div>}</div>;
}

function SparklesIcon() {
  return <span aria-hidden="true">✦</span>;
}