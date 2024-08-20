import { parseDate, useFormatDate } from "../useFormatDate";

it("returns N/A when date is an empty string", () => {
  const result = useFormatDate("");
  
  expect(result).toBe("N/A");
});

it("returns the correct date", () => {
  const date = new Date();
  const result = useFormatDate(date.toISOString());
  
  expect(result).toBe(parseDate(date));
});