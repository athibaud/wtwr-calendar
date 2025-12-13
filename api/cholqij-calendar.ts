import type { VercelRequest, VercelResponse } from '@vercel/node';
import { fromGregorianDate, addDays } from '../lib/cholqij.js';
import { NAHUAL_KICHE, NAHUAL_EMOJIS } from '../constants/nahual.js';
import { format, addDays as addDaysToDate } from 'date-fns';
import { getDayData } from '../data/index.js';

// Helper function to create a VEVENT string
const createEvent = (
  uid: string,
  dtstart: string,
  summary: string,
  description: string,
  url: string,
  rrule: string
): string => [
  'BEGIN:VEVENT',
  `UID:${uid}`,
  `DTSTART;VALUE=DATE:${dtstart}`,
  `SUMMARY:${summary}`,
  `DESCRIPTION:${description}`,
  `URL:${url}`,
  `RRULE:${rrule}`,
  'TRANSP:TRANSPARENT',
  'STATUS:CONFIRMED',
  'END:VEVENT'
].join('\r\n');

// Helper function to generate events for a single day
const generateDayEvents = (
  dayOffset: number,
  startDate: Date,
  startNahual: ReturnType<typeof fromGregorianDate>
): string[] => {
  const currentNahual = addDays(startNahual, dayOffset);
  const currentDate = addDaysToDate(startDate, dayOffset);
  
  const nahualName = NAHUAL_KICHE[currentNahual.nameId];
  const summary = `${currentNahual.number} ${nahualName}`;
  const dtstart = format(currentDate, 'yyyyMMdd');
  const uid = `cholqij-${currentNahual.number}-${currentNahual.nameId}@wtwr-calendar`;
  
  // Get day data from database if available
  const dayData = getDayData(currentNahual.number, currentNahual.nameId);
  const description = dayData
    ? `${dayData.title}\\n\\n${dayData.description}`
    : `Cholq'ij Sacred Calendar Day: ${summary}`;
  
  // Regular daily event
  const dailyEvent = createEvent(
    uid,
    dtstart,
    summary,
    description,
    'https://walkingthewhiteroad.substack.com/',
    'FREQ=DAILY;INTERVAL=260'
  );
  
  // Trecena event for day 1 (start of new 13-day cycle)
  const trecenaEvent = currentNahual.number === 1
    ? createEvent(
        `trecena-${currentNahual.nameId}@wtwr-calendar`,
        dtstart,
        `${NAHUAL_EMOJIS[currentNahual.nameId]} ${nahualName} Trecena Begins`,
        `New 13-day Trecena begins with ${nahualName}\\n\\nThis ${nahualName} Trecena brings the energy of ${nahualName} for the next 13 days. Each Trecena has its own spiritual focus and lessons.`,
        'https://walkingthewhiteroad.substack.com/',
        'FREQ=DAILY;INTERVAL=260'
      )
    : null;
  
  return trecenaEvent ? [dailyEvent, trecenaEvent] : [dailyEvent];
};

// Simple calendar generation function (free tier only - no personal cross, no premium content)
const generateCholqijICS = (startDate: Date): string => {
  const startNahual = fromGregorianDate(startDate);
  
  // Generate all 260 unique combinations using functional approach
  const events = Array.from({ length: 260 }, (_, dayOffset) => dayOffset)
    .flatMap(dayOffset => generateDayEvents(dayOffset, startDate, startNahual));
  
  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Walking The White Road//Cholqij Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:Cholq'ij Sacred Calendar`,
    `X-WR-CALDESC:Mayan Cholq'ij 260-day sacred calendar with day information`,
    ...events,
    'END:VCALENDAR'
  ];
  
  return icsLines.join('\r\n');
};

// Main Vercel Function handler
export default function handler(req: VercelRequest, res: VercelResponse) {
  // Allow GET and HEAD requests (browsers often send HEAD first)
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    // Parse start date if provided, default to January 1st, 2024
    let startDate = new Date('2024-01-01');
    if (req.query.start && typeof req.query.start === 'string') {
      const parsedDate = new Date(req.query.start);
      if (!isNaN(parsedDate.getTime())) {
        startDate = parsedDate;
      }
    }
    
    // Set response headers for calendar applications
    res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle HEAD requests (just return headers)
    if (req.method === 'HEAD') {
      res.status(200).end();
      return;
    }
    
    // Generate and return calendar content for GET requests
    const icsContent = generateCholqijICS(startDate);
    res.status(200).send(icsContent);
    
  } catch (error) {
    console.error('Calendar generation error:', error);
    res.status(500).json({ error: 'Failed to generate calendar' });
  }
}

