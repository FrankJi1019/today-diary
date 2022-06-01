export interface Diary {
  diaryId: string,
  author: string,
  date: Date,
  content: string,
  mood: string,
  isPublic: boolean,
}

export interface FutureLetter {
  letterId: string,
  author: string,
  fromDate: string,
  toDate: string,
  title: string,
  content: string,
  read: boolean,
}
