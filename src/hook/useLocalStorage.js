export function useLocalStorage() {
  /**
   *
   * @param {String} key
   * @param {String} defolt
   * @returns {String}
   */
  function getItemOrDefault(key, defolt = "") {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defolt;
  }
  function setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  return {
    getItemOrDefault,
    setItem,
  };
}
