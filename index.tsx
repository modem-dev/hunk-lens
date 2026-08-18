import type { ReactNode } from "react";
import type { ExtensionPaneProps, HunkExtensionAPI } from "hunkdiff/extension";

const LENS_LABEL = "─ Current line · old above, new below ";

/** Build the lens rule from terminal-width text without private UI helpers. */
export function lineLensRule(width: number) {
  const label = LENS_LABEL.slice(0, Math.max(0, width));
  return label + "─".repeat(Math.max(0, width - label.length));
}

/** Render the selected split row's old and new sides in a fixed bottom pane. */
export function CurrentLineLens({ currentLine, theme, width }: ExtensionPaneProps): ReactNode {
  if (!currentLine) return null;

  return (
    <box style={{ width, height: 3, flexDirection: "column", backgroundColor: theme.panel }}>
      <text fg={theme.border}>{lineLensRule(width)}</text>
      {currentLine.render("old", width) as ReactNode}
      {currentLine.render("new", width) as ReactNode}
    </box>
  );
}

/** Register the old-above-new current-line lens. */
export default function registerHunkLens(hunk: HunkExtensionAPI) {
  hunk.registerPane({
    id: "line-lens",
    title: "Current-line lens",
    placement: "bottom",
    height: { preferred: 3, min: 3, max: 3 },
    defaultOpen: true,
    currentLine: true,
    available: ({ currentLine }) => currentLine !== null,
    component: CurrentLineLens,
  });

  hunk.registerCommand({ id: "toggle", title: "Toggle current-line lens" }, (ctx) =>
    ctx.panes.toggle("line-lens"),
  );
}
