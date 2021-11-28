<template>
    <div class="row">
        <div class="col-12 scrollbar invoice-container">
            <div class="card bg-base dp--02 invoice-box" v-if="invoice">
                <div class="card-body">
                    <div class="row mb-5" v-if="showLogo">
                        <TeamLogo class="col-12 text-center" :errors="errors"/>
                    </div>
                    <div class="row mb-5">
                      <InvoiceCompanyDetails :invoice="invoice" :errors="errors" @update="updateProp"
                                               class="col-12 text-center"/>
                    </div>
                    <hr/>
                    <div class="row">
                        <InvoiceClientDetails :invoice="invoice" :errors="errors" @update="updateProp"
                                              class="col-6"/>
                        <InvoiceHeader :invoice="invoice" :errors="errors" @update="updateProp"
                                       class="col-6 text-right"/>
                    </div>
                    <div class="row mt-3">
                        <AppEditable :value="invoice.notes"
                                     class="col-12"
                                     :placeholder="$t('insert_note')"
                                     @change="updateProp({ notes: $event })"/>
                    </div>
                    <div class="row">
                        <table class="table" :class="{'invoice__rows--compact': invoice.is_compact}" style="width:100%">
                            <InvoiceRowsHeader :invoice="invoice"/>
                            <tbody>
                            <InvoiceRow v-for="(row, index) in invoice.rows" :errors="errors"
                                        :row="row" :index="index" :key="row.id"/>
                            <InvoiceAddRowBtn :invoice="invoice" :errors="errors"/>
                            </tbody>
                            <InvoiceTotals :invoice="invoice" :errors="errors" @update="updateProp"/>
                        </table>
                    </div>
                    <hr>
                    <div class="row">
                        <InvoiceBankDetails :invoice="invoice" :errors="errors" @update="updateProp"
                                            class="col-8"/>
                        <InvoiceContactDetails :invoice="invoice" :errors="errors" @update="updateProp"
                                               class="col-4 text-right"/>
                    </div>
                    <div class="row">
                      <InvoiceTermsAndConditions :invoice="invoice" :errors="errors" @update="updateProp"
                                               class="col-6 text-left"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import config from '@/config/app.config';
import { mapGetters, mapState } from 'vuex';
import InvoiceRow from '@/components/invoices/InvoiceRow';
import InvoiceClientDetails from '@/components/invoices/InvoiceClientDetails';
import InvoiceCompanyDetails from '@/components/invoices/InvoiceCompanyDetails';
import InvoiceBankDetails from '@/components/invoices/InvoiceBankDetails';
import InvoiceContactDetails from '@/components/invoices/InvoiceContactDetails';
import InvoiceHeader from '@/components/invoices/InvoiceHeader';
import InvoiceTotals from '@/components/invoices/InvoiceTotals';
import AppEditable from '@/components/form/AppEditable';
import TeamLogo from '@/components/team/TeamLogo';
import InvoiceRowsHeader from '@/components/invoices/InvoiceRowsHeader';
import InvoiceAddRowBtn from '@/components/invoices/InvoiceAddRowBtn';
import InvoiceTermsAndConditions from '@/components/invoices/InvoiceTermsAndConditions';


export default {
  i18nOptions: { namespaces: 'invoice-form' },
  components: {
    InvoiceAddRowBtn,
    TeamLogo,
    InvoiceTotals,
    InvoiceHeader,
    InvoiceContactDetails,
    InvoiceBankDetails,
    InvoiceCompanyDetails,
    InvoiceRow,
    InvoiceRowsHeader,
    InvoiceClientDetails,
    AppEditable,
    InvoiceTermsAndConditions,
  },
  computed: {
    ...mapState({
      errors: state => state.invoices.errors,
    }),
    ...mapGetters({
      invoice: 'invoices/invoice',
    }),
    showLogo() {
      return config.invoice.showLogo;
    },
  },
  watch: {
    '$route.params.id'() {
      this.getInvoice();
    },
  },
  created() {
    this.getInvoice();
  },
  methods: {
    getInvoice() {
      this.$store.dispatch('invoices/getInvoice', this.$route.params.id);
    },
    updateProp(props) {
      this.$store.dispatch('invoices/updateInvoice', {
        props,
        invoiceId: this.invoice.id,
      });
    },
  },
};
</script>
