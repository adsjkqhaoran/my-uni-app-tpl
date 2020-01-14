<template>
	<Layout ref="layout">
		<nav-bar title="表单验证"></nav-bar>
		<view class="inpt-box">
			<view class="inpt-cell">
				<view class="inpt-label">
					姓名：
				</view>
				<input data-name="name" @input='onInput'/>
			</view>
			<view class="inpt-cell">
				<view class="inpt-label">
					性别：
				</view>
				<radio-group @change='onInput' data-name="sex">
					<label class="radio"><radio value="0" />男</label>
					<label class="radio"><radio value="1" />女</label>
				</radio-group>
			</view>
			<view class="inpt-cell">
				<view class="inpt-label">
					多选:
				</view>
				<checkbox-group @change='onInput' data-name="check">
				    <label>
				        <checkbox value="0"  />0
				    </label>
				    <label>
				        <checkbox value="1" />1
				    </label>
				</checkbox-group>
			</view>
		</view>
		<view class="hx_btn normal theme" @click="formSubmit">提交</view>
	</Layout>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
export default {
	name: 'verify',
	data() {
		return {
			inpt: {
				name: '',
				sex: '',
				check: ''
			}
		};
	},
	computed: {
		...mapState(['common'])
	},
	onReady() {
		console.log(this.$options.name)
	},
	methods: {
		onInput(e) {
			console.log(this.inpt, e.target.dataset.name, e.target.value)
			this.inpt[e.target.dataset.name] = e.target.value
		},
		formSubmit() {
			let loginRules = [
			  {name: 'name', required: true, errmsg: '请输入您的姓名'},
			  {name: 'sex', required:true , errmsg: '请选择性别'},
			  {name: 'check', type: 'arrayLength', min: 1, errmsg: '请至少选择一个选项'}
			]
			let valLoginRes = this.$validate.validate(this.inpt, loginRules)
			console.log(valLoginRes)
			if (!valLoginRes.isOk) {
			  this.$refs['layout'].topTips(valLoginRes.errmsg, {type: 'error'})
			  return false
			}
		}
	}
};
</script>

<style lang="scss">
	.inpt-cell{
		background: #fff;
		height: 80rpx;
		display: flex;
		align-items: center;
		font-size: 30rpx;
		padding: 5rpx;
		.inpt-label{
			
		}
	}
</style>
