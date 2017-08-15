<template>
	<section>
		<loading :spinShow="spinShow" />
		<ul>
			<li class="student-item" v-for="item in studentsList" :key="item.userId">
				<img :src=" '/anywork/picture/' + item.userId + '.jpg?' + refresh ">
				<div>
					<p><strong>姓名：</strong>{{item.userName}}</p>
					<p><strong>账号：</strong>{{item.email}}</p> 
					<p><strong>电话：</strong>{{item.phone}}</p>
				</div>
			</li>
		</ul>
	</section>
</template>

<script>
	import { mapState, mapActions} from 'vuex';
	import organization from  '../../store/types/organization'

	import loading from '../item/loading'
	export default {
		data () {
			return {		
				spinShow: false,
				refresh: ''
			}		
		},
		components: {
			loading
		},
		computed: {
			...mapState({
				'studentsList': state => {
					return state.organization.studentsList
				},
				'organization': state => state.organization
			})
		},
		methods: {
			...mapActions(organization.actions),

			toGetStudentsByOrganId() {
				this.spinShow = true
				this.getStudentsByOrganId({
					organizationId: this.organization.organizationId
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
			this.toGetStudentsByOrganId()
			this.refresh = new Date().getTime() - new Date().getTime() % 60000
		}
	}
</script>

<style scoped lang='less'>
	section {
		position: relative;
	}
	ul {

	}
	.student-item {
		float: left;
		width: 350px;
		box-shadow: 0 0 5px 1px #8c8c8c;
		padding: 30px 10px;
		margin: 10px 15px;
		cursor: pointer;

		&:hover {
			box-shadow: 0 0 5px 1px #60c793
		}

		& img {
			float: left;
			display: inline-block;
			width: 100px;
			height: 100px;
			margin-right: 10px;
	    	border: 1px solid #dedede
		}

		& p {
			margin-top: 10px;
		}
	}

</style>