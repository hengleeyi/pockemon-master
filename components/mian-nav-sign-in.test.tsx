import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import MainNav from "./mian-nav";
import { describe, expect, test, vi } from "vitest";

const authMock = vi.hoisted(() => {
  return () => {
    return null
  };
});

vi.mock("../lib/auth", async () => {
  const actual = await vi.importActual("../lib/auth");
  return {
    ...actual,
    auth: authMock,
  };
});

describe("MainNav", () => {
  test("renders Sign Out link when user is authenticated", async () => {
    const comp = await MainNav();
    render(comp);
    expect(screen.getByText(/Sign in with Google/)).toBeInTheDocument();
  });
});
