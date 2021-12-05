<template>
    <div>
        <div class="font-weight-bold mb-5">{{ $t("for") }} {{invoice.from_name}}</div>
        <div>{{ $t('proprietor') }}</div>
    </div>
</template>
<script>
export default {
  i18nOptions: { namespaces: 'invoice-proprietor' },
  props: ['invoice', 'errors'],
};
</script>
