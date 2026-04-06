// Generates content/updates/posts/manifest.json from all post JSON files.
// Netlify runs this via the build command in netlify.toml.

const fs   = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, '..', 'content', 'updates', 'posts');
const outFile  = path.join(postsDir, 'manifest.json');

const files = fs.readdirSync(postsDir)
  .filter(f => f.endsWith('.json') && f !== 'manifest.json');

const posts = files.map(file => {
  const raw  = fs.readFileSync(path.join(postsDir, file), 'utf8');
  const data = JSON.parse(raw);
  return {
    slug:     file.replace('.json', ''),
    title:    data.title    || '',
    date:     data.date     || '',
    category: data.category || 'Update',
    location: data.location || 'Indore',
    excerpt:  data.excerpt  || '',
  };
});

// Newest first
posts.sort((a, b) => (b.date > a.date ? 1 : -1));

fs.writeFileSync(outFile, JSON.stringify(posts, null, 2));
console.log(`✅ manifest.json built — ${posts.length} post(s).`);
