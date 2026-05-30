export interface Section {
  id: string;
  title: string;
  subTitle?: string;
  index: number;
}

export interface DistanceData {
  from: string;
  to: string;
  distance: number; // km
  desc: string;
  isClosest: boolean;
}

export interface TerritoryElement {
  category: string;
  concept: string;
  dokdoStatus: string;
}

export interface HistoricalRecord {
  id: string;
  title: string;
  year: number;
  country: 'KOREA' | 'JAPAN';
  originalText?: string;
  translatedText: string;
  significance: string;
  keyEvidence: string;
}

export interface MapData {
  id: string;
  title: string;
  year: string;
  author: string;
  country: 'KOREA' | 'JAPAN';
  description: string;
  dokdoRepresentation: string;
  historicalSignificance: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  details: string;
  impact: string;
}

export interface EssayResponse {
  groupName: string;
  koreanStudentName: string;
  japaneseStudentName: string;
  chapterTitle: string;
  essayContent: string;
  teacherFeedback?: string;
  lastUpdated?: string;
}

export interface DiscussionAnswer {
  q1: string;
  q2: string;
  q3: string;
}
