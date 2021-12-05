<template>
    <tfoot>
    <tr class="text-right">
        <td :colspan="colspan">{{ $t('subtotal') }}</td>
        <td>{{ invoice.subTotal | currency }}</td>
    </tr>
    <tr class="text-right" v-for="tax in invoice.taxes" :key="tax.label">
        <td :colspan="colspan">
            {{ tax.label }} ({{ tax.rate }}%)
        </td>
        <td>{{ tax.total | currency }}</td>
    </tr>
    <tr class="text-right">
        <th :colspan="colspan">
            {{ $t('total') }}
            <AppEditable :value="invoice.currency"
                         :errors="errors"
                         field="currency"
                         :placeholder="$t('add_currency')"
                         @change="updateProp({ currency: $event })"/>
        </th>
        <th class="text-nowrap">{{ invoice.total | currency }}</th>
    </tr>
    <tr>
      <td :colspan="colspan + 2" class="text-center">
          <div class="text-capitalize"> <span class="font-weight-bold mr-2">{{ $t("rupees") }}:</span> <u>{{toWords(invoice.total)}} Only</u></div>
      </td>
    </tr>
    </tfoot>
</template>
<script>
import config from '@/config/app.config';
import { mapGetters } from 'vuex';
import { toWords } from 'number-to-words';
import AppEditable from '../form/AppEditable';
import { formatDate } from '../../filters/date.filter';
import { formatCurrency } from '../../filters/currency.filter';

export default {
  i18nOptions: { namespaces: 'invoice-totals' },
  props: ['invoice', 'errors'],
  components: {
    AppEditable,
  },
  filters: {
    date: formatDate,
    currency: formatCurrency,
  },
  computed: {
    ...mapGetters({
      taxes: 'invoiceRows/taxes',
    }),
    colspan() {
      let count = this.columnCount;
      if (config.invoice.showTaxCols) count += this.taxes.length;
      return count;
    },
    columnCount() {
      return config.invoice.columns.length;
    },
  },
  methods: {
    toWords: toWords,
    updateProp(props) {
      this.$emit('update', props);
    },
  },
};
</script>
