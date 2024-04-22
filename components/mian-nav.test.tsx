import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import MainNav from "./mian-nav";
import { describe, expect, test, vi } from "vitest";

const authMock = vi.hoisted(() => {
  return () => {
    return {
      user: { image: "https://test.png", name: "Master" },
    };
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
  test("renders Home link", async () => {
    const comp = await MainNav();
    render(comp);
    const homeLink = await screen.findByText("Home");
    expect(homeLink).toBeInTheDocument();
  });

  test("renders Sign Out link when user is authenticated", async () => {
    const comp = await MainNav();
    render(comp);
    expect(screen.getByText(/Sign Out/)).toBeInTheDocument();
  });

  test("click sign out successfuly", async () => {
    const comp = await MainNav();
    render(comp);
    fireEvent.click(screen.getByRole("button", { name: /Sign Out/ }));
  });

  test("renders Sign In link when user is not authenticated", async () => {
    const comp = await MainNav();
    render(comp);
    const homeLink = await screen.findByText("Sign Out");
    expect(homeLink).toBeInTheDocument();
  });
});
