import "@testing-library/jest-dom";
import { afterAll, beforeAll, expect } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";
import { afterEach } from "node:test";
import { cleanup } from "@testing-library/react";
import { server } from "@/msw/server";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

afterEach(() => {
  server.resetHandlers();
});
