<template>
	<section>
		<typetab 
			:tabs="tabs" 
			@tab-select="tabSelect"
		/>
		<ul v-show = "showTab === 'choose'" v-if="coundAnswer">
			<choose class="question" v-for="(item, index) in chooseList" :questionItem="item" :index="index" :key="index" @choose-select="answerHandel"/>
			<center class="no-question-tip" v-if="chooseList <= 0"> ~没有题目~ </center>
		</ul>

		<ul v-show = "showTab === 'pad'" v-if="coundAnswer">
			<pad class="question" v-for="(item, index) in padList" :questionItem="item" :index="index" :key="index" @pad-enter="answerHandel"/>
			<center class="no-question-tip" v-if="padList <= 0"> ~没有题目~ </center>
		</ul>
		<ul v-show = "showTab === 'judge'" v-if="coundAnswer">
			<judge class="question" v-for="(item, index) in judgeList" :questionItem="item" :index="index" :key="index" @judge-select="answerHandel"/>
			<center class="no-question-tip" v-if="judgeList <= 0"> ~没有题目~ </center>
		</ul>
		<ul v-show = "showTab === 'issue'" v-if="coundAnswer">
			<issue class="question" v-for="(item, index) in issueList" :questionItem="item" :index="index" :key="index" @issue-answer="answerHandel"/>
			<center class="no-question-tip" v-if="issueList <= 0"> ~没有题目~ </center>
		</ul>
		<ul v-show = "showTab === 'integrated'" v-if="coundAnswer">
			<integrated class="question" v-for="(item, index) in integratedList" :questionItem="item" :index="index" :key="index" @integrate-answer="answerHandel"/>
			<center class="no-question-tip" v-if="integratedList <= 0"> ~没有题目~ </center>
		</ul>
		<ul v-show = "showTab === 'program'" v-if="coundAnswer">
			<program class="question" v-for="(item, index) in programList" :questionItem="item" :index="index" :key="index" @program-answer="answerHandel"/>
			<center class="no-question-tip" v-if="programList <= 0"> ~没有题目~ </center>
		</ul>
		<Button class="submit-bt" type="success" size="large" @click="toSubmitAnswer" :disabled="!coundAnswer">提交</Button>
	</section>
</template>

<script>
	import { mapState, mapActions} from 'vuex';
	import paper from  '../../store/types/paper'
	import user from '../../store/types/user'

	import typetab from './questionTypeTab'
	import choose from './answer/choose'
	import pad from './answer/pad'
	import judge from './answer/judge'
	import issue from './answer/issue'
	import integrated from './answer/integrated'
	import program from './answer/program'

	export default {
		data: function(){
			return {
				tabs: {
					choose: '选择题',
					pad: "填空题",
					judge: "判断题",
					issue: "问答题",
					integrated: "综合题",
					program: "编程题",
				},
				showTab: 'choose',
				paperAnswer: [],
				coundAnswer: true
			}
		},
		components: {
			typetab,
			choose,
			pad,
			judge,
			issue,
			integrated,
			program
		},
		computed: {
			...mapState({
				'paper': state => {
					return state.paper
				},
				'user': state => {
					return state.user
				}
			}),

			chooseList () {	
				return this.paper.paperQuestionList.filter(function(question){
					return question.type === 1
				})
			},
			padList () {	
				return this.paper.paperQuestionList.filter(function(question){
					return question.type === 3
				})
			},
			judgeList () {
				return this.paper.paperQuestionList.filter(function(question){
					return question.type === 2
				})
			},
			issueList () {
				return this.paper.paperQuestionList.filter(function(question){
					return question.type === 4
				})
			},
			programList () {
				return this.paper.paperQuestionList.filter(function(question){
					return question.type === 5
				})
			},
			integratedList () {
				return this.paper.paperQuestionList.filter(function(question){
					return question.type === 6
				})
			}

		},
		methods: {
			...mapActions(paper.actions),

			toGetPaperInfo () {

				if(!this.paper.testpaperId) return

				this.getPaperInfo({
					testpaperId: this.paper.testpaperId.toString()
				}).then((data) => {
					if(data.state){
						this.paperAnswer = this.paper.paperQuestionList.map(function(item){
							if(item.type > 3){
								return {
									questionId: item.questionId.toString(),
									studentAnswer: ' '
								}
							}else if(item.type === 3){
								var arr = new Array()
								for(let i=0; i<item.other; i++){
									arr.push(' ')
								}
								return {
									questionId: item.questionId.toString(),
									studentAnswer: arr.join('∏')
								}
							}else if(item.type === 2){
								return {
									questionId: item.questionId.toString(),
									studentAnswer: ''
								}
							}else if(item.type === 1){
								return {
									questionId: item.questionId.toString(),
									studentAnswer: ''
								}
							}
						})
					}else{
						this.coundAnswer = false
						this.$Message.error(data.info)
					}
				}).catch((err) => {
					this.$Message.error(err)
				})
			},
			tabSelect(name) {
				this.showTab = name
			},
			answerHandel(data){
				var paperAnswer = this.paperAnswer.filter(function(item){
					if(item.questionId !== data.questionId){
						return true
					}
				})
				paperAnswer.push(data)
				this.paperAnswer = paperAnswer
			},
			submitAnswer () {
				var data = {
					studentId: this.user.userId,
					testpaperId: this.paper.testpaperId,
					studentAnswer: this.paperAnswer
				}
				this.submitPaper(data).then((data) => {
					if(data.state){
						this.$Message.success(data.info)
						this.$router.push({
							name: 'lookAnswer',
							params: {
								handel: 'submit'
							}
						})
						
					}else{
						this.$Message.error(data.info)
					}
				}).catch((err) => {
					this.$Message.error(err)
				})
			},
			toSubmitAnswer() {
				if(this.paper.testpaperType === 1){
					var r=confirm("提交试卷后将不能再提交，是否继续？");
					if (r==true){
					  	this.submitAnswer()
					}else {
					  	// alert("You pressed Cancel!");
					}
				}else {
					this.submitAnswer()
				}
			}
		},
		created () {
			// 将该试卷提交的答案填入默认答案，因为后台是通过遍历提交的题目id一个个查找，如果有题目没做的话会缺失
			console.log(this.$route.params.doAgain, this.paper.hasDown)
			if(this.$route.params.doAgain === undefined || !this.$route.params.doAgain){
				//说明不是回退回来
				if(!this.paper.hasDown){
					// 如果第一次做
					this.toGetPaperInfo()
				}else{
					this.$router.push({
						name: 'lookAnswer',
					})
					// 不是第一次做，请求该试卷答案信息，并跳转
				}
			}else{
				//在查看答案那里跳转回来的，直接开始做题
				this.toGetPaperInfo()
			}
		},
		/*beforeRouteLeave (to, from, next) {
			console.log('bf', this.paper.testpaperType)
			// 从做题页面离开，但是并没有提交过考试试卷
		    if(from.name==='answerPaper' && to.name!='lookAnswer' && !this.paper.hasDown && this.paper.testpaperType===1){
		    	var r=confirm("提交试卷/离开后将不能再提交，是否继续？");
				if (r==true){
					next()
				}else {
				  	// alert("You pressed Cancel!");
				}
		    }else{
				next()
		    }
	  	}*/

	}
</script>

<style scoped>
	.question {
		margin-top: 10px;
	}
	.submit-bt {
		float: right;
		margin: 20px 10px 10px;
	}
	.no-question-tip {
	    font-size: 25px;
	    margin: 10px 0;
	    padding: 20px 0 0 0;
	    letter-spacing: 3px;
	    border-top: 6px solid rgb(0, 188, 155);
	}

	@media only screen and (max-width: 992px) {
		.no-question-tip {
			 font-size: 37px;

		}
	}
</style>