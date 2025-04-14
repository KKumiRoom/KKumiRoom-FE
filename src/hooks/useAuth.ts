export function useAuth() {
  const login = (id: string, password: string) => {
    console.log(id, password);
  };

  return { login };
}
