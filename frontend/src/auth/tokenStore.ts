// tokenStore.ts
let accessToken: string | null = null;

export const tokenStore = {
  set(token: string) {
    accessToken = token;
  },
  get() {
    return accessToken;
  },
  clear() {
    accessToken = null;
  },
};
