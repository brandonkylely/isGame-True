module.exports = {
  limit: (arr, limit) => {
    if (!Array.isArray(arr)) {
      return [];
    } else {
      return arr.slice(0, limit);
    }
  }
};
