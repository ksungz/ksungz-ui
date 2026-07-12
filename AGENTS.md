# ksungz-ui project rules

## Purpose
- Public React component system for portfolio evidence.
- Prioritize accessibility, responsive behavior, documentation, and explicit design decisions.

## Stack
- React 19, TypeScript, Vite 8, Storybook 10
- CSS Variables + SCSS Modules
- Radix primitives only where focus management and keyboard behavior require proven foundations

## Constraints
- Keep components small and composable.
- Every interactive component needs keyboard and focus-visible behavior.
- Every component needs at least one Storybook story showing meaningful states.
- Cards and surfaces use a maximum 8px radius.
- Do not expose company code, internal names, or production assets.
- Use Node 22 from `.nvmrc`.
- Avoid repeated full builds; run one final production validation unless a failure requires a focused retry.
