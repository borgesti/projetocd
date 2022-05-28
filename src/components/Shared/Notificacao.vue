<template>
    <div>

        <b-alert
        :show="dismissCountDown"
        :dismissible="btnFecharAlert"
        :variant="tipoAlert"
       
        @dismissed="dismissCountDown=0"
        @dismiss-count-down="countDownChanged"
        >
        <p> <strong> {{msgAlert}} </strong> </p>
        
        
        <b-progress
            :variant="tipoAlert"
            :max="dismissSecs"
            :value="dismissCountDown"
            height="4px"
        ></b-progress>
        </b-alert>

    </div> 
</template>

<script>

    export default {
        name: "Notificacao",
        props: [
            "tipoAlert",
            "msgAlert",
            "mostrarAlert",
            "btnFecharAlert",
            "timeOutAlert",
        ],

        data() {
            return {
            dismissSecs: 5,
            dismissCountDown: 5,            
            }
        },
        methods: {
            countDownChanged(dismissCountDown) {
                this.dismissCountDown = dismissCountDown
              
            },
            showAlert() {
                this.dismissCountDown = this.mostrarAlert
                this.dismissSecs = this.timeOutAlert
              
            },
          
        },

      
    }  
</script>

<style>

</style>