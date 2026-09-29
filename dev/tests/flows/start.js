// Start screen → solar system; the grown-ups panel opens and closes; mute toggles.
module.exports = async ({ pg, S, W }) => {
  await S('start'); await pg.click('#gogrown'); await W(500); await S('grownups'); await pg.click('#gclose'); await W(300);
  await pg.click('#go'); await W(3000);
  const pill = await pg.textContent('#pill'); if (!/Solar System/.test(pill)) throw new Error('expected the solar system, got ' + pill);
  await pg.click('#mutebtn'); await W(300); await pg.click('#mutebtn'); await S('space');
};
