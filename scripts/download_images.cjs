const fs = require('fs');
const path = require('path');
const https = require('https');

const download = (url, dest) => {
  return new Promise((resolve) => {
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(file);
        file.on('finish', () => {
          file.close(() => resolve({ url, dest, status: 'OK' }));
        });
      } else {
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        resolve({ url, dest, status: 'FAIL ' + res.statusCode });
      }
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      resolve({ url, dest, status: 'ERR ' + err.message });
    });
  });
};

async function main() {
  const tasks = [];
  for (let i = 1; i <= 9; i++) {
    tasks.push(download('https://shivachickmaker.in/img/gallery/' + i + '.jpg', 'public/img/gallery/' + i + '.jpg'));
  }
  const services = [
    'bamboo-chick.jpg',
    'bamboo-fencing.jpg',
    'bamboo-chick-blinds.jpg',
    'anti-birds-safety-net.jpg',
    'agro-shade-nets.jpg',
    'pigeon-net.jpg',
    'zebra-blinds.jpg',
    'bamboo-hut.jpg',
    'bamboo-railing.jpg'
  ];
  for (const s of services) {
    tasks.push(download('https://shivachickmaker.in/img/our-services/' + s, 'public/img/our-services/' + s));
  }
  tasks.push(download('https://shivachickmaker.in/img/about-us.jpg', 'public/img/about-us.jpg'));
  tasks.push(download('https://shivachickmaker.in/img/blog-image.jpg', 'public/img/blog-image.jpg'));
  tasks.push(download('https://shivachickmaker.in/img/logo.png', 'public/img/logo.png'));
  tasks.push(download('https://shivachickmaker.in/img/palm-tree-group.png', 'public/img/palm-tree-group.png'));
  tasks.push(download('https://shivachickmaker.in/img/palm-tree-group-2.png', 'public/img/palm-tree-group-2.png'));

  const results = await Promise.all(tasks);
  console.log('Download complete:', results.filter(r => r.status === 'OK').length, 'files succeeded.');
}

main();
