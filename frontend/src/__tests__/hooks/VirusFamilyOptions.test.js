import { renderHook } from "@testing-library/react-hooks";
import useVirusFamilyOptions from "../../hooks/useVirusFamilyOptions";

describe("renderHook", () => {
  it("should get table options", () => {
    renderHook(() => useVirusFamilyOptions());
  });
});
