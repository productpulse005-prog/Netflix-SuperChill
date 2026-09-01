export interface Profile {
  id: string;
  name: string;
  initials: string;
  color: string;
  genres: string[];
}

export interface Content {
  id: string;
  title: string;
  year: number;
  kind: "Movie" | "Series" | "Documentary";
  genres: string[];
  moods: string[];
  runtime: number;
  language: string;
  themes: string[];
  popularity: number;
  ageSuitability: number;
  watchedBy: string[];
  learningTopics: string[];
  learningRelevance: number;
  engagementPotential: number;
  artwork: string;
  synopsis: string;
}

export interface GroupPreference {
  mood: string;
  duration: string;
  genres: string[];
  language: string;
  avoid: string;
  alreadyWatched: string;
}

export interface Recommendation {
  content: Content;
  score: number;
  memberMatches: { profile: Profile; score: number; reasons: string[] }[];
  reasons: string[];
  groupFit: string[];
}

export interface LearningGoal {
  topic: string;
  grade: string;
  duration: string;
  objective: string;
}

export interface LearningQuestion {
  id: string;
  timestamp: number;
  timestampLabel: string;
  type: string;
  icon: string;
  question: string;
  concepts: string[];
  difficulty: "Foundational" | "Stretch" | "Challenge";
}

export interface Lesson {
  contentId: string;
  goal: LearningGoal;
  questionIds: string[];
  coveredConcepts: string[];
}

export const PROFILES: Profile[] = [
  { id: "aditi", name: "Puja", initials: "P", color: "#E50914", genres: ["Sci-Fi", "Thriller", "Mystery"] },
  { id: "rahul", name: "Rishi", initials: "R", color: "#8B5CF6", genres: ["Comedy", "Romance", "Sci-Fi"] },
];

const ART = {
  astronaut: "https://images.unsplash.com/photo-1655114722721-5c75114be5ab?auto=format&fit=crop&w=1200&q=85",
  space: "https://images.unsplash.com/photo-1637158539893-66237b2f5e9f?auto=format&fit=crop&w=900&q=85",
  redPlanet: "https://images.unsplash.com/photo-1614727187346-ec3a009092b0?auto=format&fit=crop&w=900&q=85",
  nature: "https://images.unsplash.com/photo-1770723965117-cffbc9e307a2?auto=format&fit=crop&w=900&q=85",
  cinema: "https://images.unsplash.com/photo-1561722798-9a732d141027?auto=format&fit=crop&w=900&q=85",
  future: "https://images.unsplash.com/photo-1636347172071-6d17b1139816?auto=format&fit=crop&w=900&q=85",
};

export const CATALOGUE: Content[] = [
  { id: "martian", title: "The Martian", year: 2015, kind: "Movie", genres: ["Sci-Fi", "Comedy", "Drama"], moods: ["Relaxed", "Feel-good", "Thought-provoking"], runtime: 144, language: "English", themes: ["Survival", "Teamwork", "Science"], popularity: 93, ageSuitability: 92, watchedBy: [], learningTopics: ["space", "science", "problem solving"], learningRelevance: 88, engagementPotential: 94, artwork: ART.redPlanet, synopsis: "A stranded astronaut turns science, grit and a little comedy into a way home." },
  { id: "walle", title: "WALL-E", year: 2008, kind: "Movie", genres: ["Animation", "Family", "Sci-Fi"], moods: ["Feel-good", "Emotional", "Thought-provoking"], runtime: 98, language: "English", themes: ["Sustainability", "Consumerism", "Human impact"], popularity: 96, ageSuitability: 96, watchedBy: [], learningTopics: ["climate change", "environmental sustainability", "consumer behavior", "human impact"], learningRelevance: 94, engagementPotential: 91, artwork: ART.nature, synopsis: "In a quiet future, one small robot discovers the enormous story of what humans leave behind." },
  { id: "stranger-things", title: "Stranger Things", year: 2016, kind: "Series", genres: ["Sci-Fi", "Thriller", "Mystery"], moods: ["Thrilling", "Thought-provoking"], runtime: 52, language: "English", themes: ["Friendship", "The unknown", "Courage"], popularity: 98, ageSuitability: 78, watchedBy: [], learningTopics: [], learningRelevance: 35, engagementPotential: 98, artwork: ART.future, synopsis: "A group of friends uncover a mystery that bends the boundaries of their small town." },
  { id: "inception", title: "Inception", year: 2010, kind: "Movie", genres: ["Sci-Fi", "Thriller", "Drama"], moods: ["Thrilling", "Thought-provoking"], runtime: 148, language: "English", themes: ["Memory", "Reality", "Teamwork"], popularity: 97, ageSuitability: 82, watchedBy: [], learningTopics: ["psychology", "storytelling"], learningRelevance: 58, engagementPotential: 95, artwork: ART.space, synopsis: "A specialist who steals secrets through dreams is offered a chance to plant an idea instead." },
  { id: "knives-out", title: "Knives Out", year: 2019, kind: "Movie", genres: ["Mystery", "Comedy", "Thriller"], moods: ["Thrilling", "Funny"], runtime: 130, language: "English", themes: ["Investigation", "Family", "Truth"], popularity: 94, ageSuitability: 84, watchedBy: [], learningTopics: ["critical thinking", "evidence"], learningRelevance: 64, engagementPotential: 94, artwork: ART.cinema, synopsis: "A detective untangles a deliciously sharp family mystery where everyone has a motive." },
  { id: "brooklyn-99", title: "Brooklyn Nine-Nine", year: 2013, kind: "Series", genres: ["Comedy", "Family"], moods: ["Funny", "Feel-good", "Relaxed"], runtime: 22, language: "English", themes: ["Friendship", "Teamwork", "Community"], popularity: 95, ageSuitability: 88, watchedBy: [], learningTopics: ["teamwork", "communication"], learningRelevance: 61, engagementPotential: 96, artwork: ART.future, synopsis: "A brilliant but immature detective and his oddball precinct make solving crime feel like family." },
  { id: "about-time", title: "About Time", year: 2013, kind: "Movie", genres: ["Romance", "Drama", "Comedy"], moods: ["Emotional", "Feel-good", "Relaxed"], runtime: 123, language: "English", themes: ["Family", "Time", "Choice"], popularity: 91, ageSuitability: 90, watchedBy: [], learningTopics: ["decision making", "relationships"], learningRelevance: 45, engagementPotential: 92, artwork: ART.redPlanet, synopsis: "A young man discovers he can revisit moments in time, but learns that an ordinary life is extraordinary." },
  { id: "our-planet", title: "Our Planet", year: 2019, kind: "Documentary", genres: ["Documentary", "Educational"], moods: ["Relaxed", "Thought-provoking", "Emotional"], runtime: 50, language: "English", themes: ["Nature", "Climate", "Conservation"], popularity: 94, ageSuitability: 96, watchedBy: [], learningTopics: ["climate change", "ecosystems", "conservation", "biodiversity"], learningRelevance: 91, engagementPotential: 89, artwork: ART.nature, synopsis: "A spectacular journey through the habitats and fragile systems that connect every living thing." },
  { id: "explained", title: "Explained", year: 2018, kind: "Documentary", genres: ["Documentary", "Educational"], moods: ["Thought-provoking", "Relaxed"], runtime: 25, language: "English", themes: ["Ideas", "Society", "Science"], popularity: 88, ageSuitability: 92, watchedBy: [], learningTopics: ["science", "society", "media literacy"], learningRelevance: 86, engagementPotential: 84, artwork: ART.future, synopsis: "Big ideas become clear, visual and surprisingly entertaining in bite-sized explainers." },
  { id: "mitchells", title: "The Mitchells vs. the Machines", year: 2021, kind: "Movie", genres: ["Animation", "Comedy", "Family"], moods: ["Funny", "Feel-good", "Thrilling"], runtime: 114, language: "English", themes: ["Technology", "Family", "Connection"], popularity: 93, ageSuitability: 95, watchedBy: [], learningTopics: ["technology", "family", "digital literacy"], learningRelevance: 79, engagementPotential: 95, artwork: ART.cinema, synopsis: "A wonderfully chaotic family road trip becomes humanity's last hope against a robot uprising." },
  { id: "klaus", title: "Klaus", year: 2019, kind: "Movie", genres: ["Animation", "Family", "Drama"], moods: ["Feel-good", "Emotional", "Relaxed"], runtime: 96, language: "English", themes: ["Kindness", "Community", "Tradition"], popularity: 90, ageSuitability: 97, watchedBy: [], learningTopics: ["community", "empathy"], learningRelevance: 52, engagementPotential: 91, artwork: ART.nature, synopsis: "An unlikely friendship turns a cold, divided town toward generosity and joy." },
  { id: "hidden-figures", title: "Hidden Figures", year: 2016, kind: "Movie", genres: ["Drama", "Educational"], moods: ["Emotional", "Feel-good", "Thought-provoking"], runtime: 127, language: "English", themes: ["Space", "Courage", "Equality"], popularity: 92, ageSuitability: 95, watchedBy: [], learningTopics: ["space", "mathematics", "history", "equality"], learningRelevance: 90, engagementPotential: 90, artwork: ART.astronaut, synopsis: "Three brilliant mathematicians help launch a nation into space while breaking barriers on Earth." },
  { id: "interstellar", title: "Interstellar", year: 2014, kind: "Movie", genres: ["Sci-Fi", "Drama"], moods: ["Thought-provoking", "Emotional"], runtime: 169, language: "English", themes: ["Space", "Time", "Human survival"], popularity: 96, ageSuitability: 88, watchedBy: [], learningTopics: ["space", "physics", "climate change"], learningRelevance: 83, engagementPotential: 96, artwork: ART.space, synopsis: "Explorers travel beyond our galaxy to find a future for humanity and the people they love." },
  { id: "social-dilemma", title: "The Social Dilemma", year: 2020, kind: "Documentary", genres: ["Documentary", "Drama"], moods: ["Thought-provoking", "Thrilling"], runtime: 94, language: "English", themes: ["Technology", "Behavior", "Society"], popularity: 87, ageSuitability: 88, watchedBy: [], learningTopics: ["technology", "consumer behavior", "media literacy"], learningRelevance: 82, engagementPotential: 86, artwork: ART.future, synopsis: "Tech insiders unpack how the tools designed to connect us can shape what we think and do." },
  { id: "love-actually", title: "Love Actually", year: 2003, kind: "Movie", genres: ["Romance", "Comedy", "Drama"], moods: ["Emotional", "Feel-good", "Funny"], runtime: 135, language: "English", themes: ["Love", "Community", "Choice"], popularity: 89, ageSuitability: 82, watchedBy: [], learningTopics: ["relationships", "communication"], learningRelevance: 42, engagementPotential: 91, artwork: ART.cinema, synopsis: "A warm, messy web of stories about love in all its unexpected forms." },
  { id: "the-good-place", title: "The Good Place", year: 2016, kind: "Series", genres: ["Comedy", "Drama"], moods: ["Funny", "Thought-provoking", "Feel-good"], runtime: 22, language: "English", themes: ["Ethics", "Friendship", "Change"], popularity: 92, ageSuitability: 88, watchedBy: [], learningTopics: ["ethics", "philosophy", "community"], learningRelevance: 73, engagementPotential: 94, artwork: ART.nature, synopsis: "Afterlife, ethics and a very good frozen yogurt shop collide in this clever comedy." },
  { id: "enola-holmes", title: "Enola Holmes", year: 2020, kind: "Movie", genres: ["Mystery", "Drama", "Family"], moods: ["Thrilling", "Feel-good", "Thought-provoking"], runtime: 123, language: "English", themes: ["Investigation", "Courage", "Identity"], popularity: 90, ageSuitability: 91, watchedBy: [], learningTopics: ["evidence", "history", "critical thinking"], learningRelevance: 68, engagementPotential: 92, artwork: ART.redPlanet, synopsis: "A spirited young detective searches for her missing mother and her own place in the world." },
  { id: "chef", title: "Chef", year: 2014, kind: "Movie", genres: ["Comedy", "Drama", "Family"], moods: ["Feel-good", "Relaxed", "Funny"], runtime: 114, language: "English", themes: ["Creativity", "Family", "Fresh starts"], popularity: 88, ageSuitability: 90, watchedBy: [], learningTopics: ["entrepreneurship", "creativity", "family"], learningRelevance: 57, engagementPotential: 89, artwork: ART.cinema, synopsis: "A chef rediscovers his creative spark and his relationship with his son on a joyful road trip." },
  { id: "beautiful-mind", title: "A Beautiful Mind", year: 2001, kind: "Movie", genres: ["Drama", "Mystery"], moods: ["Emotional", "Thought-provoking"], runtime: 135, language: "English", themes: ["Mathematics", "Courage", "Perception"], popularity: 90, ageSuitability: 86, watchedBy: [], learningTopics: ["mathematics", "psychology", "resilience"], learningRelevance: 76, engagementPotential: 87, artwork: ART.astronaut, synopsis: "A brilliant mathematician navigates genius, illness and the power of persistence." },
  { id: "money-heist", title: "Money Heist", year: 2017, kind: "Series", genres: ["Thriller", "Drama"], moods: ["Thrilling", "Emotional"], runtime: 50, language: "Spanish", themes: ["Strategy", "Teamwork", "Rebellion"], popularity: 96, ageSuitability: 76, watchedBy: [], learningTopics: ["strategy", "economics"], learningRelevance: 44, engagementPotential: 97, artwork: ART.future, synopsis: "A mysterious professor assembles an ambitious team for an impossible heist." },
  { id: "spiderverse", title: "Spider-Man: Into the Spider-Verse", year: 2018, kind: "Movie", genres: ["Animation", "Action", "Comedy"], moods: ["Funny", "Thrilling", "Feel-good"], runtime: 117, language: "English", themes: ["Identity", "Courage", "Mentorship"], popularity: 97, ageSuitability: 94, watchedBy: [], learningTopics: ["identity", "storytelling", "physics"], learningRelevance: 55, engagementPotential: 98, artwork: ART.space, synopsis: "A Brooklyn teenager discovers that anyone can wear the mask when dimensions collide." },
  { id: "the-crown", title: "The Crown", year: 2016, kind: "Series", genres: ["Drama", "History"], moods: ["Thought-provoking", "Emotional"], runtime: 58, language: "English", themes: ["Leadership", "History", "Duty"], popularity: 93, ageSuitability: 82, watchedBy: [], learningTopics: ["history", "leadership", "civics"], learningRelevance: 67, engagementPotential: 88, artwork: ART.cinema, synopsis: "A sweeping portrait of a reign, a family and the private cost of public duty." },
  { id: "mad-max", title: "Mad Max: Fury Road", year: 2015, kind: "Movie", genres: ["Action", "Thriller", "Sci-Fi"], moods: ["Thrilling"], runtime: 120, language: "English", themes: ["Survival", "Freedom", "Courage"], popularity: 95, ageSuitability: 72, watchedBy: [], learningTopics: [], learningRelevance: 28, engagementPotential: 97, artwork: ART.redPlanet, synopsis: "A relentless desert escape becomes a roaring fight for freedom and survival." },
  { id: "get-out", title: "Get Out", year: 2017, kind: "Movie", genres: ["Horror", "Thriller", "Mystery"], moods: ["Thrilling", "Thought-provoking"], runtime: 104, language: "English", themes: ["Identity", "Suspicion", "Society"], popularity: 94, ageSuitability: 68, watchedBy: [], learningTopics: ["media literacy", "society"], learningRelevance: 55, engagementPotential: 96, artwork: ART.future, synopsis: "A weekend visit slowly reveals a deeply unsettling secret hiding beneath polite smiles." },
  { id: "quiet-place", title: "A Quiet Place", year: 2018, kind: "Movie", genres: ["Horror", "Thriller", "Sci-Fi"], moods: ["Thrilling", "Emotional"], runtime: 90, language: "English", themes: ["Family", "Survival", "Communication"], popularity: 93, ageSuitability: 74, watchedBy: [], learningTopics: ["communication", "adaptation"], learningRelevance: 48, engagementPotential: 95, artwork: ART.cinema, synopsis: "A family survives in silence while danger listens for the smallest sound." },
  { id: "john-wick", title: "John Wick", year: 2014, kind: "Movie", genres: ["Action", "Thriller"], moods: ["Thrilling"], runtime: 101, language: "English", themes: ["Justice", "Loyalty", "Consequence"], popularity: 96, ageSuitability: 62, watchedBy: [], learningTopics: [], learningRelevance: 25, engagementPotential: 96, artwork: ART.future, synopsis: "A legendary former assassin returns to a dangerous world with singular focus." },
  { id: "jumanji", title: "Jumanji: Welcome to the Jungle", year: 2017, kind: "Movie", genres: ["Action", "Comedy", "Family"], moods: ["Funny", "Thrilling", "Feel-good"], runtime: 119, language: "English", themes: ["Teamwork", "Identity", "Courage"], popularity: 92, ageSuitability: 88, watchedBy: [], learningTopics: ["teamwork", "identity"], learningRelevance: 54, engagementPotential: 95, artwork: ART.nature, synopsis: "Four unlikely teammates enter a wild game and discover strengths they never knew they had." },
  { id: "crazy-rich-asians", title: "Crazy Rich Asians", year: 2018, kind: "Movie", genres: ["Romance", "Comedy", "Drama"], moods: ["Funny", "Feel-good", "Emotional"], runtime: 121, language: "English", themes: ["Family", "Identity", "Belonging"], popularity: 91, ageSuitability: 86, watchedBy: [], learningTopics: ["culture", "identity", "relationships"], learningRelevance: 52, engagementPotential: 91, artwork: ART.cinema, synopsis: "A romantic trip becomes an extravagant collision of family expectations and belonging." },
  { id: "paddington-2", title: "Paddington 2", year: 2017, kind: "Movie", genres: ["Family", "Comedy", "Animation"], moods: ["Feel-good", "Funny", "Relaxed"], runtime: 103, language: "English", themes: ["Kindness", "Community", "Justice"], popularity: 90, ageSuitability: 98, watchedBy: [], learningTopics: ["empathy", "community"], learningRelevance: 60, engagementPotential: 92, artwork: ART.nature, synopsis: "A kind-hearted bear brings out the best in everyone while trying to clear his name." },
  { id: "coco", title: "Coco", year: 2017, kind: "Movie", genres: ["Animation", "Family", "Drama"], moods: ["Emotional", "Feel-good", "Funny"], runtime: 105, language: "English", themes: ["Memory", "Family", "Culture"], popularity: 95, ageSuitability: 97, watchedBy: [], learningTopics: ["culture", "family", "memory"], learningRelevance: 67, engagementPotential: 96, artwork: ART.redPlanet, synopsis: "A young musician journeys through memory and family to understand where he belongs." },
  { id: "school-of-rock", title: "School of Rock", year: 2003, kind: "Movie", genres: ["Comedy", "Family", "Music"], moods: ["Funny", "Feel-good"], runtime: 109, language: "English", themes: ["Creativity", "Confidence", "Teamwork"], popularity: 91, ageSuitability: 93, watchedBy: [], learningTopics: ["music", "creativity", "teamwork"], learningRelevance: 62, engagementPotential: 94, artwork: ART.cinema, synopsis: "An unconventional substitute teacher helps a class discover confidence through rock music." },
  { id: "the-raid", title: "The Raid", year: 2011, kind: "Movie", genres: ["Action", "Thriller"], moods: ["Thrilling"], runtime: 101, language: "Indonesian", themes: ["Survival", "Duty", "Courage"], popularity: 88, ageSuitability: 58, watchedBy: [], learningTopics: [], learningRelevance: 24, engagementPotential: 96, artwork: ART.future, synopsis: "An elite team becomes trapped inside a tower controlled by a ruthless criminal network." },
  { id: "imitation-game", title: "The Imitation Game", year: 2014, kind: "Movie", genres: ["Drama", "History", "Thriller"], moods: ["Thought-provoking", "Emotional", "Thrilling"], runtime: 114, language: "English", themes: ["Codebreaking", "War", "Identity"], popularity: 91, ageSuitability: 86, watchedBy: [], learningTopics: ["history", "mathematics", "technology"], learningRelevance: 87, engagementPotential: 89, artwork: ART.astronaut, synopsis: "A brilliant mathematician leads a secret race to break an impossible wartime code." },
];

export const LEARNING_QUESTIONS: LearningQuestion[] = [
  { id: "q1", timestamp: 462, timestampLabel: "00:07:42", type: "THINK & PREDICT", icon: "🧠", question: "Why do you think humans became so dependent on technology?", concepts: ["Cause", "Systems thinking"], difficulty: "Foundational" },
  { id: "q2", timestamp: 860, timestampLabel: "00:14:20", type: "CHECK UNDERSTANDING", icon: "🔎", question: "What evidence do we see that the environment has changed?", concepts: ["Evidence", "Observation"], difficulty: "Foundational" },
  { id: "q3", timestamp: 1635, timestampLabel: "00:27:15", type: "DISCUSS", icon: "💬", question: "How might this problem affect your own community?", concepts: ["Real-world connection", "Impact"], difficulty: "Stretch" },
  { id: "q4", timestamp: 2110, timestampLabel: "00:35:10", type: "THINK CRITICALLY", icon: "🤔", question: "Who is responsible for changing a system: individuals, companies, or governments?", concepts: ["Responsibility", "Systems"], difficulty: "Challenge" },
  { id: "q5", timestamp: 2465, timestampLabel: "00:41:05", type: "QUICK CHECK", icon: "📝", question: "Name one choice that could reduce waste in your daily life.", concepts: ["Sustainability", "Action"], difficulty: "Foundational" },
];

export const formatMinutes = (minutes: number) => `${Math.floor(minutes / 60)}h ${minutes % 60}m`;

const durationLimit: Record<string, number> = { "<30 min": 29, "30–60 min": 60, "60–90 min": 90, "90–120 min": 120, "2h+": 240 };

const clamp = (value: number) => Math.max(42, Math.min(98, Math.round(value)));

export function recommendForGroup(profileIds: string[], preference: GroupPreference, profiles: Profile[] = PROFILES): Recommendation[] {
  const selected = profiles.filter((profile) => profileIds.includes(profile.id));
  const sharedGenres = selected.length > 1 ? selected[0].genres.filter((genre) => selected.every((profile) => profile.genres.includes(genre))) : [];
  const limit = durationLimit[preference.duration] ?? 240;

  return CATALOGUE.filter((content) => !content.watchedBy.some((id) => profileIds.includes(id)))
    .map((content) => {
      const genreHits = selected.map((profile) => profile.genres.filter((genre) => content.genres.includes(genre)).length);
      const memberMatches = selected.map((profile, index) => {
        const personal = clamp(62 + genreHits[index] * 12 + (content.moods.includes(preference.mood) ? 7 : 0) + content.popularity * 0.05);
        const reasons = profile.genres.filter((genre) => content.genres.includes(genre)).map((genre) => `${genre} preference`);
        return { profile, score: personal, reasons: reasons.length ? reasons : ["A fresh genre to explore"] };
      });
      const avgGenre = genreHits.reduce((sum, hit) => sum + hit, 0) / Math.max(selected.length, 1);
      const sharedBonus = sharedGenres.filter((genre) => content.genres.includes(genre)).length * 11;
      const moodBonus = content.moods.includes(preference.mood) ? 10 : 0;
      const timeBonus = content.runtime <= limit ? 8 : -Math.min(15, (content.runtime - limit) / 10);
      const languageBonus = preference.language === "Any language" || content.language === preference.language ? 6 : -8;
      const avoidPenalty = preference.avoid && content.genres.some((genre) => preference.avoid.toLowerCase().includes(genre.toLowerCase())) ? 24 : 0;
      const score = clamp(48 + avgGenre * 14 + sharedBonus + moodBonus + timeBonus + languageBonus + content.popularity * 0.08 - avoidPenalty);
      const reasons = [
        sharedGenres.length && content.genres.some((genre) => sharedGenres.includes(genre)) ? `Shared ${sharedGenres.find((genre) => content.genres.includes(genre))} sweet spot` : `Balances ${selected.map((profile) => profile.name).join(" and ")}\'s tastes`,
        content.moods.includes(preference.mood) ? `Fits tonight\'s ${preference.mood.toLowerCase()} mood` : "A strong change-of-pace option",
        content.runtime <= limit ? "Fits your time preference" : "Worth the extra time for the group",
      ];
      const groupFit = ["Both enjoy character-driven stories", "Matches the selected group mood", content.runtime <= limit ? "Fits the selected time preference" : "A shared-event pick for a longer night"];
      return { content, score, memberMatches, reasons, groupFit };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 12);
}

export function recommendForLearning(goal: LearningGoal): Recommendation[] {
  const topic = goal.topic.toLowerCase();
  return CATALOGUE.filter((content) => content.learningTopics.length > 0)
    .map((content) => {
      const topicMatch = content.learningTopics.some((item) => topic.includes(item) || item.includes(topic));
      const relevance = topicMatch ? Math.min(100, content.learningRelevance + 10) : Math.max(25, content.learningRelevance - 35);
      const calculatedScore = clamp(relevance * 0.58 + content.ageSuitability * 0.22 + content.engagementPotential * 0.14 + content.popularity * 0.06);
      const score = topic.includes("climate") ? (content.id === "walle" ? 94 : Math.min(93, calculatedScore)) : calculatedScore;
      const profile: Profile = { id: "guide", name: "Learning goal", initials: "✦", color: "#8B5CF6", genres: ["Educational"] };
      return { content, score, memberMatches: [{ profile, score, reasons: [`${content.learningRelevance}% learning relevance`] }], reasons: [`Strong connection to ${content.themes.slice(0, 3).join(", ").toLowerCase()}`, `Age suitability for ${goal.grade}`, `${content.engagementPotential}% engagement potential`], groupFit: [] };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}