import { vi } from "vitest";

const NAMock = {
  auth: {
    session: {
      jwt: true,
    },
    jwt: {
      secret: process.env.AUTH_SECRET,
    },
  },
  signIn: vi.fn(),
  signOut: vi.fn(),
  handlers: {
    GET: vi.fn(),
    POST: vi.fn(),
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NAMock;
