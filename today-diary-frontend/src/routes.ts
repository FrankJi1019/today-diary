export const getHomePageUrl = () => '/';
export const getMyDiaryPageUrl = () => '/diary';
export const getPublicDiaryPageUrl = () => '/public';
export const getMyRecordPageUrl = () => '/record';
export const getDiaryInfoPageUrl = (diaryId: string) => getMyDiaryPageUrl() + '/' + diaryId
export const getDiaryCreationUrl = () => getMyDiaryPageUrl() + '/create'
