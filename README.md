# KS UI

Accessible React components for responsive product interfaces.

KS UI is a small public component system built to make interaction states and review criteria visible. It focuses on the parts of product UI that are easy to lose during delivery: keyboard behavior, focus movement, responsive interaction changes, error states, and component documentation.

## What is included

- Foundations: color, typography, spacing, radius, shadow, focus, and motion tokens
- Controls: Button, TextField, SelectField, Badge, and Tabs
- Overlays: DialogSheet and Toast
- Pattern: a responsive UI quality review workspace composed from the components
- Documentation: Storybook controls, responsive previews, and accessibility checks
- Tests: component interaction tests with Vitest and Testing Library

## Responsive DialogSheet

`DialogSheet` keeps one component API while changing its interaction model by viewport.

- Desktop: centered modal dialog
- Mobile: bottom sheet with safe-area padding and a visible drag handle
- Keyboard: focus trapping, Escape dismissal, and focus return are provided by Radix Dialog
- Motion: every animation respects `prefers-reduced-motion`

This is a deliberate behavior change, not only a CSS width change.

## Stack

- React 19 and TypeScript
- Vite 8
- Storybook 10
- CSS Variables and SCSS Modules
- Radix primitives for focus-sensitive interactions
- Vitest and Testing Library

## Local development

Use the Node version in `.nvmrc`.

```bash
nvm use
npm install
npm run storybook
```

Useful checks:

```bash
npm run lint
npm run typecheck
npm run test
npm run build:storybook
```

## Structure

```text
src/
  components/     Component code, styles, stories, and tests
  patterns/       Composed product UI examples
  stories/        Introduction and foundation documentation
  styles/         Global tokens and baseline styles
  lib/            Small framework-independent utilities
```

## Design decisions

- Components expose states through props instead of hidden selectors.
- Native controls are preferred when they already provide the required behavior.
- Radix primitives are used for focus management instead of recreating dialog and tab keyboard rules.
- Color does not carry status alone; labels and icons remain available.
- Cards use an 8px maximum radius to keep operational surfaces compact.
- The system stays intentionally small so each component can be reviewed end to end.

## Non-goals

- It is not a complete application framework.
- It does not mirror code or assets from a company project.
- It does not optimize for the largest possible component count.
- It is not published to npm yet; the public Storybook is the primary artifact for this stage.

## License

MIT
