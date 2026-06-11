
export interface Progress {
  id: number;
  userId: number;
  courseId: number;
  completedModules: number;
  totalModules: number;
  completionPercentage: number;
  lastAccessed: string;
}

export interface Assessment {
  id: number;
  courseId: number;
  title: string;
  passingMarks: number;
}

export interface Question {
  id: number;
  assessmentId: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface AssessmentAttempt {
  id?: number | string;
  assessmentId: number | string;
  userId: number;
  score: number;
  status: 'passed' | 'failed';
}
