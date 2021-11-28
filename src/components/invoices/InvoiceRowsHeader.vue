<template>
    <thead>
        <tr>
            <th v-for="col in columns" :key="col.id" :style="`width: ${unit_width * col.width}%`">{{ $t(col.name) }}</th>
            <template v-if="showTaxCols">
              <th v-for="tax in taxes" :key="tax.id">
                  {{ tax.label }} %
              </th>
            </template>
            <th class="text-right">{{ $t('sum') }}</th>
        </tr>
    </thead>
</template>

<script>
import config from '@/config/app.config';
import { mapGetters } from 'vuex';

export default {
  i18nOptions: { namespaces: 'invoice-rows-header' },
  computed: {
    ...mapGetters({
      taxes: 'invoiceRows/taxes',
    }),
    showTaxCols() {
      return config.invoice.showTaxCols;
    },
    columns() {
      return config.invoice.columns;
    },
    unit_width() {
      let total_width = config.invoice.columns.reduce((total, col) => total + col.width, 0) + 1;
      if (this.showTaxCols) total_width += 1;
      const unit_width = 100 / total_width;
      return unit_width;
    },
  },
};
</script>
