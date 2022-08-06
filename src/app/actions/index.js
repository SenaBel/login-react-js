import moment from 'moment';

export const transformeDate = (data, divisor, formato) => {
    const _data = data.split(divisor)
    const dia = Number( _data[0]) + 1
    const mes = Number( _data[1]) - 1
    const ano = Number( _data[2] )
    return moment(new Date(ano, mes, dia)).format(formato);
}