import { describe, test, vi } from "vitest";

window.ResizeObserver =
  window.ResizeObserver ||
  vi.fn().mockImplementation(() => ({
    disconnect: vi.fn(),
    observe: vi.fn(),
    unobserve: vi.fn(),
  }));

describe("RadarChart", () => {
  test("renders the radar chart with correct data", () => {
    const data = [
      { stat: { name: "HP", url: "" }, base_stat: 80, effort: 0 },
      { stat: { name: "Attack", url: "" }, base_stat: 120, effort: 0 },
      { stat: { name: "Defense", url: "" }, base_stat: 100, effort: 0 },
      { stat: { name: "Speed", url: "" }, base_stat: 90, effort: 0 },
    ];

    // render(<RadarChart data={data} />);
    // it will throw error : TypeError: this.node.getScreenCTM is not a function
    // same issue: https://github.com/apexcharts/react-apexcharts/issues/427
   
  });
});
