const quote = {
  getQuote: {
    __typename: 'Quote',
    _id: '5b19e0c62aac0409e37ec013',
    number: 1051,
    version: 1,
    invoiced: true,
    closed: true,
    pdfCreated: false,
    customerID: {
      _id: '5b1846c62aac040faf7ebfe7',
      name: {
        first: 'Joe',
        last: 'DiMarco (test)',
      },
    },
    jobsheetID: {
      _id: '5b1846d52aac0450227ebfe9',
      addressID: {
        street1: '18 Chantler Rd',
        city: 'Welland',
      },
    },
    discount: {
      description: null,
      discount: 120.0,
      subtotal: 7079.646017699116,
      tax: 920.3539823008841,
      total: 8000.0,
    },
    items: {
      group: [
        '5b19df4a2aac04041e7ebff5',
        '5b195db0c2e75ffe21fdd0ed',
      ],
      other: [
        '5b19e00f2aac04230d7ec012',
      ],
      window: [
        '5b1847242aac0405487ebfea',
        '5b18474a2aac045b127ebfeb',
      ],
    },
    itemCosts: {
      group: 5650.0,
      other: 225.0,
      subtotal: 8120.0,
      window: 2245.0,
    },
    itemSummary: {
      group: {
        items: [
          {
            specs: '{"groupTypeID":"5799108994787d9d9173ab55","installType":null,"name":"2 Casements, 1 Fixed","options":"Pebble: Low E & Argon Gas (dark)\\nColonial Bars\\n"}',
            qty: 1,
            costs: {
              extendTotal: 2440.0,
              extendUnit: 2440.0,
              netUnit: 2440.0,
            },
            rooms: 'BR',
          },
          {
            specs: '{"groupTypeID":"579910e794787d9d9173ab56","installType":null,"name":"Bay Window, 2 Casements, Single Fixed","options":"Pebble: Low E & Argon Gas (dark)\\nColonial Bars\\n"}',
            qty: 1,
            costs: {
              extendTotal: 3210.0,
              extendUnit: 3210.0,
              netUnit: 3210.0,
            },
            rooms: 'DR',
          },
        ],
        totals: {
          extendTotal: 5650.0,
        },
      },
      other: {
        items: [
          {
            description: 'Cap Garage Frame',
            specs: '{"options":"Pebble Colour","location":"Driveway"}',
            qty: 1,
            costs: {
              extendTotal: 225.0,
              extendUnit: 225.0,
              netUnit: null,
            },
          },
        ],
        totals: {
          extendTotal: 225.0,
        },
      },
      window: {
        items: [
          {
            specs: '{"installType":null,"name":"Casement Left","options":"White: Low E & Argon Gas (dark)\\nColonial Bars\\n","productID":"57855061982d822a04b760a1"}',
            qty: 1,
            costs: {
              extendTotal: 1085.0,
              extendUnit: 1085.0,
              netUnit: 1085.0,
            },
            rooms: 'BR',
          },
          {
            specs: '{"installType":null,"name":"Casement Right","options":"White: Low E & Argon Gas (dark)\\nColonial Bars\\n","productID":"57855061982d822a04b760a7"}',
            qty: 1,
            costs: {
              extendTotal: 1160.0,
              extendUnit: 1160.0,
              netUnit: 1160.0,
            },
            rooms: 'BR',
          },
        ],
        totals: {
          extendTotal: 2245.0,
        },
      },
    },
    quotePrice: {
      outstanding: 0.0,
      payments: 8000.0,
      subtotal: 7079.646017699116,
      tax: 920.3539823008841,
      total: 8000.0,
    },
    createdAt: '2018-06-08T01:49:58.077Z',
    updatedAt: '2018-06-08T02:03:08.305Z',
  },
  getJobSheetData: {
    jobsheet: {
      _id: '5b1846d52aac0450227ebfe9',
      createdAt: '2018-06-06T20:40:53.405Z',
      updatedAt: '2018-06-08T01:48:36.019Z',
      features: 'A.C. Vinyl Windows (Darker)\nLow E & Argon Gas\nFull-frame Change \n2 3/4" Fingerjoint Trim\nAluminum Capping\nComplete Garbage Removal\nInstalled Including HST',
    },
    windows: [
      {
        _id: '5b1847242aac0405487ebfea',
        costs: {
          extendTotal: 1085.0,
          extendUnit: 1085.0,
          install: 300.0,
          installType: 200.0,
          netUnit: 1085.0,
          options: 60.0,
          trim: 75.0,
          window: 450.0,
        },
        dims: '{"height":{"overSize":null,"underSize":null,"decimal":52,"fraction":"","inch":52,"round":52},"width":{"overSize":null,"underSize":null,"decimal":31,"fraction":"","inch":31,"round":32}}',
        productID: '{"premium":{"cost":25,"oversizeLimit":12},"sizeCost":{"2":340,"3":340,"4":340,"5":350,"6":360,"7":375,"8":395,"9":405,"10":430,"11":445,"12":450,"18":0},"_id":"57855061982d822a04b760a1","maxHeight":60,"maxWidth":36,"minHeight":20,"minWidth":16,"name":"Casement Left","updatedAt":"2018-07-04T14:25:57.653Z"}',
        qty: 1,
        rooms: [
          'BR',
        ],
        specs: '{"overSize":0,"installType":null,"options":"White: Low E & Argon Gas (dark)\\nColonial Bars\\n","sqft":12,"trim":"B.M. & Interior \\"J\\"\\n2 3/4\\" F.J. Trim\\n"}',
      },
      {
        _id: '5b18474a2aac045b127ebfeb',
        costs: {
          extendTotal: 1160.0,
          extendUnit: 1160.0,
          install: 300.0,
          installType: 200.0,
          netUnit: 1160.0,
          options: 60.0,
          trim: 75.0,
          window: 525.0,
        },
        dims: '{"height":{"overSize":null,"underSize":null,"decimal":52,"fraction":"","inch":52,"round":52},"width":{"overSize":3,"underSize":null,"decimal":39,"fraction":"","inch":39,"round":40}}',
        productID: '{"premium":{"cost":25,"oversizeLimit":12},"sizeCost":{"2":340,"3":340,"4":340,"5":350,"6":360,"7":375,"8":395,"9":405,"10":430,"11":445,"12":450,"18":0},"_id":"57855061982d822a04b760a7","maxHeight":60,"maxWidth":36,"minHeight":20,"minWidth":16,"name":"Casement Right","updatedAt":"2018-07-04T14:25:57.655Z"}',
        qty: 1,
        rooms: [
          'BR',
        ],
        specs: '{"overSize":3,"installType":null,"options":"White: Low E & Argon Gas (dark)\\nColonial Bars\\n","sqft":15,"trim":"B.M. & Interior \\"J\\"\\n2 3/4\\" F.J. Trim\\n"}',
      },
    ],
    groups: [
      {
        _id: '5b1a6fe92aac0423f37ec022',
        costs: {
          extendTotal: 1830.0,
          extendUnit: 1830.0,
          install: 500.0,
          installType: 250.0,
          netUnit: 1830.0,
          options: 120.0,
          trim: 100.0,
          window: null,
        },
        dims: '{"height":{"diff":0,"inch":48,"decimal":48,"fraction":""},"width":{"diff":0,"inch":56,"decimal":56,"fraction":""}}',
        items: [
          '{"costs":{"extendUnit":430,"extendTotal":860},"dims":{"height":{"overSize":null,"underSize":null,"inch":48,"decimal":48,"round":48},"width":{"overSize":null,"underSize":null,"inch":28,"decimal":28,"round":28}},"specs":{"overSize":0,"sqft":10,"extendSqft":20},"_id":"5b1a6fe92aac048b0d7ec023","qty":2,"product":{"premium":{"cost":25,"oversizeLimit":12},"sizeCost":{"2":340,"3":340,"4":340,"5":350,"6":360,"7":375,"8":395,"9":405,"10":430,"11":445,"12":450,"18":0},"_id":"57855061982d822a04b760a8","maxHeight":72,"maxWidth":36,"minHeight":20,"minWidth":16,"name":"2 Casements (L & R)","updatedAt":"2018-07-04T14:25:57.662Z"},"productID":"57855061982d822a04b760a8","createdAt":"2018-06-08T11:59:51.846Z","updatedAt":"2018-06-08T11:59:51.846Z"}',
        ],
        qty: 1,
        rooms: [
          'BR',
        ],
        specs: '{"groupID":"5799108994787d9d9173ab54","groupType":{"_id":"5799108994787d9d9173ab54","name":"2 Casements","sort":10},"installType":null,"options":"White: Low E & Argon Gas (dark)\\nColonial Bars\\n","sqft":19,"style":null,"trim":"B.M. & Interior \\"J\\"\\n2 3/4\\" F.J. Trim\\n"}',
      },
      {
        _id: '5b1a70802aac04956a7ec029',
        costs: {
          extendTotal: 3950.0,
          extendUnit: 3950.0,
          install: 1000.0,
          installType: 500.0,
          netUnit: 3950.0,
          options: 250.0,
          trim: 500.0,
          window: null,
        },
        dims: '{"height":{"diff":-40,"inch":22,"decimal":22,"fraction":""},"width":{"diff":-80,"inch":22,"decimal":22,"fraction":""}}',
        items: [
          '{"costs":{"extendUnit":430,"extendTotal":860},"dims":{"height":{"overSize":null,"underSize":null,"inch":62,"decimal":62,"round":62},"width":{"overSize":null,"underSize":null,"inch":21,"decimal":21,"round":22}},"specs":{"overSize":0,"sqft":10,"extendSqft":20},"_id":"5b1a70802aac0461fb7ec02b","qty":2,"product":{"premium":{"cost":25,"oversizeLimit":12},"sizeCost":{"2":340,"3":340,"4":340,"5":350,"6":360,"7":375,"8":395,"9":405,"10":430,"11":445,"12":450,"18":0},"_id":"57855061982d822a04b760a8","maxHeight":72,"maxWidth":36,"minHeight":20,"minWidth":16,"name":"2 Casements (L & R)","updatedAt":"2018-07-04T14:25:57.662Z"},"productID":"57855061982d822a04b760a8","createdAt":"2018-06-08T12:02:09.515Z","updatedAt":"2018-06-08T12:02:09.515Z"}',
          '{"costs":{"extendUnit":280,"extendTotal":840},"dims":{"height":{"overSize":null,"underSize":null,"inch":62,"decimal":62,"round":62},"width":{"overSize":null,"underSize":null,"inch":20,"decimal":20,"round":20}},"specs":{"overSize":0,"sqft":9,"extendSqft":27},"_id":"5b1a70802aac0430eb7ec02a","qty":3,"product":{"premium":{"cost":25,"oversizeLimit":12},"sizeCost":{"2":220,"3":220,"4":220,"5":225,"6":235,"7":255,"8":270,"9":280,"10":295,"11":315,"12":320,"18":0},"_id":"57855061982d822a04b760a4","maxHeight":80,"maxWidth":86,"minHeight":15,"minWidth":14,"name":"Fixed","updatedAt":"2018-07-04T14:25:57.654Z"},"productID":"57855061982d822a04b760a4","createdAt":"2018-06-08T12:02:09.516Z","updatedAt":"2018-06-08T12:02:09.516Z"}',
        ],
        qty: 1,
        rooms: [
          'DR',
        ],
        specs: '{"groupID":"579910f894787d9d9173ab57","groupType":{"_id":"579910f894787d9d9173ab57","name":"Bow Window, 2 Casements, Single Fixed","sort":150},"installType":null,"options":"Pebble: Low E & Argon Gas (dark)\\nColonial Bars\\n","sqft":4,"style":null,"trim":"Reconstruct Outside B.M.\\n"}',
      },
      {
        _id: '5b19df4a2aac04041e7ebff5',
        costs: {
          extendTotal: 2010.0,
          extendUnit: 2010.0,
          install: 600.0,
          installType: 300.0,
          netUnit: 2010.0,
          options: 150.0,
          trim: 100.0,
          window: null,
        },
        dims: '{"height":{"diff":0,"inch":48,"decimal":48,"fraction":""},"width":{"diff":0,"inch":56,"decimal":56,"fraction":""}}',
        items: [
          '{"costs":{"extendUnit":430,"extendTotal":860},"dims":{"height":{"overSize":null,"underSize":null,"inch":48,"decimal":48,"round":48},"width":{"overSize":null,"underSize":null,"inch":28,"decimal":28,"round":28}},"specs":{"overSize":0,"sqft":10,"extendSqft":20},"_id":"5b1a6fbb2aac04c2e57ec021","qty":2,"product":{"premium":{"cost":25,"oversizeLimit":12},"sizeCost":{"2":340,"3":340,"4":340,"5":350,"6":360,"7":375,"8":395,"9":405,"10":430,"11":445,"12":450,"18":0},"_id":"57855061982d822a04b760a8","maxHeight":72,"maxWidth":36,"minHeight":20,"minWidth":16,"name":"2 Casements (L & R)","updatedAt":"2018-07-04T14:25:57.662Z"},"productID":"57855061982d822a04b760a8","createdAt":"2018-06-08T11:59:51.846Z","updatedAt":"2018-06-08T11:59:51.846Z"}',
        ],
        qty: 1,
        rooms: [
          'BR',
        ],
        specs: '{"groupID":"5799108994787d9d9173ab54","groupType":{"_id":"5799108994787d9d9173ab54","name":"2 Casements","sort":10},"installType":null,"options":"Pebble: Low E & Argon Gas (dark)\\nColonial Bars\\n","sqft":19,"style":null,"trim":"B.M. & Interior \\"J\\"\\n2 3/4\\" F.J. Trim\\n"}',
      },
      {
        _id: '5b195db0c2e75ffe21fdd0ed',
        costs: {
          extendTotal: 3450.0,
          extendUnit: 3450.0,
          install: 1000.0,
          installType: 500.0,
          netUnit: 3450.0,
          options: 150.0,
          trim: 100.0,
          window: null,
        },
        dims: '{"height":{"diff":-40,"inch":22,"decimal":22,"fraction":""},"width":{"diff":-80,"inch":22,"decimal":22,"fraction":""}}',
        items: [
          '{"costs":{"extendUnit":430,"extendTotal":860},"dims":{"height":{"overSize":null,"underSize":null,"inch":62,"decimal":62,"round":62},"width":{"overSize":null,"underSize":null,"inch":21,"decimal":21,"round":22}},"specs":{"overSize":0,"sqft":10,"extendSqft":20},"_id":"5b1a70452aac048edc7ec028","qty":2,"product":{"premium":{"cost":25,"oversizeLimit":12},"sizeCost":{"2":340,"3":340,"4":340,"5":350,"6":360,"7":375,"8":395,"9":405,"10":430,"11":445,"12":450,"18":0},"_id":"57855061982d822a04b760a8","maxHeight":72,"maxWidth":36,"minHeight":20,"minWidth":16,"name":"2 Casements (L & R)","updatedAt":"2018-07-04T14:25:57.662Z"},"productID":"57855061982d822a04b760a8","createdAt":"2018-06-08T12:02:09.515Z","updatedAt":"2018-06-08T12:02:09.515Z"}',
          '{"costs":{"extendUnit":280,"extendTotal":840},"dims":{"height":{"overSize":null,"underSize":null,"inch":62,"decimal":62,"round":62},"width":{"overSize":null,"underSize":null,"inch":20,"decimal":20,"round":20}},"specs":{"overSize":0,"sqft":9,"extendSqft":27},"_id":"5b1a70452aac048f427ec027","qty":3,"product":{"premium":{"cost":25,"oversizeLimit":12},"sizeCost":{"2":220,"3":220,"4":220,"5":225,"6":235,"7":255,"8":270,"9":280,"10":295,"11":315,"12":320,"18":0},"_id":"57855061982d822a04b760a4","maxHeight":80,"maxWidth":86,"minHeight":15,"minWidth":14,"name":"Fixed","updatedAt":"2018-07-04T14:25:57.654Z"},"productID":"57855061982d822a04b760a4","createdAt":"2018-06-08T12:02:09.516Z","updatedAt":"2018-06-08T12:02:09.516Z"}',
        ],
        qty: 1,
        rooms: [
          'DR',
        ],
        specs: '{"groupID":"579910f894787d9d9173ab57","groupType":{"_id":"579910f894787d9d9173ab57","name":"Bow Window, 2 Casements, Single Fixed","sort":150},"installType":null,"options":"Pebble: Low E & Argon Gas (dark)\\nColonial Bars\\n","sqft":4,"style":null,"trim":"B.M. & Interior \\"J\\"\\n2 3/4\\" F.J. Trim\\n"}',
      },
    ],
    other: [
      {
        _id: '5b19e00f2aac04230d7ec012',
        costs: {
          extendTotal: 225.0,
          extendUnit: 225.0,
        },
        description: 'Cap Garage Frame',
        qty: 1,
        rooms: [],
        specs: '{"options":"Pebble Colour","location":"Driveway"}',
        updatedAt: '2018-06-08T01:46:55.342Z',
        createdAt: '2018-06-08T01:46:55.342Z',
      },
    ],
  },
}

export default quote
