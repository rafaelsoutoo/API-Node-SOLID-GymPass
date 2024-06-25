export class MaxNumberCheckInsErro extends Error{
    constructor(){
        super('Max number of check-ins reached.')
    }
}