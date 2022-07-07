export const hasWriteRight = (users: string[]): boolean => {
  const user = window.localStorage.getItem('user');
  if (!user) {
    return false;
  }

  const userInfo = JSON.parse(user);
  return users.includes(userInfo.username) || users.includes(userInfo.userId) || users.includes(userInfo.phone);
};
