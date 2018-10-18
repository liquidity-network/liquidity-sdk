import Filter from '../models/filter';
export default class Invoices {
    static generate(amount: any, details: any, currency: any): any;
    static list(filters: Filter): any[];
}
