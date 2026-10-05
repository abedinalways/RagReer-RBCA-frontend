export interface DailyTimeEntry {
  id: string;
  month: string;
  day: string;
  weekday: string;
  duration: string;
  title: string;
  address: string;
}

export interface TimeSheetPeriodData {
  periodLabel: string;
  totalHours: string;
  regularTime: string;
  overTime: string;
  regularPercentage: number;
  overtimePercentage: number;
  trend: string;
  trendType: "up" | "down";
  entriesCountText: string;
  dailyEntries: DailyTimeEntry[];
}

export const MOCK_TIME_SHEET_DATA: Record<string, TimeSheetPeriodData> = {
  week: {
    periodLabel: "Total Hours this week",
    totalHours: "52:36:45",
    regularTime: "40:00:00",
    overTime: "12:36:45",
    regularPercentage: 76,
    overtimePercentage: 24,
    trend: "+2.1%",
    trendType: "up",
    entriesCountText: "5 day's",
    dailyEntries: [
      {
        id: "entry-1",
        month: "August",
        day: "30",
        weekday: "Sunday",
        duration: "07h 30m",
        title: "North Entrance Monument & Isl...",
        address: "100 Whispering Pines Blvd at Hwy...",
      },
      {
        id: "entry-2",
        month: "August",
        day: "29",
        weekday: "Sunday",
        duration: "08h 45m",
        title: "North Entrance Monument & Isl...",
        address: "100 Whispering Pines Blvd at Hwy...",
      },
      {
        id: "entry-3",
        month: "August",
        day: "28",
        weekday: "Sunday",
        duration: "08h 30m",
        title: "North Entrance Monument & Isl...",
        address: "100 Whispering Pines Blvd at Hwy...",
      },
      {
        id: "entry-4",
        month: "August",
        day: "27",
        weekday: "Sunday",
        duration: "08h 40m",
        title: "North Entrance Monument & Isl...",
        address: "100 Whispering Pines Blvd at Hwy...",
      },
      {
        id: "entry-5",
        month: "August",
        day: "26",
        weekday: "Sunday",
        duration: "08h 50m",
        title: "North Entrance Monument & Isl...",
        address: "100 Whispering Pines Blvd at Hwy...",
      },
    ],
  },
  month: {
    periodLabel: "Total Hours this month",
    totalHours: "184:45:10",
    regularTime: "160:00:00",
    overTime: "24:45:10",
    regularPercentage: 86,
    overtimePercentage: 14,
    trend: "+4.5%",
    trendType: "up",
    entriesCountText: "22 day's",
    dailyEntries: [
      {
        id: "entry-m-1",
        month: "August",
        day: "30",
        weekday: "Sunday",
        duration: "07h 30m",
        title: "North Entrance Monument & Isl...",
        address: "100 Whispering Pines Blvd at Hwy...",
      },
      {
        id: "entry-m-2",
        month: "August",
        day: "29",
        weekday: "Sunday",
        duration: "08h 45m",
        title: "North Entrance Monument & Isl...",
        address: "100 Whispering Pines Blvd at Hwy...",
      },
      {
        id: "entry-m-3",
        month: "August",
        day: "28",
        weekday: "Sunday",
        duration: "08h 30m",
        title: "North Entrance Monument & Isl...",
        address: "100 Whispering Pines Blvd at Hwy...",
      },
      {
        id: "entry-m-4",
        month: "August",
        day: "27",
        weekday: "Sunday",
        duration: "08h 40m",
        title: "North Entrance Monument & Isl...",
        address: "100 Whispering Pines Blvd at Hwy...",
      },
      {
        id: "entry-m-5",
        month: "August",
        day: "26",
        weekday: "Sunday",
        duration: "08h 50m",
        title: "North Entrance Monument & Isl...",
        address: "100 Whispering Pines Blvd at Hwy...",
      },
    ],
  },
  day: {
    periodLabel: "Total Hours today",
    totalHours: "08:30:00",
    regularTime: "08:00:00",
    overTime: "00:30:00",
    regularPercentage: 94,
    overtimePercentage: 6,
    trend: "+0.5%",
    trendType: "up",
    entriesCountText: "1 day",
    dailyEntries: [
      {
        id: "entry-d-1",
        month: "August",
        day: "30",
        weekday: "Sunday",
        duration: "08h 30m",
        title: "North Entrance Monument & Isl...",
        address: "100 Whispering Pines Blvd at Hwy...",
      },
    ],
  },
};
