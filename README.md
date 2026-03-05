# Abundant Illinois Site

## Structure
- `/index.html` + `/home.css` : minimal homepage (gateway)
- `/housing/index.html` + `/housing/styles.css` + `/housing/script.js` : full housing policy hub

## Local preview
From project root:

```bash
python3 -m http.server 4173
```

Then open:
- `http://localhost:4173`
- `http://localhost:4173/housing/`

## Quick updates
1. Sign-on email: edit `SIGNON_EMAIL` in `/housing/script.js`.
2. Bill tracker rows: update in `/housing/index.html`.
3. Supporter list/logo blocks: update in `/housing/index.html`.
4. Resource cards: update in `/housing/index.html`.
