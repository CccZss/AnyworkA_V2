<template>
	<section>
		<div id="home">
			<mynav/>
	  	</div>
	  	<router-view class="view"></router-view>
	</section>
</template>

<script>
import mynav from './components/myNav'

export default {
	data: function(){
		return {

		}
	},

	components: {
		mynav
	}
}
</script>

<style scoped>

</style>