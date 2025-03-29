/**
 * @param {import("@prisma/client").Gift} giftsArray
 * @returns {import("@prisma/client").Gift}
 */
const sortGifts = (giftsArray) => {
  return giftsArray.sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    return 0;
  });
};

module.exports = sortGifts;
