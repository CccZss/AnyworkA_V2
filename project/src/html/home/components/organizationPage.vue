<template>
	<section class="organ-page">
		<Menu mode="horizontal" active-name="1" @on-select="handelSelect" :active-name="activeName">
            <div class="layout-assistant">
                <Menu-item name="test" >考试</Menu-item>
                <Submenu name="practice">
                    <template slot="title">
                        <!-- <Icon type="ios-person"></Icon> -->
                        练习
                    </template>
					<Menu-item v-for="item in testChapterList" :name="item.chapterId" :key="item.chapterId">
						{{item.chapterName}}
					</Menu-item>
                </Submenu>
            </div>
        </Menu>
		<div class="main">
			<!-- <div class="header">
				<h2>{{title}}</h2>
			</div> -->
			<loading :spinShow="spinShow" />
			<papers v-show="!spinShow"  :papers="paperList" />
        </div>
	</section>
</template>

<script>
	import { mapState, mapActions} from 'vuex';
	import paper from  '../store/types/paper'

	import papers from './organPage/papers'
	import loading from './item/loading'

	export default {
		data: function(){
			return {
				activeName: 'test',
				paperList: [],
				title: '',
				spinShow: true
			}
		},
		components: {
			papers,
			loading
		},
		computed: {
			...mapState({
				'allTestPaperList' : state => {
					return state.paper.allTestPaperList
				},
				'allPracticePaperList' : state => {
					return state.paper.allPracticePaperList
				},
				'testChapterList': state => {
					return state.paper.testChapterList
				},
				'organizationId' : state => {
					return state.organization.organizationId
				}
			})
		},
		methods: {
			...mapActions(paper.actions),

			handelSelect (name) {
				if(name ==='test' ){
					this.toGetAllTestPapers()
				}else {
					this.toGetPracticeListByChapter(Number(name))
				}

			},

			toGetAllTestPapers () {
				this.spinShow = true
				this.getAllTestPapers({
					organizationId: this.organizationId.toString()
				}).then((data) => {
					if(data.state){
						this.spinShow = false
						this.paperList = this.allTestPaperList
						this.title = "考试"
					}else{
						this.$Message.error(data.info)
					}
				}).catch((err) => {
					this.$Message.error(err)
				})
			},

			toGetChapterList () {
				this.getChapterList({
					organizationId: this.organizationId
				}).then((data) => {
					if(data.state){
					}else{
						this.$Message.error(data.info)
					}
				}).catch((err) => {
					this.$Message.error(err)
				})
			},

			toGetPracticeListByChapter (chapterId) {
				this.spinShow = true
				this.getPracticeListByChapter({
					organizationId: this.organizationId,
					chapterId: chapterId
				}).then((data) => {
					if(data.state){
						this.spinShow = false
						this.paperList = this.allPracticePaperList
						this.title = "练习"
					}else{
						this.$Message.error(data.info)
					}
				}).catch((err) => {
					this.$Message.error(err)
				})
			}
		},
		created () {
			if(this.organizationId === undefined) {
				this.$router.push({
					name: 'homepage',
				})
			}else{
				this.toGetAllTestPapers()
				this.toGetChapterList()
			}
		},
	}
</script>

<style scoped>
	.organ-page {
		width: 70%;
		height: 100%;
		min-width: 1000px;
		margin: auto;
		padding: 0 10px;
		background-color: white;
	}
	.header {
		position: relative;
		padding: 10px 20px 5px;
		margin-bottom: 10px;
		border-bottom: 1px solid #b4b4b4;
	}
	.main {
		padding: 10px 20px;
		position: relative;
		min-height: 130px;
	}
	
	@media only screen and (max-width: 992px) {
		.organ-page {
			width: 100%;
			min-width: 0;
		}
		.main {		
			min-height: 150px;
		}
	}
</style>