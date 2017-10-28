<template>
  	<div id="app">
  		<center class='wrap'>
			<img class="img" src="./images/weiwei.png">
			<p>歪歪，你的新密码是：{{newPassword}}
			<img v-show="showLodding" class="lodding" src="./images/lodding.gif">
			</p>
  		</center>
  	</div>
</template>

<script>
import { myAxios, IP} from 'src/utils/interaction'
export default {
	name: 'app',
	data (){
		return {
			showLodding: true,
			newPassword: ''
		}
	},
	methods: {
		getURLInfo: function(item) {
			var sValue = location.search.match(new RegExp("[\?\&]"+item+"=([^\&]*)(\&?)","i"))
    		return sValue?sValue[1]:sValue
		}
	},
	created () {
		myAxios({
            method: 'POST',
            url: 'utils/reset',
            data: {
            	email: this.getURLInfo('email'),
            	ciphertext: this.getURLInfo('ciphertext')
            }
        }).then((res) => {
            if(res.data.state.toString()==="1"){
             	history.pushState(null,'NEW PASSWORD',location.href.split('?')[0]);   
	                
	            this.newPassword = res.data.data
	            this.showLodding = false;
            }else{
              	alert(res.data.stateInfo)
              	this.newPassword = '没有，下一个'
	            this.showLodding = false;
            }
        }).catch(function(err){
            console.error(err)
        })
	}
}
</script>

<style scoped>
	.wrap {
        box-shadow: 1px 1px 10px 0px black;
	    margin: 50px;
	    padding-bottom: 30px;
	}
	.img {
		width: 300px;
    	margin-top: 31px;
	}
	p {
		margin-top: -10px;
		font-size: 25px;
		font-weight: bold;
	}
	.lodding {
	    width: 43px;
	    height: 43px;
	    vertical-align: bottom;
	}
	@media only screen and (max-width: 768px){
		.wrap {
		    margin: 5px;
		}
		.img {
		    width: 100%;
		}
		p {
			font-size: 18px;
		}
	}
</style>
