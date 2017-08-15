import namespace from 'src/utils/namespace'

export default namespace('paper', {
    actions: [
        'getAllTestPapers',
        'getAllPracticePapers',
        'getPracticeListByChapter',
        'getAllChapter',
        'getPaperInfo',
        'setPaperInfo',
        'submitPaper',

        'getAllTestChapter',
        'getPaperAnswerById',
    ],
    mutations: [
        'setInfo',
    ]
})