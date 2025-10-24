# Copilot Instructions for `mosh-react-course`

This document provides guidance for AI coding agents working on the `mosh-react-course` project. Follow these instructions to ensure consistency and productivity.

## Project Overview

This is a React + TypeScript project bootstrapped with Vite. It includes:

- React components organized in the `src/components` directory.
- TypeScript for type safety.
- Vite for fast builds and hot module replacement (HMR).
- ESLint for linting and code quality.

## Key Files and Directories

- `src/`: Contains the main application code.
  - `components/`: Houses reusable React components.
    - Example: `FormWithUseForm.tsx` demonstrates form handling with `react-hook-form` and `zod`.
  - `assets/`: Static assets like images or fonts.
- `public/`: Publicly accessible static files.
- `vite.config.ts`: Configuration for Vite.
- `eslint.config.js`: ESLint configuration.
- `tsconfig.*.json`: TypeScript configuration files for different environments.

## Patterns and Conventions

1. **Component Structure**:

   - Components are organized by feature or functionality.
   - Use `.module.css` for component-specific styles (e.g., `Button.module.css`).

2. **Form Handling**:

   - Forms use `react-hook-form` with `zod` for schema validation.
   - Example: `FormWithUseForm.tsx` demonstrates validation and error handling.

3. **Styling**:

   - Use CSS modules for scoped styles.
   - Global styles are avoided to prevent conflicts.

4. **TypeScript**:
   - Strict type checking is enabled.
   - Use `zod` for runtime schema validation and type inference.

## Developer Workflows

### Building and Running

- Use `npm run dev` to start the development server.
- Use `npm run build` to create a production build.
- Use `npm run preview` to preview the production build.

### Linting

- Run `npm run lint` to check for linting errors.
- Update the ESLint configuration in `eslint.config.js` as needed.

### Testing

- Add tests in the `tests/` directory (if applicable).
- Use a testing library like `jest` or `react-testing-library` (not currently configured).

## External Dependencies

- `react-hook-form`: For form state management.
- `zod`: For schema validation.
- `vite`: For development and build tooling.
- `eslint`: For linting and code quality.

## Notes for AI Agents

- Follow the existing patterns for component structure and styling.
- Use `zod` for validation in new forms.
- Ensure TypeScript types are strictly adhered to.
- Update this document if new conventions or workflows are introduced.

## Example Tasks

1. Add a new form component:

   - Use `react-hook-form` and `zod` for validation.
   - Place the component in `src/components/`.
   - Use a `.module.css` file for styles.

2. Update ESLint rules:

   - Modify `eslint.config.js`.
   - Ensure the new rules align with the project's coding standards.

3. Add a new route:
   - Create a new component in `src/components/`.
   - Update the routing logic in `App.tsx` (if applicable).

---

For questions or updates, refer to the `README.md` or consult the project owner.
