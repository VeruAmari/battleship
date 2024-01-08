const ship = (len) => {
  const surface = [];
  let hits = 0;
  for (let i = 0; i < len; i += 1) {
    surface.push(false);
  }
  const hit = () => {
    hits += 1;
  };
  const length = () => surface.length;
  const getHits = () => hits;
  const isSunk = () => hits === length();
  return { length, hit, surface, getHits, isSunk };
};

export default ship;
