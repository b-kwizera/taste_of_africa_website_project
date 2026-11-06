# Taste of Africa

A multi-page website celebrating African cuisine, built with semantic HTML5, CSS and vanilla JavaScript.

## Pages
- `index.html` – Home (hero + video, featured dishes, regions, food trends)
- `recipes.html` – Recipe list with region filter and favorites
- `recipes/` – Jollof Rice, Chicken Tagine, Injera, Bunny Chow, Isombe
- `regions/` – West, North and East Africa
- `about.html` – Mission, history, Google Map
- `contact.html` – Validated contact form

## JavaScript features (`script.js`)
- Recipe filter by region (`data-region`, `.hidden` class)
- Favorites saved in `localStorage` and restored on load
- Ingredient scaler (servings +/-)
- Dark / light mode toggle (saved in `localStorage`)
- Contact form validation (message > 20 characters) with personalised confirmation
- Footer newsletter signup

## Run locally
Open `index.html` in a browser, or run `python3 -m http.server` and visit http://localhost:8000.

## Credits
Photos from Wikimedia Commons (various CC licenses). Fonts: Playfair Display and Lato via Google Fonts.
