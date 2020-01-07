<template>
	<view class="layout">
		<slot></slot>
		<an-layer ref="anRef" :autoClose="true" timer="3"><text>Hello Andot</text></an-layer>
	</view>
</template>

<script>
import anLayer from '@/components/an-layer/an-layer';
import QSPopup from '../../components/QS-popup/QS-popup.vue';
import { mapMutations, mapState } from 'vuex';
export default {
	mounted() {},
	computed: {
		...mapState(['common', 'user'])
	},
	methods: {
		topTips(msg, obj = {}) {
			this.$refs.anRef.show(msg, {
				type: obj.type || 'success',
				direction: 'top'
			});
		}
	},
	components: {
		anLayer,
		QSPopup
	}
};
</script>

<style></style>
