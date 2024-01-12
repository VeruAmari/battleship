const ship = (len) => {
  const surface = len;
  let hits = 0;
  const hit = () => {
    hits += 1;
  };
  const length = () => surface;
  const getHits = () => hits;
  const isSunk = () => hits === length();
  return { length, hit, getHits, isSunk };
};

export default ship;
