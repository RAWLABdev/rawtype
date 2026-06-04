# RAWTYPE_

A retro-inspired typing trainer built for developers, climbers and lifelong learners.

RAWTYPE_ transforms typing practice into a progression system inspired by climbing routes. Improve your speed, accuracy and consistency while working through curated levels, daily routes and long-form passages.

---

## Features

### Typing Practice
- Real-time WPM tracking
- Accuracy tracking
- Error counter
- Progress indicator
- Best score per route
- Retro high-contrast interface

### Route System
- Progressive difficulty levels
- Random Routes
- Daily Route
- Long-form passages
- Programming-focused content
- Technical and motivational texts

### Progression
- XP system
- Route completion tracking
- Streak tracking
- Personal records

---

## Tech Stack

- Next.js
- React
- TypeScript
- TailwindCSS

---

## Project Structure

txt src/ ├── components/ │   └── typing/ │       ├── CompleteModal.tsx │       ├── LevelSelector.tsx │       ├── ProgressBar.tsx │       ├── RouteActions.tsx │       ├── RouteHeader.tsx │       ├── StatsBar.tsx │       ├── TypingInput.tsx │       └── WordsPanel.tsx │ ├── data/ │   ├── levels.ts │   └── passages.ts │ ├── lib/ │   ├── dailyRoute.ts │   ├── progress.ts │   └── storage.ts │ └── utils/     └── formatTime.ts 

---

## Local Development

Clone the repository:

bash git clone https://github.com/RAWLABdev/rawtype.git 

Install dependencies:

bash npm install 

Run development server:

bash npm run dev 

Open:

txt http://localhost:3000 

---

## Roadmap

### Phase 1
- [x] Typing engine
- [x] WPM tracking
- [x] Accuracy tracking
- [x] XP progression
- [x] Random Route
- [x] Daily Route
- [x] Responsive layout
- [x] Modular architecture

### Phase 2
- [ ] Time Attack (60 sec)
- [ ] Time Attack (120 sec)
- [ ] Auto-scroll to active word
- [ ] Achievements
- [ ] Statistics dashboard
- [ ] Route history

### Phase 3
- [ ] User profiles
- [ ] Cloud sync
- [ ] Global leaderboard
- [ ] RAWLAB route collections

---

## Philosophy

RAWTYPE_ is not designed to be another typing test.

It is designed to help people build consistency through repetition, focus and deliberate practice.

Just like climbing:

- One move at a time.
- One route at a time.
- One session at a time.

---

Built by RAWLAB_

Movement • Code • Design

https://rawlab.space