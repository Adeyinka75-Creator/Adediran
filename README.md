# Adediran Adeyinka — Professional Frontend Developer Portfolio

A modern, responsive, and job-ready frontend developer portfolio built entirely with **semantic HTML5, modern CSS3, and Vanilla JavaScript (ES6+)**. Zero frameworks, zero dependencies, and production-optimized for technical recruiters and prospective clients.

---

## 📁 Project Structure

```text
portfolio/
│
├── index.html          # Semantic HTML5 markup with accessible landmarks & SEO tags
├── css/
│   └── style.css       # Clean, modular CSS3 with custom properties & media queries
├── js/
│   └── script.js       # Vanilla JavaScript (modal, active nav, theme toggle, form validation)
├── images/
│   ├── favicon.svg             # Modern monogram brand icon
│   ├── profile-avatar.svg      # Developer illustration & status card
│   ├── project-dynasty.svg     # Dynasty Fashion showcase mockup
│   ├── project-bank.svg        # Digital Bank Landing Page mockup
│   ├── project-gadgetsorb.svg  # Gadgetsorb iPhone repair platform mockup
│   └── project-calculator.svg  # Interactive Calculator utility mockup
└── README.md           # Documentation & customization guide
```

---

## 🚀 How to Run the Project Locally

Because this project is built with pure standard web technologies (**HTML5, CSS3, Vanilla JS**), you don't need any complex build tooling or node packages to view or edit it.

### Method 1: Direct Browser Launch (Simplest)
1. Open the `portfolio` folder.
2. Double-click `index.html` (or right-click and select **Open with Google Chrome / Firefox / Safari / Edge**).
3. The entire site will load immediately with all styling and interactive scripts functioning.

### Method 2: VS Code Live Server Extension (Recommended for Development)
1. Open the `portfolio` folder in **VS Code**.
2. Install the **Live Server** extension (by *Ritwick Dey*) from the VS Code Marketplace.
3. Right-click on `index.html` and click **"Open with Live Server"**.
4. Your browser will automatically open `http://127.0.0.1:5500/index.html` with instant live reload as you edit.

### Method 3: Python Built-In HTTP Server
Open your terminal in the `portfolio` directory and run:

```bash
# For Python 3:
python3 -m http.server 8000

# For Python 2:
python -m SimpleHTTPServer 8000
```
Then navigate to `http://localhost:8000` in your web browser.

### Method 4: Node.js / NPX `serve`
If you have Node.js installed:
```bash
npx serve portfolio
```

---

## 🛠️ How to Customize & Personalize

### 1. Updating Contact Details & Social Links
In `index.html` and `js/script.js`:
- **Email Address**: Search for `adediranadeyinkaabdulquyum@gmail.com` in `index.html` and `js/script.js` to change to your preferred contact email.
- **Phone Number**: Update the phone tag in the footer: `+234 9020394751`.
- **LinkedIn Profile**: Replace `https://linkedin.com/` with your custom profile URL (e.g. `https://www.linkedin.com/in/your-username`).
- **GitHub Profile**: Replace `https://github.com/Adeyinka75-Creator` with your GitHub profile link.

### 2. Updating Featured Projects & Images
- Project images are stored in `images/`. You can drop in your own PNG/JPG/WebP screenshots (e.g. `images/my-project.png`) and update the `<img>` `src` attribute in `index.html`.
- To update project URLs:
  - **Dynasty Fashion**: update `href="https://dynasty-fashion-designer.vercel.app/"`
  - **Digital Bank**: update `href="https://digital-landing-page-two.vercel.app/"`
  - **Gadgetsorb**: update the live demo and GitHub buttons inside `index.html`
  - **Calculator**: update the live demo link

### 3. Updating the Interactive Case Studies
Open `js/script.js` and locate the `caseStudiesData` object at the top. Each project has structured keys:
- `title`: The project name
- `badge`: Subtitle / category
- `overview`: 2–3 sentences explaining what was built
- `problem`: The engineering or business challenge
- `technologies`: Array of skills/tools used
- `features`: Array of bulleted features
- `challenges`: Key technical hurdles overcome
- `learnings`: What you mastered during the project

### 4. Updating Work Experience & Roles
In `index.html`, scroll to the `<section id="experience">`. Each role is wrapped in a `<div class="timeline-item">`:
```html
<div class="timeline-item">
  <div class="timeline-marker"></div>
  <div class="timeline-card">
    <div class="timeline-header">
      <div class="timeline-role-group">
        <h3>Your Job Title</h3>
        <span class="timeline-company">Company Name • Location/Remote</span>
      </div>
      <span class="timeline-period-badge">Dates (e.g. 2024 – Present)</span>
    </div>
    <ul class="timeline-responsibilities">
      <li>Key achievement or responsibility 1</li>
      <li>Key achievement or responsibility 2</li>
    </ul>
  </div>
</div>
```

---

## 🎨 Design Philosophy & Features

- **Typography Hierarchy**: Distinctive headings paired with high-contrast, legible body type (**Public Sans**).
- **Dark & Light Mode**: Accessible theme switcher with automatic preference detection and `localStorage` persistence.
- **Micro-Interactions**: Smooth hover elevations, button scaling, and subtle scroll reveals.
- **Mobile-First Responsiveness**: Handcrafted media queries for screens from 320px up to 4K displays.
- **Zero Framework Overhead**: Lightweight, sub-50KB bundle that loads under 1 second.
