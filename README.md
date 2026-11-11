# JayeshYadav07.github.io

Personal portfolio of Jayesh Yadav, software engineer.
Live at <https://jayeshyadav07.github.io/>.

## Structure

| File | Purpose |
| --- | --- |
| `index.html` | All page content: hero, about, experience, skills, projects, contact |
| `index.css` | Styles. Colours, fonts and spacing are CSS variables at the top of the file |
| `index.js` | Mobile menu, hero typewriter, scroll reveal, active nav link |
| `images/` | Portrait, project screenshots (WebP) and the resume PDF |

No build step and no dependencies. Open `index.html` in a browser, or serve the folder:

```bash
npx serve .
```

## Updating

- **Resume:** replace `images/Jayesh-Yadav-Resume.pdf`, keeping the same file name.
- **Projects:** copy a `project-card` block in `index.html` and edit it.
- **Accent colour:** change `--accent` in `index.css`.
