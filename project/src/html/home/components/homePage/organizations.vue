<template>
	<section>
 		<div class="header" v-if="title === '搜索结果'">
			<h2>{{title}}</h2>
		</div> 
		<ul key="organization">
			<li class="organ-item" v-for="organ in organizations"  :key="organ.organizationId">
				<organitem 
					:organizationId = "organ.organizationId" 
					:teacherName = "organ.teacherName" 
					:teacherId = "organ.teacherId"
					:organizationName = "organ.organizationName" 
					:description = "organ.description" 
					:isJoin = "organ.isJoin" 
					:count = "organ.count" 
				 />
			</li>
		</ul>
		<p v-if="organizations.length<=0" class="no-info"> 没有数据... </p>
	</section>
</template>

<script>
	
	import organitem from '../item/organItem'
	export default {
		data () {
			return {

			}
		},
		props: ['organizations', 'title'],
		components: {
			organitem
		},
	}
</script>

<style scoped>
	.header {
		position: relative;
		padding: 10px 20px 5px;
		margin-bottom: 10px;
		border-bottom: 1px solid #b4b4b4;
	}
	.organ-item {
		display: inline-block;
		margin: 10px;
	}
	.no-info {
		margin-top: 30px;
		text-align: center;
		font-size: 20px;
	}

	@media only screen and (max-width: 992px) {
		.organ-item {
			display: block;
			margin: 2rem 0;
		}
	}
</style>