<template>
    <div class="break-line">
      {{$t('terms')}}:
        <AppEditable :value="invoice.tnc"
                     :errors="errors"
                     field="tnc"
                     :placeholder="$t('add_tnc')"
                     @change="updateProp({ tnc: $event })"/>
    </div>
</template>
<script>
import AppEditable from '../form/AppEditable';

export default {
  i18nOptions: { namespaces: 'invoice-terms-and-conditions' },
  props: ['invoice', 'errors'],
  components: {
    AppEditable,
  },
  methods: {
    updateProp(props) {
      this.$emit('update', props);
    },
  },
};
</script>
