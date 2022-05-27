<template>
    <div>
        <div v-if="showMSG" :class="'alert alert-dismissible alert-' + (type == 'error' ? 'danger': type)" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>

            <div v-html="msgNot"></div>
        </div>
    </div> 
</template>

<script>
    export default {
        name: "Notificacao",
        props: {
            type: {
                type: String,
                required: true
            },
            msgNot: {
                type: String,
                required: false
            },
            showMSG: {
                type: Boolean,
                required: false
            },
            timeOut: {
                type: Number,
                required: false,
                default: 5000
            }
        },
        watch: {
            showMSG: {
                immediate: true,
                handler(value) {
                    if (value) {
                        this.showMessage()
                    }
                }
            },
        },                
        data() {
            return {
                show: false
            }
        },
        methods:{
            showMessage(){
                this.show = true

                if (this.timeOut > 0) {
                    setTimeout( () => {
                        this.show = false
                    }, this.timeOut);
                }

                this.$emit('afterDisplay')
            }
        },
    }
</script>

<style>

</style>