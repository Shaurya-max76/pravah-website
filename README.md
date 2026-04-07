# Pravah Website

This is the public website for Pravah, a river restoration initiative based in Indore. The site covers what the project is, publishes field updates, and lets people sign up to volunteer.

The live site is at [pravah.online](https://pravah.online).

---

## What this repo contains

```
/
  index.html              Home page
  about.html              About the initiative
  registration.html       Volunteer registration status
  privacy.html            Privacy policy
  updates/
    index.html            Lists all published posts
    post.html             Renders a single post (reads slug from URL)
  content/
    updates/posts/        JSON files, one per post + manifest.json
  admin/                  Netlify CMS panel (git-gateway backend)
  scripts/
    build-manifest.js     Generates manifest.json from the post files
  styles/
    site.css              All styles, one file
  netlify.toml            Build config for Netlify
```

The whole thing is plain HTML, CSS, and vanilla JavaScript. No frameworks, no bundler, no build step beyond generating the post manifest.

---

## How posts work

Posts live as JSON files in `content/updates/posts/`. Each file has this shape:

```json
{
  "title": "Your post title",
  "date": "2026-04-07",
  "category": "Field Report",
  "location": "Indore",
  "excerpt": "One or two sentences shown on the listing page.",
  "body": "Full post content in Markdown."
}
```

The filename becomes the slug. So `survey-001.json` is accessible at `post.html?slug=survey-001`.

The `manifest.json` file is a summary of all posts, sorted newest first, used by the updates listing page. It is generated automatically during the Netlify build by `scripts/build-manifest.js`. You should not edit it by hand.

### Adding a post through the CMS

Go to `/admin/` on the live site. Log in with your Netlify identity. Create a new entry under Updates. When it is approved and merged into main, Netlify rebuilds the site and the post appears on the updates page automatically.

### Adding a post manually

1. Create a new JSON file in `content/updates/posts/` following the shape above.
2. Run `node scripts/build-manifest.js` to regenerate `manifest.json`.
3. Commit and push both files.

---

## Running locally

There is no build step to install or run. You just need a local HTTP server because the updates page fetches the manifest with a relative `fetch()` call, which does not work over `file://`.

If you have Node installed, this works fine:

```bash
npx serve .
```

Or use the Live Server extension in VS Code. Either way, open the site at the local address it gives you.

---

## Deploying

The site is hosted on Netlify. Every push to `main` triggers a deploy. Netlify runs `node scripts/build-manifest.js` before publishing, so the manifest is always up to date on the live site.

The build config is in `netlify.toml`.

---

## Project background

Pravah focuses on the Saraswati and Kanh rivers, treating them as one connected system. The work combines field surveys, data, and community action. Shaurya Pratap Singh started the project in Indore.

If you want to contribute to the website itself, field work, mapping, or outreach, the volunteer form on the home page is the starting point.
