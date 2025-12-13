# WTWR Calendar - Cholq'ij Sacred Calendar

A Vercel serverless function that generates a Cholq'ij (Mayan Sacred Calendar) ICS file. This calendar includes:

- All 260 days of the Cholq'ij cycle with day descriptions and guidance
- Complete trecena data for all 20 trecenas (13-day cycles)
- Trecena start events marked with emoji
- Full calendar cycle that repeats every 260 days

## Features

- **Complete Data**: All 20 trecenas with detailed day descriptions
- **ICS Format**: Generates standard `.ics` calendar files compatible with all major calendar applications
- **260-Day Cycle**: Complete Cholq'ij calendar cycle with recurring events
- **Trecena Markers**: Special events marking the start of each 13-day Trecena

## Installation

```bash
npm install
```

## Development

To run locally with Vercel:

```bash
npm run dev
```

Or use `vercel dev` directly.

## Deployment

This project is designed to be deployed on Vercel. Simply connect your repository to Vercel and deploy.

## API Usage

### Endpoint

```
GET /api/cholqij-calendar
```

### Query Parameters

- `start` (optional): Start date for the calendar in ISO format (e.g., `2024-01-01`). Defaults to `2024-01-01`.

### Example

```bash
# Default (starts from 2024-01-01)
curl https://your-domain.vercel.app/api/cholqij-calendar

# Custom start date
curl https://your-domain.vercel.app/api/cholqij-calendar?start=2025-01-01
```

### Response

Returns a `.ics` (iCalendar) file that can be:
- Downloaded and imported into calendar applications (Google Calendar, Apple Calendar, Outlook, etc.)
- Subscribed to as a webcal feed
- Used directly as a calendar subscription URL

## Calendar Content

Each day in the calendar includes:
- **Summary**: Tone number and Nahual name (e.g., "1 B'atz'")
- **Description**: Day title and detailed essence/guidance for the day
- **Recurrence**: Events repeat every 260 days (one complete Cholq'ij cycle)

Trecena events are marked with emoji and indicate the start of each 13-day cycle. All 20 trecenas are included with complete day data.

## Project Structure

```
wtwr-calendar/
├── api/
│   └── cholqij-calendar.ts    # Main serverless function (ICS generation)
├── lib/
│   └── cholqij.ts             # Cholq'ij calendar date calculations
├── constants/
│   └── nahual.ts              # Nahual and tone reference data (names, emojis)
├── data/
│   ├── index.ts               # Data access functions
│   ├── types.ts               # Data type definitions
│   └── trecenas/              # Trecena data files (20 trecenas)
│       ├── trecena-01-imox.ts
│       ├── trecena-02-iq.ts
│       ├── ...
│       └── trecena-20-ajpu.ts
├── types/
│   └── index.ts               # TypeScript type definitions
├── package.json
├── tsconfig.json
├── vercel.json
└── README.md
```

## Data Structure

The calendar uses a hierarchical data structure organized by trecenas:

- **20 Trecenas**: Each trecena file in `data/trecenas/` contains metadata and 13 day entries
- **Day Data**: Each day includes tone (1-13), nahual (1-20), title, and description
- **Reference Data**: Nahual names, tone names, and emojis are stored in `constants/nahual.ts`
- **Calculations**: Date calculations and cycle math are in `lib/cholqij.ts`

All 20 trecenas are currently implemented with complete day descriptions.

## Architecture

The codebase is organized with clear separation of concerns:

- **`lib/`**: Domain logic and calculations (Cholq'ij calendar math)
- **`constants/`**: Immutable reference data (formatting metadata)
- **`data/`**: Calendar content (trecena descriptions, day guidance)
- **`api/`**: API endpoints (Vercel serverless functions)

This structure makes it easy to migrate content data to a database (e.g., Supabase) while keeping calculation logic and constants in code.

## License

Private project for Walking The White Road.

