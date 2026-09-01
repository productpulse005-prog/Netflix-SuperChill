# SUPER CHILL — Living Product Spec

## Product definition
SUPER CHILL is a clearly labelled concept/prototype intelligence layer inside a Netflix-style viewing experience. It is not a streaming service, Netflix competitor, chatbot, LMS, or official Netflix integration. Core thesis: “Netflix knows what you like. Super Chill understands how you want to experience it.”

## Locked hierarchy
- Netflix → SUPER CHILL
- 🍿 CHILL & RELAX — “Find something everyone will enjoy.”
- 🧠 CHILL & LEARN — “Turn great content into a learning moment.”

## Data model
- `Profile`: seeded Puja (Sci-Fi, Thriller, Mystery) and Rishi (Comedy, Romance, Sci-Fi), plus session-created custom participants
- `Content`: 30+ seeded Netflix-style titles across comedy, horror, action, sci-fi, romance, thriller, animation, documentary, educational, and family-friendly genres
- `GroupPreference`: mood, duration, language, avoids, and selected members
- `Recommendation`: deterministic score, individual matches, reasons, and group fit
- `LearningGoal`: parent/teacher context, age or grade, topic, duration, and objective
- `LearningQuestion`: timestamp, type, prompt, expected concepts, and difficulty
- `Lesson`: selected learning content, goal, question ids, and covered concepts

## Key flows
1. Home: Netflix-inspired shell with SUPER CHILL hero, one CHILL & RELAX entry, one CHILL & LEARN entry, and only Trending, New Releases, and Continue Watching catalogue rows.
2. CHILL & RELAX: choose Couple, Friends, or Custom Group; select seeded or custom participants; choose mood/time and optional constraints; receive 12 ranked group picks; open “Why this?” for transparent individual and group-fit reasoning. Friends and Custom Group retain the demo QR/room-code invite preview; it does not live-sync.
3. CHILL & LEARN: first choose Parent + Child or Teacher + Students. Parent setup uses age, exploration topic, and optional understanding goal. Teacher setup uses grade, topic, class duration, and learning goal. Results show Learning Match and context-specific reasoning, then Explore Together or Build Learning Experience.
4. Interactive learning: real public CC0 footage inside a clearly labelled concept player, five timestamped contextual questions, Ask/Skip, manual-pause prompting, difficulty adjustment, generated follow-up, Answered/Useful marking, Pause & Discuss, and Continue.
5. Session end: “Session Complete,” concepts explored, only questions marked Answered, one exit question, and parent-friendly language.

## Recommendation logic
The frontend engine in `frontend/src/lib/chill-data.ts` is deterministic and modular. Group scoring combines individual and shared genre compatibility, mood, runtime, language, popularity, and explicit avoid penalties rather than a simple average. Learning scoring combines topic relevance, age suitability, engagement potential, and popularity. WALL-E remains the pinned Climate Change demo case at 94%. A future ML/embedding/LLM ranker can replace this layer without changing the UI contract.

## Content and artwork
Recognizable titles use seeded demo metadata and distinct thematic Wikimedia Commons public-domain or Creative Commons artwork, not official copyrighted posters. Attribution appears in the footer. Availability on Netflix is not claimed.

## Auth, membership, and persistence
No authentication, child/student accounts, dashboards, grades, assignments, payments, pricing, or separate SUPER CHILL subscription. The concept assumes an existing Netflix membership. My List uses browser localStorage; recommendations and learning sessions use local session state.

## Measurement hypotheses
Future instrumentation could measure time-to-selection, recommendation acceptance, group-match satisfaction, repeat group usage, session start, learning activation, content selection, question usage/usefulness, session completion, repeat learning usage, and incremental play rate. No benchmark is presented as proven.