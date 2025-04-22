import { describe, it, expect, beforeEach, vi } from "vitest";
import { formatTime, formatDate } from "./index";

// src/utils/format-time/index.test.ts

describe("formatTime", () => {
  it("should format time less than 100 as minutes", () => {
    expect(formatTime(30)).toBe("30 phút");
    expect(formatTime(1)).toBe("1 phút");
  });

  it("should format time greater than 100 as hours and minutes", () => {
    expect(formatTime(125)).toBe("2 giờ 5 phút");
    expect(formatTime(180)).toBe("3 giờ 0 phút");
  });
});

describe("formatDate", () => {
  let mockDate: Date;

  beforeEach(() => {
    // Mock current date to 2023-05-15 14:30:00
    mockDate = new Date(2023, 4, 15, 14, 30, 0);
    vi.spyOn(Date, "now").mockImplementation(() => mockDate.getTime());
  });

  it("should return minutes ago for the same hour", () => {
    const date = "15-05-2023 14:25:00";
    expect(formatDate(date)).toBe("5 phút trước");
  });

  it("should return hours ago for the same day", () => {
    const date = "15-05-2023 12:30:00";
    expect(formatDate(date)).toBe("2 giờ trước");
  });

  it('should return "Hôm qua" for yesterday', () => {
    const date = "14-05-2023 14:30:00";
    expect(formatDate(date)).toBe("Hôm qua");
  });

  it("should return date format for earlier dates in the same month", () => {
    const date = "10-05-2023 14:30:00";
    expect(formatDate(date)).toBe("10/05/2023");
  });

  it("should return months ago for dates in the same year", () => {
    const date = "15-03-2023 14:30:00";
    expect(formatDate(date)).toBe("2 tháng trước");
  });

  it("should return years ago for dates in different years", () => {
    const date = "15-05-2022 14:30:00";
    expect(formatDate(date)).toBe("1 năm trước");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
});
