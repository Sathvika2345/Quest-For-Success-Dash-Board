export interface Student {
  id: string;
  name: string;
  targetScore: number;
  currentScore: number;
  firstScore: number;
  testsTaken: number;
  lastTestDate: string;
  mathScore: number;
  readingScore: number;
  writingScore: number;
  improvement: number;
  status: 'excellent' | 'good' | 'needs-attention';
}

export interface TestHistory {
  id: string;
  studentId: string;
  date: string;
  totalScore: number;
  mathScore: number;
  readingScore: number;
  writingScore: number;
}

// Generate mock SAT student data
export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    targetScore: 1500,
    currentScore: 1450,
    firstScore: 1200,
    testsTaken: 6,
    lastTestDate: '2024-01-15',
    mathScore: 750,
    readingScore: 350,
    writingScore: 350,
    improvement: 250,
    status: 'excellent'
  },
  {
    id: '2',
    name: 'Michael Chen',
    targetScore: 1400,
    currentScore: 1380,
    firstScore: 1100,
    testsTaken: 5,
    lastTestDate: '2024-01-18',
    mathScore: 720,
    readingScore: 330,
    writingScore: 330,
    improvement: 280,
    status: 'excellent'
  },
  {
    id: '3',
    name: 'Emma Davis',
    targetScore: 1300,
    currentScore: 1150,
    firstScore: 1050,
    testsTaken: 4,
    lastTestDate: '2024-01-20',
    mathScore: 580,
    readingScore: 285,
    writingScore: 285,
    improvement: 100,
    status: 'good'
  },
  {
    id: '4',
    name: 'James Wilson',
    targetScore: 1200,
    currentScore: 1050,
    firstScore: 1000,
    testsTaken: 3,
    lastTestDate: '2024-01-22',
    mathScore: 520,
    readingScore: 265,
    writingScore: 265,
    improvement: 50,
    status: 'needs-attention'
  },
  {
    id: '5',
    name: 'Aisha Patel',
    targetScore: 1550,
    currentScore: 1520,
    firstScore: 1350,
    testsTaken: 7,
    lastTestDate: '2024-01-25',
    mathScore: 800,
    readingScore: 360,
    writingScore: 360,
    improvement: 170,
    status: 'excellent'
  },
  {
    id: '6',
    name: 'David Martinez',
    targetScore: 1350,
    currentScore: 1200,
    firstScore: 1080,
    testsTaken: 4,
    lastTestDate: '2024-01-28',
    mathScore: 600,
    readingScore: 300,
    writingScore: 300,
    improvement: 120,
    status: 'good'
  }
];

// Generate mock test history data
export const mockTestHistory: TestHistory[] = [
  // Sarah Johnson
  { id: '1-1', studentId: '1', date: '2023-10-15', totalScore: 1200, mathScore: 600, readingScore: 300, writingScore: 300 },
  { id: '1-2', studentId: '1', date: '2023-11-15', totalScore: 1280, mathScore: 650, readingScore: 315, writingScore: 315 },
  { id: '1-3', studentId: '1', date: '2023-12-15', totalScore: 1350, mathScore: 690, readingScore: 330, writingScore: 330 },
  { id: '1-4', studentId: '1', date: '2024-01-15', totalScore: 1450, mathScore: 750, readingScore: 350, writingScore: 350 },
  
  // Michael Chen
  { id: '2-1', studentId: '2', date: '2023-11-01', totalScore: 1100, mathScore: 580, readingScore: 260, writingScore: 260 },
  { id: '2-2', studentId: '2', date: '2023-12-01', totalScore: 1220, mathScore: 640, readingScore: 290, writingScore: 290 },
  { id: '2-3', studentId: '2', date: '2024-01-18', totalScore: 1380, mathScore: 720, readingScore: 330, writingScore: 330 },
  
  // Emma Davis
  { id: '3-1', studentId: '3', date: '2023-11-10', totalScore: 1050, mathScore: 520, readingScore: 265, writingScore: 265 },
  { id: '3-2', studentId: '3', date: '2023-12-10', totalScore: 1100, mathScore: 550, readingScore: 275, writingScore: 275 },
  { id: '3-3', studentId: '3', date: '2024-01-20', totalScore: 1150, mathScore: 580, readingScore: 285, writingScore: 285 },
  
  // James Wilson
  { id: '4-1', studentId: '4', date: '2023-12-05', totalScore: 1000, mathScore: 500, readingScore: 250, writingScore: 250 },
  { id: '4-2', studentId: '4', date: '2024-01-05', totalScore: 1025, mathScore: 510, readingScore: 258, writingScore: 257 },
  { id: '4-3', studentId: '4', date: '2024-01-22', totalScore: 1050, mathScore: 520, readingScore: 265, writingScore: 265 },
  
  // Aisha Patel
  { id: '5-1', studentId: '5', date: '2023-10-01', totalScore: 1350, mathScore: 700, readingScore: 325, writingScore: 325 },
  { id: '5-2', studentId: '5', date: '2023-11-01', totalScore: 1420, mathScore: 730, readingScore: 345, writingScore: 345 },
  { id: '5-3', studentId: '5', date: '2023-12-01', totalScore: 1480, mathScore: 770, readingScore: 355, writingScore: 355 },
  { id: '5-4', studentId: '5', date: '2024-01-25', totalScore: 1520, mathScore: 800, readingScore: 360, writingScore: 360 },
  
  // David Martinez
  { id: '6-1', studentId: '6', date: '2023-11-20', totalScore: 1080, mathScore: 540, readingScore: 270, writingScore: 270 },
  { id: '6-2', studentId: '6', date: '2023-12-20', totalScore: 1140, mathScore: 570, readingScore: 285, writingScore: 285 },
  { id: '6-3', studentId: '6', date: '2024-01-28', totalScore: 1200, mathScore: 600, readingScore: 300, writingScore: 300 },
];

export const getStudentTestHistory = (studentId: string): TestHistory[] => {
  return mockTestHistory.filter(test => test.studentId === studentId).sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
};

export const calculateOverallStats = () => {
  const totalStudents = mockStudents.length;
  const averageCurrentScore = Math.round(mockStudents.reduce((sum, student) => sum + student.currentScore, 0) / totalStudents);
  const averageImprovement = Math.round(mockStudents.reduce((sum, student) => sum + student.improvement, 0) / totalStudents);
  const studentsOnTrack = mockStudents.filter(student => 
    student.currentScore >= student.targetScore * 0.9
  ).length;

  return {
    totalStudents,
    averageCurrentScore,
    averageImprovement,
    studentsOnTrack,
    onTrackPercentage: Math.round((studentsOnTrack / totalStudents) * 100)
  };
};