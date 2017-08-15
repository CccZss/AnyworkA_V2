import types from '../types/organization'
import { myAxios } from 'src/utils/interaction'

const state = {
	organizationId: undefined,
	organName: '',
	teacherId: undefined,   /*no info*/
	teacherName: '',
	description: '',
	count: undefined,       /*no info*/
	isJoin: undefined,
	myOrganizationList: [],
	searchResultList: [],
	studentsList: []
}

const actions = {
	[types.actions.getMyOrganizations]: (context) => {
		return new Promise((resolve, reject) => {
			myAxios({
				method: 'POST',
				url: '/organization/myOrganization',
			}).then(function(res){
                 if(res.data.state.toString()==="1"){
                    context.commit(types.mutations.setInfo,{
                    	myOrganizationList: res.data.data,
                    })
                    resolve({
                        state: true,
                        info: res.data.stateInfo}
                    )
                }else{
                    resolve({
                        state: false,
                        info: res.data.stateInfo}
                    )
                }
            }).catch(function(err){
                reject(err)
            })
		})
	},

	[types.actions.searchOrganizations]: (context, data) => {
		return new Promise((resolve, reject) => {
			myAxios({
				method: 'POST',
				url: '/organization/search',
				data: data
			}).then(function(res){
                 if(res.data.state.toString()==="1"){
                    context.commit(types.mutations.setInfo, res.data.data)
                    resolve({
                        state: true,
                        info: res.data.stateInfo}
                    )
                }else{
                    resolve({
                        state: false,
                        info: res.data.stateInfo}
                    )
                }
            }).catch(function(err){
                reject(err)
            })
		})
	},

	[types.actions.createOrganization]: (context, data) => {
		return new Promise((resolve, reject) => {
			myAxios({
				method: 'POST',
				url: '/organization/create',
				data: data
			}).then(function(res){
                 if(res.data.state.toString()==="1"){
                    context.state.myOrganizationList.push(res.data.data)
                    context.commit(types.mutations.setInfo,{
                    	myOrganizationList: context.state.myOrganizationList,
                    })
                    resolve({
                        state: true,
                        info: res.data.stateInfo}
                    )
                }else{
                    resolve({
                        state: false,
                        info: res.data.stateInfo}
                    )
                }
            }).catch(function(err){
                reject(err)
            })
		})
	},

	[types.actions.alterOrganization]: (context, data) => {
		return new Promise((resolve, reject) => {
			myAxios({
				method: 'POST',
				url: '/organization/alter',
				data: data
			}).then(function(res){
                 if(res.data.state.toString()==="1"){
                    var organ = res.data.data
                    var orgamList = context.state.myOrganizationList.map(function(item) {
                        if(item.organizationId === organ.organizationId) {
                            return organ
                        }else{
                            return item
                        }
                    })
                    
                    context.commit(types.mutations.setInfo,{
                    	myOrganizationList: orgamList,
                    })
                    resolve({
                        state: true,
                        info: res.data.stateInfo}
                    )
                }else{
                    resolve({
                        state: false,
                        info: res.data.stateInfo}
                    )
                }
            }).catch(function(err){
                reject(err)
            })
		})
	},

	[types.actions.deleteOrganization]: (context, data) => {
		return new Promise((resolve, reject) => {
			myAxios({
				method: 'POST',
				url: '/organization/delete',
				data: data
			}).then(function(res){
                 if(res.data.state.toString()==="1"){
                    resolve({
                        state: true,
                        info: res.data.stateInfo}
                    )
                }else{
                    resolve({
                        state: false,
                        info: res.data.stateInfo}
                    )
                }
            }).catch(function(err){
                reject(err)
            })
		})
	},

	[types.actions.getStudentsByOrganId]: (context, data) => {
		return new Promise((resolve, reject) => {
			myAxios({
				method: 'POST',
				url: '/organization/student',
				data: data
			}).then(function(res){
                 if(res.data.state.toString()==="1"){
                    context.commit(types.mutations.setInfo,{
                    	studentsList: res.data.data,
                    })
                    resolve({
                        state: true,
                        info: res.data.stateInfo}
                    )
                }else{
                    resolve({
                        state: false,
                        info: res.data.stateInfo}
                    )
                }
            }).catch(function(err){
                reject(err)
            })
		})
	},

    [types.actions.setOrganizationInfo]: (context, data) => {
        context.commit(types.mutations.setInfo, data)
    },
}

const mutations = {
	[types.mutations.setInfo]: (state, datas) => {
        Object.assign(state,datas)
	}
}

export default {
	state,
	actions,
	mutations
}