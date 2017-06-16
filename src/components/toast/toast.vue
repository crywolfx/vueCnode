<template>
	<transition name="fade">
		<div class="toast-content" v-if="toast.isShow">
			{{toast.content}}
		</div>
	</transition>
</template>
<script>
export default {
	name: 'toast',
	data() {
		return {

		}
	},
	watch: {
		toast(val, oldval) {
			if (val.isShow) {
				setTimeout(() => {
					this.$store.commit('SET_TOAST', {
						isShow: false,
						content: val.content,
						duration: 1500,
					})
				}, val.duration)
			}
		}
	},
	computed: {
		toast() {
			return this.$store.state.toast;
		}
	}
}

</script>
<style lang="scss" scoped>
.fade-enter-active {
	transition: all .2s ease-in-out;
}

.fade-leave-active {
	transition: all .2s ease-in-out;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}

.toast-content {
	padding: 8px 8px;
	background: #606060;
	border-radius: 6px;
	color: #FCFCFC;
}
</style>