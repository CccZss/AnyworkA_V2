import namespace from 'src/utils/namespace'

export default namespace('user', {
    actions: [
    	'getMyInfo',
    	'updatePassword',
        'updateInfo',
        'refresh',
        'exit'
    ],
    mutations: [
        'setInfo',
        'refresh',
    ]
})