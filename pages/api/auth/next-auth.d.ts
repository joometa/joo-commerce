import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session extends Session {
    id: string;
  }
}
