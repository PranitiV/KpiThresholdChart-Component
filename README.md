# KPI Threshold Chart Project

This is a [Next.js](https://nextjs.org) project that visualizes KPI data with interactive threshold lines and annotations. The project is bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Table of Contents

- [Getting Started](#getting-started)
- [Features](#features)
- [Usage](#usage)

## Getting Started

First, clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd <project-directory>
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- **Interactive KPI Chart**: Visualize KPI data with draggable threshold lines.
- **Annotations**: Add and view annotations on specific data points.
- **Responsive Design**: Optimized for various screen sizes.
- **Customizable**: Easily adjust colors and styles.

## Usage

- **Thresholds**: Click and drag threshold lines to adjust their values.
- **Annotations**: Double-click on data points to add annotations.
- **Generate Summary**: Use the "Generate AI Summary" button to create a summary of the data.

## Adding OPENAI API key

- Add your own OPENAI_API_KEY in the openaiService.js file for Generate Summary to work

```bash
const OPENAI_API_KEY = "add your key here"
```
