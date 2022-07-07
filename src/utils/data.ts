export function getLocalUserData(key?: string) {
  const userInfo = window.localStorage.getItem('user');
  if (userInfo) {
    try {
      const data = JSON.parse(userInfo);
      return key ? data[key] : data;
    } catch {
      return null;
    }
  }
  return null;
}
