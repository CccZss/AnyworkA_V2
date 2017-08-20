<template>
	<section>
		<div class="info-wrap">
			<div>
				<span>出卷老师</span>
				<Input type="text" class="input" ></Input>
			</div>
			<div>
				<span>试卷标题</span>
				<Input type="text" class="input" ></Input>
			</div>
			<div>
				<span>做题时间</span>
				<Date-picker class="input" type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="选择日期和时间" v-model="date" @on-ok="dateSelect" ></Date-picker>
			</div>
		</div>
		<!-- <div class="question-num-wrap">
			<div>
				<span>选择题</span>
				<Input type="text" class="input" ></Input>
			</div>
			<div>
				<span>填空题</span>
				<Input type="text" class="input" ></Input>
			</div>
			<div>
				<span>判断题</span>
				<Input type="text" class="input" ></Input>
			</div>
			<div>
				<span>简答题</span>
				<Input type="text" class="input" ></Input>
			</div>
			<div>
				<span>综合题</span>
				<Input type="text" class="input" ></Input>
			</div>
			<div>
				<span>编程题</span>
				<Input type="text" class="input" ></Input>
			</div>
		</div> -->
		<div class="bt-wrap">
			<Button type="primary" >下载模板</Button>
			<Button type="primary" >上传模板</Button>
			<Button type="primary" >创建试卷</Button>
		</div>
		<div class="paper-wrap">
			<typetab 
				:tabs="tabs" 
				@tab-select="tabSelect"
			/>
			<div class="question-wrap" v-show="currentTab === 'choose'">
				<div class="question-num-wrap">
					<span>题目数量</span>
					<Input-number class="input" :min="0" v-model="chooseNumber"></Input-number>
				</div>
				<choose v-for="(item, index) in Number(chooseNumber)" :index="index" :key="'choose-' + index"></choose>
			</div>
			<div class="question-wrap" v-show="currentTab === 'pad'">
				填空题
				<!-- <pad v-for="(item, index) in padNumber" :index=index @paditem="addPadItem"></pad> -->
			</div>
			<div class="question-wrap" v-show="currentTab === 'judge'">
				<!-- <judge v-for="(item, index) in judgeNumber" :index=index @judgeitem="addJudgeItem"></judge> -->
			</div>
			<div class="question-wrap" v-show="currentTab === 'issue'">
				<!-- <issue v-for="(item, index) in issueNumber" :index=index @issueitem="addIssueItem"></issue> -->
			</div>
			<div class="question-wrap" v-show="currentTab === 'integrated'">
				<!-- <integrate v-for="(item, index) in integrateNumber" :index=index @integrateitem="addIntegrateItem"></integrate> -->
			</div>
			<div class="question-wrap" v-show="currentTab === 'program'">
				<!-- <program v-for="(item, index) in programNumber" :index=index @programitem="addProgramItem"></program> -->
			</div>
		</div>
	</section>
</template>


<script>
	import typetab from './paper/questionTypeTab'
	import choose from './paper/create/choose'

	export default {
		data() {
			return {
				date: '',
				tabs: {
					choose: '选择题',
					pad: "填空题",
					judge: "判断题",
					issue: "问答题",
					integrated: "综合题",
					program: "编程题",
				},
				currentTab: 'choose',
				chooseNumber: 3
			}
		},
		components: {
			typetab,
			choose
		},
		methods: {
			dateSelect() {
				console.log( this.date)
			},
			tabSelect(name) {
				this.currentTab = name
			}
		},
	}
</script>


<style scoped lang='less'>
    
    section {
		border: 1px solid #dedede;
		margin: 10px 20px;
    }

	.info-wrap {
		.input {
			width: 250px;
			// margin-left: 5rem
		}
		span {
			display: inline-block;
			padding-right: 1em;
		}
		div {
			display: inline-block;
			margin: 5px  10px 5px 0;
		}
	}
	.question-wrap {
		position: relative;
	}

	.question-num-wrap {
		position: absolute;
		top: -35px;
		right: 20px;
		span {
			display: inline-block;
			width: 4em;
			font-size: 18px;
			color: green;
		}
		.input {
			vertical-align: top;
			width: 50px;
		}
	}
	.bt-wrap {
		padding: 10px 0 10px;
		margin-bottom: 10px;
		text-align: right;
		border-bottom: 1px solid #dedede;
	}
	
</style>