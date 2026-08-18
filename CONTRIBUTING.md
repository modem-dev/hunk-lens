# Contributing

Thanks for helping improve Hunk Lens.

## Development

```bash
bun install
bun run check
```

Exercise UI changes against a real split diff:

```bash
hunk diff --mode split --extension /path/to/hunk-lens
```

Keep changes focused on the current-line lens. Use public `hunkdiff/extension` APIs, preserve the fixed three-row geometry, and add or update tests for behavior changes.

## Pull requests

- Explain the user-visible reason for the change.
- Include validation performed locally.
- Update `CHANGELOG.md` for user-visible behavior.
- Use Conventional Commits for commit titles.
