# FBAR Max Balance Calculator

An app that allows you to calculate your max account balances for the Report of Foreign Bank and Financial Accounts (FBAR).

## Getting Started

First, install the dependencies:

```bash
npm install
```

### Running the App Locally

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

### Building the App

To build the app for production:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

### Running Tests

```bash
npm test
```

### Linting

```bash
npm run lint
```

### Compiling CSS with Tailwind

To compile CSS with Tailwind:

```bash
npx tailwindcss -i ./styles/input.css -o ./styles/output.css
```

For watching for changes during development:

```bash
npx tailwindcss -i ./styles/input.css -o ./styles/output.css --watch
```

### Storybook

To view the component library in Storybook:

```bash
npm run storybook
```

Then open [http://localhost:6006](http://localhost:6006) with your browser.

### Design System Visual Tests

To run the visual tests for the design system:

```bash
npm run design-system:test
```

This will capture and compare screenshots of components to ensure visual consistency.
