const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  const body = JSON.parse(event.body);
  const { news, affiliate } = body;

  // Fetch metadata dari link berita
  const ogImage = `https://image.thum.io/get/ogImage/${news}`;
  const ogTitle = `Berita Menarik`;

  const slug = Math.random().toString(36).substring(2, 8); // random id
  const filename = `go/${slug}.html`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="refresh" content="3;url=${affiliate}">
  <meta property="og:title" content="${ogTitle}" />
  <meta property="og:image" content="${ogImage}" />
  <meta property="og:url" content="${news}" />
</head>
<body>
  <p>🔁 Redirect ke halaman afiliasi...</p>
</body>
</html>`;

  fs.writeFileSync(path.join(__dirname, '../../', filename), html);

  return {
    statusCode: 200,
    body: JSON.stringify({ url: `https://namasite.netlify.app/go/${slug}.html` }),
  };
};
