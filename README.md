# Handcrafted Ghanaian Slippers: Portfolio Website

Static website for GitHub Pages. No build step, no server. Version 1.0.0.
Developed by: Elijah Ying-Urah.

## What is already done
- Home, three collection pages (Funeral Wear, Chiefs, Queen Mothers), gallery, designer profile, craft and heritage, custom orders, FAQ, contact, 404
- 15 products from the supplied photos, with detail dialogs, colour filters and WhatsApp enquiry buttons
- Accessibility button (♿) with Light / Dark / Sepia / High-contrast themes, dyslexia-friendly font, line spacing and text size, all saved in the browser
- Footer: "Developed by: Elijah Ying-Urah" with the version number

## What is still a placeholder
Anything that needs the client's details shows on the site in a **yellow dashed highlight** with square brackets, for example `[Brand Name]`. See `PLACEHOLDERS.md` for the full checklist.

## Where to edit
| What | File |
|------|------|
| Brand, designer, phone, WhatsApp, email, address, hours, socials, form endpoint | `assets/js/config.js` |
| Products (names, prices, sizes, meanings, collection, featured flag) | `assets/js/products-data.js` |
| Page text (bio, story, FAQ, testimonials, process) | the `.html` files (search for `[`) |
| Colours and fonts | top of `assets/css/style.css` |

### Add a product
1. Add `assets/img/products/my-slipper.webp` (about 1000 px wide) and `assets/img/thumbs/my-slipper.webp` (about 560 px wide).
2. Copy one block in `products-data.js`; change `id`, `name`, `collection`, `image` ("my-slipper") and `alt`.

## Run locally
Open `index.html`, or run `python3 -m http.server` in this folder and visit http://localhost:8000.

## Publish on GitHub Pages
1. Create a GitHub repository and upload everything in this folder.
2. **Settings → Pages → Deploy from a branch**, branch `main`, folder `/ (root)`, save.
3. The site appears at `https://USERNAME.github.io/REPO-NAME/` in a minute or two.
4. Replace `USERNAME.github.io/REPO-NAME` in `sitemap.xml`, `robots.txt` and the `og:image` tags.
5. Custom domain (optional): add a `CNAME` file with the domain, set DNS, tick **Enforce HTTPS**.

## Contact form
Create a free form at formspree.io and paste its endpoint into `formEndpoint` in `config.js`. Until then the form points visitors to WhatsApp.

## Before launch
- Replace every highlighted placeholder
- Get the designer (and a cultural authority if needed) to approve wording on symbols, colours and customs
- Confirm the collection and name of each product
- Consider re-shooting the photo with clutter and a price tag in frame (the crossed-swords slipper held in a hand)
- Test on a real phone and run Lighthouse
