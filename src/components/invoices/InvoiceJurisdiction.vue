<template>
    <div>{{ $t('subject_to') }} {{invoice.from_city}} {{$t('jurisdiction')}}</div>
</template>
<script>
export default {
  i18nOptions: { namespaces: 'invoice-jurisdiction' },
  props: ['invoice', 'errors'],
};
</script>
