import moment from 'moment'

export const dateUtils = {
    isDate(data) {
        return Object.prototype.toString.call(data) === '[object Date]'
    },
    // formatarData(data, formato) {
    //     try {
    //         return this.isDate(data) ? moment(data).format(formato) : moment(moment(data, 'DD/MM/YYYY')).format(formato)            
    //     } catch (error) {
    //         return data
    //     }
    // },
    formatarData(data, formato = 'DD/MM/YYYY HH:mm:ss') {
        try {
            return data ? moment(data).format(formato) : ''            
        } catch (error) {
            return data
        }
    },

    getDataHoraPorExtenso(data, formato = 'LLL') {
        try {
            return data ? moment(data).format(formato) : ''            
        } catch (error) {
            return data
        }
    },

    getHoraData(data, formato = 'HH:mm') {
        try {
            return data ? moment(data).format(formato) : ''            
        } catch (error) {
            return data
        }
    },    

    getDataPorExtenso(data, formato = 'LL') {
        try {
            return data ? moment(data).format(formato) : ''            
        } catch (error) {
            return data
        }
    },    

    getTempoRestante(timeStampExp) {
        const difference = new Date(timeStampExp) - new Date()
        let remaining = ''

        if (difference > 0) {
            const parts = {
                dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
                horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutos: Math.floor((difference / 1000 / 60) % 60),
                segundos: Math.floor((difference / 1000) % 60),
            }
            remaining = Object.keys(parts)
                .filter(part => parts[part] > 0)
                .map(part => `${parts[part]} ${part}`).join(" ")
        }
        return remaining
    },
}