<template>
	<section>
		<h1>试卷：{{paper.testpaperTitle}}</h1>
		<div class="student-item" v-for="item in studentList" :key="item.studentId">
			<span>{{item.studentName}}</span>
			<span>是否做过：{{item.ifAttend}}</span>
			<span>是否评分：{{item.ifCheck}}</span>
			<Button type="primary">评分</Button>
		</div>
	</section>
</template>

<script>
	import { mapState, mapActions} from 'vuex';
	import paper from  '../../../store/types/paper'
	import organization from  '../../../store/types/organization'


	import loading from '../../item/loading'
	export default {
		data () {
			return {		
				spinShow: false,
			}		
		},
		components: {
			loading,
		},
		computed: {
			...mapState({
				'studentList': state => state.paper.studentList,
				'paper': state => state.paper,
				'organization': state => state.organization
			})
		},
		methods: {
			...mapActions(paper.actions),

			toGetStudentsByTest() {
				this.spinShow = true
				this.getStudentsByTest({
					organizationId: this.organization.organizationId,
					testpaperId: this.paper.testpaperId
				}).then((data) => {
					if(data.state){
						this.spinShow = false
						// this.$Message.success(data.info)
					}else{
						this.$Message.error(data.info)
					}
				}).catch((err) => {
					this.$Message.error(err)
				})
			},
			
		},
		created () {
			this.toGetStudentsByTest()
			this.refresh = new Date().getTime() - new Date().getTime() % 60000
		}
	}
</script>

<style scoped lang='less'>
	section {
		position: relative;
	}
	h1 {
		padding: 10px 20px 5px;
	    margin-bottom: 10px;
	    border-bottom: 1px solid #b4b4b4;
	}
	.no-info {
		margin-top: 30px;
		text-align: center;
		font-size: 20px;
	}
	.student-item {
		border: 1px solid;
		padding: 10px;
		margin: 10px;
	}
</style>