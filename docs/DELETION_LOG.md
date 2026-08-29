# Code Deletion Log

## [2026-02-25] Refactor Session

### Unused Dependencies Removed

- None (analysis indicates root `react`, `react-dom`, `sanity`, `styled-components` are false positives used by `sanity/` workspace tooling; `@portabletext/svelte` reserved for upcoming/content rendering and requires manual confirmation)

### Unused Files Deleted

- `src/lib/index.ts` - Unused `$lib` barrel file with no imports found in app code
- `src/lib/components/ui/hero/SectionHero.svelte` - No references found in codebase; not used by any route/component

### Duplicate Code Consolidated

- None in this batch (duplicate icon mapping in `SidebarSection` and `SearchModal` identified for future consolidation, deferred to keep this batch low risk)

### Unused Exports Removed

- `src/lib/utils/navigation.ts` - Removed `resolveLocalized()` (no references found)
- `src/lib/utils/index.ts` - Removed re-export `getIconByName` (function not used anywhere)

### Impact

- Files deleted: 2
- Dependencies removed: 0
- Lines of code removed: ~252
- Bundle size reduction: Unknown (not measured)

### Testing

- Verification pending in this subtask batch (recommended: `pnpm lint`, `pnpm check`, `pnpm build`)
