# CHILL — Living Product Spec

## What it does
CHILL is a clearly labelled concept/prototype recommendation and engagement layer for a Netflix-style viewing experience. It is not a streaming app, is not affiliated with Netflix, and uses seeded demo metadata plus public/demo artwork.

## Data model
- `Profile`: seeded Puja (Sci-Fi, Thriller, Mystery), Rishi (Comedy, Romance, Sci-Fi), and Family profile
- `Content`: 20+ seeded Netflix-style movies/shows/documentaries with genres, moods, runtime, language, themes, popularity, age suitability, watched status, learning topics, and learning relevance
- `GroupPreference`: group mood, duration, language, avoid text, and selected members
- `Recommendation`: content, deterministic score, member matches, reasons, and group fit
- `LearningGoal`: topic, grade, duration, and objective
- `LearningQuestion`: timestamp, type, prompt, concepts, and difficulty
- `Lesson`: selected learning content, goal, question ids, and covered concepts

## Key flows
1. Home shows a Netflix-inspired shell, asks “Watch solo or watch together?”, includes the prototype disclaimer, and presents “Single or Shared Picks” alongside “From content to lesson”. Beneath those feature cards, the only Netflix-style catalogue rows are Trending, New Releases, and Continue Watching.
2. Watch Together: choose Couple/Friends/Family/Custom, select seeded profiles or add up to three custom named participants with genre preference chips, choose mood/time, receive ranked group picks, and open “Why this?” explainability. Friends and Custom groups also expose a clearly labelled demo invite with a QR-style preview, room code, copyable link, and no-login guest form; Couple and Family do not show this invite. The invite does not live-sync across devices.
3. Chill & Learn: an educator or parent can start with Climate Change, Space Science, History & Civil Rights, Media Literacy, or Ethics (or enter a custom topic), select a child age band, receive ranked content with dynamic learning metrics, build a lesson, use the simulated player and five timestamped questions, pause for discussion, and complete the lesson. The experience remains adult-led and children need no accounts. WALL-E remains the Climate Change demo top pick.

## Recommendation logic
The frontend demo engine in `frontend/src/lib/chill-data.ts` is deterministic and modular. Group scoring accepts both seeded and session-created profiles, then combines individual genre compatibility, shared-genre bonus, mood, runtime, language, popularity, and explicit avoid penalties. Learning scoring combines topic relevance, age suitability, engagement potential, and popularity, with the Climate Change/WALL-E demo case pinned to the specified 94% match. It can be replaced by a real ML/LLM/embedding service later without changing the UI contract.

## Auth and persistence
No authentication, student accounts, or student dashboard. My List is persisted locally in browser localStorage for the demo. The lesson and recommendations are session state only.