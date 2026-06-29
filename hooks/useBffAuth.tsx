export function useBffAuth() {
  const login = (): void => { window.location.href = '/auth/login'; };
  const logout = (): void => { window.location.href = '/auth/logout'; };
  return { login, logout };
}
