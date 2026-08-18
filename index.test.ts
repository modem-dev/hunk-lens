import { describe, expect, test, vi } from "vitest";
import type {
  ExtensionCommand,
  ExtensionCommandHandler,
  ExtensionPane,
  HunkExtensionAPI,
} from "hunkdiff/extension";
import registerHunkLens, { lineLensRule } from "./index";

describe("lineLensRule", () => {
  test("fills the available terminal width", () => {
    expect(lineLensRule(48)).toHaveLength(48);
    expect(lineLensRule(48)).toContain("Current line · old above, new below");
  });

  test("clips cleanly at narrow and empty widths", () => {
    expect(lineLensRule(8)).toBe("─ Curren");
    expect(lineLensRule(0)).toBe("");
  });
});

describe("hunk-lens registration", () => {
  test("registers one fixed current-line pane and its toggle command", () => {
    let pane: ExtensionPane | undefined;
    let command: ExtensionCommand | undefined;
    let handler: ExtensionCommandHandler | undefined;

    const hunk = {
      registerPane(value: ExtensionPane) {
        pane = value;
      },
      registerCommand(value: ExtensionCommand, callback: ExtensionCommandHandler) {
        command = value;
        handler = callback;
      },
    } as unknown as HunkExtensionAPI;

    registerHunkLens(hunk);

    expect(pane).toMatchObject({
      id: "line-lens",
      title: "Current-line lens",
      placement: "bottom",
      height: { preferred: 3, min: 3, max: 3 },
      defaultOpen: true,
      currentLine: true,
    });
    expect(command).toMatchObject({ id: "toggle", title: "Toggle current-line lens" });

    const toggle = vi.fn();
    handler?.({ panes: { toggle } } as never);
    expect(toggle).toHaveBeenCalledWith("line-lens");
  });
});
