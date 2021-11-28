// const wordpress = window.name ? JSON.parse(window.name) : { front_url: '', api_url: '', nonce: '' };

export default {
  storageType: 'local',
  // base_url: wordpress.front_url,
  // base_url: `${window.location.origin}${process.env.BASE_URL}`
  // api_url: wordpress.api_url,
  // api_nonce: wordpress.nonce,
  invoice: {
    columns: [
      {
        name: 'Date',
        id: 'date',
        type: Date,
        width: 2,
      },
      {
        id: 'ch_no',
        name: 'Ch. No',
        type: String,
        width: 1,
      },
      {
        id: 'truck_no',
        name: 'Truck No',
        type: String,
        width: 1.7,
      },
      {
        id: 'particulars',
        name: 'Particulars',
        type: String,
        width: 2,
      },
      {
        id: 'trip',
        name: 'Trip',
        type: String,
        width: 1,
      },
      {
        id: 'hsn_no',
        name: 'HSN No.',
        type: String,
        width: 1.3,
      },
      {
        id: 'measurement',
        name: 'Measurement',
        type: String,
        width: 2,
      },
      {
        id: 'quantity',
        name: 'Qty',
        type: Number,
        width: 1.5,
      },
      {
        id: 'price',
        name: 'Rate Per',
        type: Number,
        width: 1.5,
      },
    ],
    showTaxCols: false,
    showLogo: false,
    lateFee: false,
  },
};
