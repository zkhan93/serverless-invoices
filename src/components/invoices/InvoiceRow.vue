<template>
    <tr>
        <td v-for="col in columns" :key="index + col.id">
          <AppEditable :value="row[col.id]"
                        :errors="errors"
                        :field="`rows.${index}.${col.id}`"
                        :placeholder="$t(`enter_${col.id}`)"
                        @change="updateProp(col, $event)"
                        style="display: flex"
                        />
        </td>
        <template v-if="showTaxCols">
          <td v-for="(tax, taxIndex) in row.taxes" :title="tax.label" :key="`${index}_tax_${tax.label}`" >
              <AppEditable v-if="tax.row_id"
                          :value="tax.value | currency"
                          :errors="errors"
                          :field="`rows.${index}.taxes.${taxIndex}.value`"
                          :placeholder="$t('enter_tax')"
                          @change="updateTaxProp({ value: $event }, tax)"
                          style="display: flex"
                          />
          </td>
        </template>
        <td class="text-right position-relative">
            {{ (row.quantity * row.price) | currency }}
            <button class="btn btn-sm d-print-none invoice__row-control"
                    @click="removeRow(row)">
                <i class="material-icons md-18 pointer">remove</i>
            </button>
        </td>
    </tr>
</template>

<script>
import config from '@/config/app.config';
import { formatCurrency } from '../../filters/currency.filter';
import AppEditable from '../form/AppEditable';

export default {
  props: ['row', 'errors', 'index'],
  name: 'InvoiceRow',
  i18nOptions: { namespaces: 'invoice-row' },
  components: {
    AppEditable,
  },
  filters: {
    currency: formatCurrency,
  },
  computed: {
    columns() { return config.invoice.columns; },
    showTaxCols() {
      return config.invoice.showTaxCols;
    },
  },
  methods: {
    updateProp(col, event) {
      const props = {};
      props[col.id] = event;
      this.$store.dispatch('invoiceRows/updateInvoiceRow', {
        props,
        id: this.row.id,
        invoiceId: this.row.invoice_id,
      });
    },
    updateTaxProp(props, tax) {
      this.$store.dispatch('invoiceRows/updateInvoiceRowTax', {
        props,
        invoiceId: this.row.invoice_id,
        taxId: tax.id,
      });
    },
    async removeRow(row) {
      await this.$store.dispatch('invoiceRows/removeRow', row.id);
      this.updateProp();
    },
  },
};
</script>
