import namespace from 'src/utils/namespace'

export default namespace('paper', {
    actions: [
        'getPracticeListByChapter',
        'getPaperInfo',
        'setPaperInfo',
        'submitPaper',

        'getChapterList',
        'getPaperAnswerById',

        'getStudentsByTest'
    ],
    mutations: [
        'setInfo',
    ]
})