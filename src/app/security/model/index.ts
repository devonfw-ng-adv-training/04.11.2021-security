export interface SecurityContext {
  jwtAccessToken: string;
  email: string;
}

export type UserRight = 'newBook' | 'updateBook';
