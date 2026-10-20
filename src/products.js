// Store inventory. Prices are in CENTS (whole numbers) so the math never
// gets floating-point errors like 0.1 + 0.2 = 0.30000000000000004.
// image: a real photo or cover (in public/media); otherwise the icon is shown.
// preview: an audio clip shoppers can play before buying.
const media = (file) => `${process.env.PUBLIC_URL}/media/${file}`;

const products = [
  { id: 1, name: 'Core Classics Vinyl LP', category: 'Music', price: 2999, icon: '💿', description: '12-inch vinyl, 10 tracks', image: media('vinyl-cover.png') },
  { id: 2, name: 'Beat Pack Vol. 1', category: 'Music', price: 1999, icon: '🎹', description: '15 royalty-free beats, WAV + stems', digital: true, preview: media('beat-pack-preview.mp3') },
  { id: 3, name: 'Drum Sample Pack', category: 'Music', price: 999, icon: '🥁', description: '200 one-shots and loops', digital: true, preview: media('sample-pack-preview.mp3') },
  { id: 4, name: 'Logo Hoodie', category: 'Apparel', price: 5500, icon: '🧥', description: 'Heavyweight black hoodie' },
  { id: 5, name: 'Studio Tee', category: 'Apparel', price: 2500, icon: '👕', description: '100% cotton, screen printed' },
  { id: 6, name: 'Snapback Cap', category: 'Apparel', price: 2200, icon: '🧢', description: 'Embroidered logo' },
  { id: 7, name: 'Tour Poster', category: 'Extras', price: 1500, icon: '🖼️', description: '18 x 24 inch print' },
  { id: 8, name: '1-Hour Mix Session', category: 'Extras', price: 7500, icon: '🎧', description: 'Remote mixing with CoreTheProducer', digital: true, image: media('mix-session.jpg') },
];

export const categories = ['All', ...new Set(products.map((p) => p.category))];

export default products;
