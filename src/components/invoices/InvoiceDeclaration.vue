<template>
    <div class="small">
      {{$t('declaration')}}:
        <AppEditable :value="invoice.declaration"
                     :errors="errors"
                     field="declaration"
                     :placeholder="$t('add_declaration')"
                     @change="updateProp({ declaration: $event })"/>
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
