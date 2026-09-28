# LOVE.AI ❤️
### A Personal Emotion Intelligence System
*Made by Heena, for Yash*

---

## 📁 Folder Structure

```
LOVE.AI/
├── index.html                 ← Main website (open this)
├── css/
│   └── style.css              ← All styles
├── js/
│   └── main.js                ← All interactions & animations
├── assets/
│   ├── images/                ← Add your photos here
│   │   ├── memory-placeholder.jpg   (included)
│   │   ├── photo-01.jpg       ← Add Yash's photos here
│   │   ├── photo-02.jpg
│   │   ├── photo-03.jpg
│   │   ├── photo-04.jpg
│   │   ├── memory-01.jpg      ← Add memory photos here
│   │   ├── memory-02.jpg
│   │   ├── memory-03.jpg
│   │   ├── memory-04.jpg
│   │   ├── memory-05.jpg
│   │   └── memory-06.jpg
│   └── music/
│       └── background.mp3     ← Add romantic music here
└── README.md
```

---

## 🚀 How to Run Locally

Simply open `index.html` in any modern browser:

```
Double-click → index.html
```

Or via terminal:
```bash
# Windows
start index.html

# Mac
open index.html
```

**No server required.** It's pure HTML/CSS/JS.

> **Note:** For music to work, you may need to use a local server due to browser autoplay policies. Use VS Code Live Server or run:
> ```bash
> npx serve .
> ```

---

## 📸 Where to Add Photos

### Gallery Photos (Polaroid section)
Add your photos to `assets/images/`:
- `photo-01.jpg` — "Still one of my favorite faces. ❤️"
- `photo-02.jpg` — "Why are you so cute? It's honestly annoying. 🙄"
- `photo-03.jpg` — "I would choose this smile again."
- `photo-04.jpg` — "One more memory I never want to lose."

Photos will automatically display in the gallery. Placeholders show until you add real photos.

### Memory Timeline Photos
- `memory-01.jpg` — Our Beginning
- `memory-02.jpg` — A Favorite Conversation
- `memory-03.jpg` — A Stupid Joke
- `memory-04.jpg` — A Beautiful Day
- `memory-05.jpg` — A Moment I Miss
- `memory-06.jpg` — Today

### Computer Vision Section
- `photo-cv.jpg` — The photo to "scan" in the CV section

**Recommended photo format:** JPG or PNG, portrait or square

---

## 🎵 Where to Add Music

Add your romantic background music to:
```
assets/music/background.mp3
```

Any MP3 file will work. The music button (🔇) in the nav bar will enable it.

**Suggested:** Instrumental romantic piano / lo-fi / your song together

The site works perfectly fine without music.

---

## ✏️ Where to Edit Memories

In `js/main.js`, find `birthdayConfig` at the top:

```javascript
const birthdayConfig = {
  creator: "Heena",
  name: "Yash",
  nickname: "Yash",

  memories: [
    {
      image: "assets/images/memory-01.jpg",
      title: "Our Beginning ✦",
      description: "The moment everything changed. [YOUR MEMORY HERE]"
    },
    // ... add more memories
  ],
  // ...
};
```

Replace the `[Add your memory here]` text in each memory description.

---

## 💬 Where to Edit Messages

### Timeline memories (in `index.html`):
Search for `MEMORY 01`, `MEMORY 02` etc. and edit the `<p>` description tags.

### Love letter (in `index.html`):
Search for `id="letter-section"` and edit the `letter-text` div.

### Floating love notes (in `js/main.js`):
Edit the `loveNotes` array:
```javascript
loveNotes: [
  "miss you ❤️",
  "kiss kiss 💋",
  // add your own notes here
]
```

---

## 🌐 How to Deploy

### Option 1: Netlify (Free, Recommended)
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the entire `LOVE.AI` folder
3. Get a shareable link instantly

### Option 2: Vercel
```bash
npm i -g vercel
vercel
```

### Option 3: GitHub Pages
1. Push to GitHub repository
2. Settings → Pages → Deploy from main branch

### Option 4: Share directly
Zip the folder and send it. Yash can open `index.html` locally.

---

## 🎨 Customization

### Change color palette
In `css/style.css`, edit the `:root` section:
```css
:root {
  --burgundy: #6B1A2A;   /* Main dark color */
  --wine:     #8B2342;   /* Accent */
  --rose:     #C1596A;   /* Highlights */
  --blush:    #E8A0AE;   /* Soft accents */
  /* ... */
}
```

### Add more photos to gallery
In `index.html`, find `photo-grid` and add more `.polaroid` divs following the existing pattern.

### Add more memory cards
In `index.html`, find `timeline` and add more `.timeline-item` divs.

### Change the letter
In `index.html`, find `letter-text` and replace the content.

---

## 🔊 Browser Notes

- **Music:** Requires user interaction first (browser policy). Click anywhere, then use the 🔇 button.
- **Animations:** Fully support `prefers-reduced-motion` for accessibility.
- **Best experience:** Chrome, Firefox, Edge, Safari (modern versions).
- **Mobile:** Fully responsive from 360px width.

---

## ❤️ Technical Honesty

The following sections are **romantic simulations** (not real AI):
- Training animation (fake epoch progression)
- Emotional sentiment bars
- Boyfriend model percentages
- Computer vision scan
- Final analysis loading sequence

The following are **real functionality**:
- All CSS/JS animations
- Interactive kiss counter
- "Search for better boyfriend" interaction
- Floating hearts and kisses
- Neural network canvas animation
- Music player
- Responsive layout
- Scroll-triggered animations

---

## 💋

*Made with AI + Code + Memories + A ridiculous amount of love.*

*— Heena, for Yash ❤️*
