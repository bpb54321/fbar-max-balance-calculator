# FBAR Max Balance Calculator

An app that allows you to calculate your max account balances for the Report of Foreign Bank and Financial Accounts (FBAR).

## Getting Started

First, install the dependencies:

```bash
npm install
```

### Running the App Locally

Copy `.env.example` to `.env`.

Fill in `YNAB_OATH_CLIENT_ID` (available at https://app.ynab.com/oauth/applications/. You'll have to create
your own YNAB OAuth application to get your own client ID, as I am not making my client ID public for this app.

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
npx tailwindcss -i ./css/input.css -o ./css/output.css
```

For watching for changes during development:

```bash
npx tailwindcss -i ./css/input.css -o ./css/output.css --watch
```

