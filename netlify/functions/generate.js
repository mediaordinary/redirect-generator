const fetch = require('node-fetch');

exports.handler = async (event) => {
  try {
    const { news, aff } = JSON.parse(event.body);
    const slug = Math.random().toString(36).substr(2, 6);

    // Fetch metadata dari berita
    const res = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(news)}`);
    const html = await res.text();
    const m = html.match(/<meta[^>]+property="og:title"[^>]+content="([^"]+)"/);
    const title = m ? m[1] : 'Baca berita selengkapnya';
    const m2 = html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/);
    const image = m2 ? m2[1] : '';

    // Generate konten HTML redirect
    const page = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF‑8">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="Klik untuk mendapatkan penawaran affiliate">
  <meta property="og:image" content="${image}">
  <meta property="og:url" content="${news}">
  <meta name="twitter:card" content="summary_large_image">
  <meta http-equiv="refresh" content="2;url=${aff}">
  <title>Redirecting...</title>
</head><body>
<p>Mengarahkan...</p></body></html>`;

    // Simpan ke folder publik
    const fs = require('fs');
    fs.writeFileSync(`${__dirname}/../public/r/${slug}.html`, page);

    return {
      statusCode: 200,
      body: JSON.stringify({ slug }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
