import { Model } from '@vuex-orm/core';
import { uuidv4 } from '@/utils/helpers';
import Invoice from '@/store/models/invoice';
import InvoiceRowTax from '@/store/models/invoice-row-tax';
import config from '@/config/app.config';

export default class InvoiceRow extends Model {
  // This is the name used as module name of the Vuex Store.
  static entity = 'invoice_rows';

  static fields() {
    const model = {
      id: this.attr(() => uuidv4()),
      invoice_id: this.attr(null),
      invoice: this.belongsTo(Invoice, 'invoice_id'),
      quantity: this.attr(null),
      price: this.attr(null),
      order: this.attr(null),
      taxes: this.hasMany(InvoiceRowTax, 'row_id'),
      updated_at: this.attr(''),
      created_at: this.attr(''),
    };
    config.invoice.columns.forEach((col) => {
      if (col.type === Number) model[col.id] = this.attr(null);
      else model[col.id] = this.attr('');
    });
    return model;
  }
}
