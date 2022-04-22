export interface Diary {
  diaryId: string,
  author: string,
  date: Date,
  content?: string,
  mood: string,
  isPublic: boolean,
}