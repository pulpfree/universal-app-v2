const customers = [
  {
    _id: '5bdb5316ea79e149059c131c',
    name: {
      first: 'Eric',
      last: 'DeBoer',
      spouse: 'Sara',
    },
    active: true,
    email: 'eric.deboer@live.com',
    phones: [
      {
        countryCode: '1',
        _id: 'mobile',
        number: '(905) 932-7545',
      },
    ],
    createdAt: '2018-11-01T19:25:10.754Z',
    updatedAt: '2018-11-01T19:25:10.754Z',
    __v: 0,
    address: {
      _id: '5bdb5316ea79e16cb49c131b',
      associate: 'customer',
      city: 'Fonthill',
      postalCode: 'L0S1E1',
      provinceCode: 'ON',
      street1: '39 Milbridge Cr',
      type: 'res',
      customerID: '5bdb5316ea79e149059c131c',
      createdAt: '2018-11-01T19:25:10.756Z',
      updatedAt: '2018-11-01T19:25:10.756Z',
      __v: 0,
    },
  },
  {
    _id: '5bb4e9caea79e1001f9c11be',
    name: {
      first: 'Michelle',
      last: 'DeJong',
      spouse: null,
    },
    active: true,
    email: 'mvdesignss@gmail.com',
    phones: [
      {
        countryCode: '1',
        _id: 'mobile',
        number: '(289) 241-3974',
      },
    ],
    createdAt: '2018-10-03T16:09:46.478Z',
    updatedAt: '2018-10-03T16:13:38.725Z',
    __v: 0,
    address: {
      _id: '5bb4e9caea79e191b89c11bd',
      associate: 'customer',
      city: 'Fonthill',
      postalCode: 'L0S1E0',
      provinceCode: 'ON',
      street1: '60 Hwy 20',
      type: 'res',
      customerID: '5bb4e9caea79e1001f9c11be',
      createdAt: '2018-10-03T16:09:46.480Z',
      updatedAt: '2018-10-03T16:09:46.480Z',
      __v: 0,
    },
  },
  {
    _id: '5b60fd56cf258517fcec1cf6',
    name: {
      first: 'Barb',
      last: 'DeSimone',
      spouse: null,
    },
    active: true,
    email: 'vinnie_d@hotmail.ca',
    phones: [
      {
        countryCode: '1',
        _id: 'home',
        number: '(905) 662-7695',
      },
    ],
    createdAt: '2018-08-01T00:22:46.416Z',
    updatedAt: '2018-08-01T00:22:46.416Z',
    __v: 0,
    address: {
      _id: '5b60fd56cf25850e56ec1cf5',
      associate: 'customer',
      city: 'Stoney Creek',
      postalCode: 'L8J3K4',
      provinceCode: 'ON',
      street1: '126 Taplytown rd',
      type: 'res',
      customerID: '5b60fd56cf258517fcec1cf6',
      createdAt: '2018-08-01T00:22:46.419Z',
      updatedAt: '2018-08-01T00:22:46.419Z',
      __v: 0,
    },
  },
  {
    _id: '5b2833262aac04da9f7ec118',
    name: {
      first: 'Patricia',
      last: 'DeSouza',
      spouse: 'Sabastian',
    },
    active: true,
    email: 'donkey_pm@hotmail.com',
    phones: [
      {
        countryCode: '1',
        _id: 'mobile',
        number: '(905) 409-9475',
      },
    ],
    createdAt: '2018-06-18T22:33:10.131Z',
    updatedAt: '2018-06-18T22:33:10.131Z',
    __v: 0,
    address: {
      _id: '5b2833262aac047e1f7ec117',
      associate: 'customer',
      city: 'Welland',
      postalCode: 'L3B4M5',
      provinceCode: 'ON',
      street1: '80 Park St',
      type: 'res',
      customerID: '5b2833262aac04da9f7ec118',
      createdAt: '2018-06-18T22:33:10.133Z',
      updatedAt: '2018-06-18T22:33:10.133Z',
      __v: 0,
    },
  },
  {
    _id: '5bca1cb8ea79e1f4a99c125f',
    name: {
      first: 'Peter',
      last: 'Deak',
      spouse: null,
    },
    active: true,
    email: 'quixonconstruction@gmail.com',
    phones: [
      {
        countryCode: '1',
        _id: 'mobile',
        number: '(416) 878-2823',
      },
    ],
    createdAt: '2018-10-19T18:04:40.590Z',
    updatedAt: '2018-10-19T18:04:40.590Z',
    __v: 0,
    address: {
      _id: '5bca1cb8ea79e16e3f9c125e',
      associate: 'customer',
      city: 'Fonthill',
      postalCode: 'L0S1E1',
      provinceCode: 'ON',
      street1: '6 Spuceside Cr',
      type: 'res',
      customerID: '5bca1cb8ea79e1f4a99c125f',
      createdAt: '2018-10-19T18:04:40.592Z',
      updatedAt: '2018-10-19T18:04:40.592Z',
      __v: 0,
    },
  },
  {
    _id: '5be739c3ea79e1655e9c137f',
    name: {
      first: 'Jerry',
      last: 'Denhollander',
      spouse: 'Karen',
    },
    active: true,
    email: 'gkdenhollander@gmail.com',
    phones: [
      {
        countryCode: '1',
        _id: 'home',
        number: '(905) 957-6550',
      },
    ],
    createdAt: '2018-11-10T20:04:19.243Z',
    updatedAt: '2018-11-10T20:04:19.243Z',
    __v: 0,
    address: {
      _id: '5be739c3ea79e105a79c137e',
      associate: 'customer',
      city: 'Smithville',
      postalCode: 'L0R2A0',
      provinceCode: 'ON',
      street1: '20 Alma Dr',
      type: 'res',
      customerID: '5be739c3ea79e1655e9c137f',
      createdAt: '2018-11-10T20:04:19.245Z',
      updatedAt: '2018-11-10T20:04:19.245Z',
      __v: 0,
    },
  },
  {
    _id: '5b2122022aac043b0c7ec06d',
    name: {
      first: 'Charissa ',
      last: 'DiMarco',
      spouse: null,
    },
    active: true,
    email: 'ron@webbtech.net',
    phones: [
      {
        countryCode: '1',
        _id: 'home',
        number: '(905) 687-0000',
      },
    ],
    createdAt: '2018-06-13T13:54:10.356Z',
    updatedAt: '2018-06-13T13:54:10.356Z',
    __v: 0,
    address: {
      _id: '5b2122022aac0404227ec06c',
      associate: 'customer',
      city: 'Hamilton',
      postalCode: 'L3L3L3',
      provinceCode: 'ON',
      street1: 'Hamilton St',
      type: 'res',
      customerID: '5b2122022aac043b0c7ec06d',
      createdAt: '2018-06-13T13:54:10.358Z',
      updatedAt: '2018-06-13T13:54:10.358Z',
      __v: 0,
    },
  },
  {
    _id: '5bcb2a12ea79e14e669c1267',
    name: {
      first: 'Angela',
      last: 'DiMartino',
      spouse: null,
    },
    active: true,
    email: 'angela_12@hotmail.com',
    phones: [
      {
        countryCode: '1',
        _id: 'mobile',
        number: '(905) 932-3628',
      },
    ],
    createdAt: '2018-10-20T13:13:54.586Z',
    updatedAt: '2018-10-20T13:13:54.586Z',
    __v: 0,
    address: {
      _id: '5bcb2a12ea79e126509c1266',
      associate: 'customer',
      city: 'Niagara Falls',
      postalCode: 'L2H2S6',
      provinceCode: 'ON',
      street1: '6957 Fairfield Pl',
      type: 'res',
      customerID: '5bcb2a12ea79e14e669c1267',
      createdAt: '2018-10-20T13:13:54.588Z',
      updatedAt: '2018-10-20T13:13:54.588Z',
      __v: 0,
    },
  },
  {
    _id: '5b3f6e11cf2585b115ec1baa',
    name: {
      first: 'Jodi',
      last: 'DiMattia',
      spouse: 'Rob',
    },
    active: true,
    email: 'jldimattia@hotmail.com',
    phones: [
      {
        countryCode: '1',
        _id: 'home',
        number: '(905) 714-4338',
      },
      {
        countryCode: '1',
        _id: 'mobile',
        number: '(905) 732-8146',
      },
    ],
    createdAt: '2018-07-06T13:26:41.119Z',
    updatedAt: '2018-07-06T13:26:41.119Z',
    __v: 0,
    address: {
      _id: '5b3f6e11cf258567a7ec1ba9',
      associate: 'customer',
      city: 'Welland',
      postalCode: 'L3C7G7',
      provinceCode: 'ON',
      street1: '178 Cedar Park Dr',
      type: 'res',
      customerID: '5b3f6e11cf2585b115ec1baa',
      createdAt: '2018-07-06T13:26:41.121Z',
      updatedAt: '2018-07-06T13:26:41.121Z',
      __v: 0,
    },
  },
  {
    _id: '5b3295afe730a4f728b6adb0',
    name: {
      first: 'Mike',
      last: 'DiMattio',
      spouse: 'Lou',
    },
    active: true,
    email: 'ldimattio@yahoo.com',
    phones: [
      {
        countryCode: '1',
        _id: 'home',
        number: '(905) 735-0193',
      },
    ],
    createdAt: '2018-06-26T19:36:15.424Z',
    updatedAt: '2018-06-26T19:36:15.424Z',
    __v: 0,
    address: {
      _id: '5b3295afe730a44108b6adaf',
      associate: 'customer',
      city: 'Welland',
      postalCode: 'L3C7B2',
      provinceCode: 'ON',
      street1: '110 Colbec dr',
      type: 'res',
      customerID: '5b3295afe730a4f728b6adb0',
      createdAt: '2018-06-26T19:36:15.427Z',
      updatedAt: '2018-06-26T19:36:15.427Z',
      __v: 0,
    },
  },
  {
    _id: '5bb3fa92ea79e1bf799c11a7',
    name: {
      first: 'Jeff',
      last: 'Disher',
      spouse: null,
    },
    active: true,
    email: 'jdisher4@cogeco.ca',
    phones: [
      {
        countryCode: '1',
        _id: 'mobile',
        number: '(905) 328-6777',
      },
    ],
    createdAt: '2018-10-02T23:09:06.498Z',
    updatedAt: '2018-10-02T23:09:06.498Z',
    __v: 0,
    address: {
      _id: '5bb3fa92ea79e1eb609c11a6',
      associate: 'customer',
      city: 'Welland',
      postalCode: 'L3C3C9',
      provinceCode: 'ON',
      street1: '731 South pelham Rd',
      type: 'res',
      customerID: '5bb3fa92ea79e1bf799c11a7',
      createdAt: '2018-10-02T23:09:06.501Z',
      updatedAt: '2018-10-02T23:09:06.501Z',
      __v: 0,
    },
  },
  {
    _id: '5b980fddcf2585159aec1f65',
    name: {
      first: 'Heather',
      last: 'Dolan',
      spouse: 'Dave',
    },
    active: true,
    email: 'heather56789@hotmail.com',
    phones: [
      {
        countryCode: '1',
        _id: 'mobile',
        number: '(289) 697-4873',
      },
    ],
    createdAt: '2018-09-11T18:56:29.278Z',
    updatedAt: '2018-09-11T18:56:29.278Z',
    __v: 0,
    address: {
      _id: '5b980fddcf2585a85cec1f64',
      associate: 'customer',
      city: 'Welland',
      postalCode: 'L3B3N8',
      provinceCode: 'ON',
      street1: '16 Kingway Ave',
      type: 'res',
      customerID: '5b980fddcf2585159aec1f65',
      createdAt: '2018-09-11T18:56:29.280Z',
      updatedAt: '2018-09-11T18:56:29.280Z',
      __v: 0,
    },
  },
  {
    _id: '5c313639ea79e1eaf29c1446',
    name: {
      first: 'Test',
      last: 'Dummy',
      spouse: null,
    },
    active: true,
    phones: [
      {
        countryCode: '1',
        _id: 'mobile',
        number: '(289) 456-7890',
      },
    ],
    createdAt: '2019-01-05T22:56:57.213Z',
    updatedAt: '2019-01-05T22:56:57.213Z',
    __v: 0,
    address: {
      _id: '5c313639ea79e1416a9c1445',
      associate: 'customer',
      city: 'Someplace',
      postalCode: 'A2B C2D',
      provinceCode: 'ON',
      street1: '123 Street St',
      type: 'res',
      customerID: '5c313639ea79e1eaf29c1446',
      createdAt: '2019-01-05T22:56:57.215Z',
      updatedAt: '2019-01-05T22:56:57.215Z',
      __v: 0,
    },
  },
  {
    _id: '5ba7b078ea79e107ac9c10d3',
    name: {
      first: 'Gerry',
      last: 'D’Angelo',
      spouse: 'Bonnie',
    },
    active: true,
    email: 'bonniedng114@yahoo.ca',
    phones: [
      {
        countryCode: '1',
        _id: 'mobile',
        number: '(905) 380-7494',
      },
    ],
    createdAt: '2018-09-23T15:25:44.989Z',
    updatedAt: '2018-09-23T15:25:44.989Z',
    __v: 0,
    address: {
      _id: '5ba7b078ea79e1cc1d9c10d2',
      associate: 'customer',
      city: 'Welland',
      postalCode: 'L3C6R6',
      provinceCode: 'ON',
      street1: '23 Silverstar Crt',
      type: 'res',
      customerID: '5ba7b078ea79e107ac9c10d3',
      createdAt: '2018-09-23T15:25:45.000Z',
      updatedAt: '2018-09-23T15:25:45.000Z',
      __v: 0,
    },
  },
]

const customerInfo = {
  _id: '5c169d2cea79e176299c141d',
  name: {
    first: 'Christine',
    last: 'Punyi',
    spouse: null,
  },
  active: true,
  email: 'cpunyi@live.ca',
  phones: [
    {
      countryCode: '1',
      _id: 'mobile',
      number: '(905) 988-7331',
    },
  ],
  address: {
    _id: '5c169d2cea79e141799c141c',
    associate: 'customer',
    city: 'Niagara Falls',
    postalCode: 'L2J1K8',
    provinceCode: 'ON',
    street1: '5753 Vine St',
    type: 'res',
  },
}

const quotes = [
  {
    discount: {
      tax: null,
      subtotal: null,
      total: null,
    },
    items: {
      group: [],
      other: [],
      window: [
        '5b2109212aac0441887ec067',
        '5b2109482aac04234c7ec068',
        '5b2109f52aac0483337ec069',
      ],
    },
    itemCosts: {
      group: 0,
      other: 0,
      window: 8930,
      subtotal: 8930,
    },
    itemSummary: {
      window: {
        items: [
          {
            specs: {
              installType: null,
              name: 'Awning',
              options: 'White: Low E & Argon Gas (dark)\n',
              productID: '57855061982d822a04b760a3',
            },
            qty: 1,
            costs: {
              discountAmount: 0,
              discounted: 0,
              extendTotal: 1280,
              extendUnit: 1280,
              netUnit: 1280,
            },
            rooms: '',
          },
          {
            specs: {
              installType: null,
              name: 'French Slider Tilt',
              options: 'White: Low E & Argon Gas (dark)\n',
              productID: '57855061982d822a04b760a5',
            },
            qty: 5,
            costs: {
              discountAmount: 0,
              discounted: 0,
              extendTotal: 6500,
              extendUnit: 1300,
              netUnit: 1300,
            },
            rooms: 'BR',
          },
          {
            specs: {
              installType: null,
              name: 'French Slider Tilt',
              options: 'White: Low E & Argon Gas (dark)\n',
              productID: '57855061982d822a04b760a5',
            },
            qty: 1,
            costs: {
              discountAmount: 0,
              discounted: 0,
              extendTotal: 1150,
              extendUnit: 1150,
              netUnit: 1150,
            },
            rooms: 'BR',
          },
        ],
        totals: {
          extendTotal: 8930,
        },
      },
      group: {
        items: [],
        totals: {
          extendTotal: 0,
        },
      },
      other: {
        items: [],
        totals: {
          extendTotal: 0,
        },
      },
    },
    quotePrice: {
      subtotal: 7902.654867256638,
      tax: 1027.3451327433622,
      total: 8930,
      outstanding: 7430,
      payments: 1500,
    },
    closed: false,
    invoiced: true,
    pdfCreated: false,
    version: 1,
    _id: '5b8169aacf2585816cec1e64',
    customerID: '5b1846c62aac040faf7ebfe7',
    features: null,
    jobsheetID: '5b2108b02aac0457197ec066',
    number: 1189,
    createdAt: '2018-08-25T14:37:30.787Z',
    updatedAt: '2018-08-25T14:40:20.944Z',
    __v: 0,
  },
  {
    discount: {
      tax: null,
      subtotal: null,
      total: null,
    },
    items: {
      group: [],
      other: [],
      window: [
        '5b2109212aac0441887ec067',
        '5b2109482aac04234c7ec068',
        '5b2109f52aac0483337ec069',
      ],
    },
    itemCosts: {
      group: 0,
      other: 0,
      window: 8930,
      subtotal: 8930,
    },
    itemSummary: {
      window: {
        items: [
          {
            specs: {
              installType: null,
              name: 'Awning',
              options: 'White: Low E & Argon Gas (dark)\n',
              productID: '57855061982d822a04b760a3',
            },
            qty: 1,
            costs: {
              discountAmount: 0,
              discounted: 0,
              extendTotal: 1280,
              extendUnit: 1280,
              netUnit: 1280,
            },
            rooms: '',
          },
          {
            specs: {
              installType: null,
              name: 'French Slider Tilt',
              options: 'White: Low E & Argon Gas (dark)\n',
              productID: '57855061982d822a04b760a5',
            },
            qty: 5,
            costs: {
              discountAmount: 0,
              discounted: 0,
              extendTotal: 6500,
              extendUnit: 1300,
              netUnit: 1300,
            },
            rooms: 'BR',
          },
          {
            specs: {
              installType: null,
              name: 'French Slider Tilt',
              options: 'White: Low E & Argon Gas (dark)\n',
              productID: '57855061982d822a04b760a5',
            },
            qty: 1,
            costs: {
              discountAmount: 0,
              discounted: 0,
              extendTotal: 1150,
              extendUnit: 1150,
              netUnit: 1150,
            },
            rooms: 'BR',
          },
        ],
        totals: {
          extendTotal: 8930,
        },
      },
      group: {
        items: [],
        totals: {
          extendTotal: 0,
        },
      },
      other: {
        items: [],
        totals: {
          extendTotal: 0,
        },
      },
    },
    quotePrice: {
      subtotal: 7902.654867256638,
      tax: 1027.3451327433622,
      total: 8930,
    },
    closed: false,
    invoiced: false,
    pdfCreated: false,
    version: 1,
    _id: '5b2d7e9ae730a43163b6ad35',
    customerID: '5b1846c62aac040faf7ebfe7',
    features: null,
    jobsheetID: '5b2108b02aac0457197ec066',
    number: 1084,
    createdAt: '2018-06-22T22:56:26.769Z',
    updatedAt: '2018-06-22T22:56:26.769Z',
    __v: 0,
  },
  {
    discount: {
      description: null,
      discount: 120,
      subtotal: 7079.646017699116,
      tax: 920.3539823008841,
      total: 8000,
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
      group: 5650,
      other: 225,
      window: 2245,
      subtotal: 8120,
    },
    itemSummary: {
      window: {
        items: [
          {
            specs: {
              installType: null,
              name: 'Casement Left',
              options: 'White: Low E & Argon Gas (dark)\nColonial Bars\n',
              productID: '57855061982d822a04b760a1',
            },
            qty: 1,
            costs: {
              discountAmount: 0,
              discounted: 0,
              extendTotal: 1085,
              extendUnit: 1085,
              netUnit: 1085,
            },
            rooms: 'BR',
          },
          {
            specs: {
              installType: null,
              name: 'Casement Right',
              options: 'White: Low E & Argon Gas (dark)\nColonial Bars\n',
              productID: '57855061982d822a04b760a7',
            },
            qty: 1,
            costs: {
              discountAmount: 0,
              discounted: 0,
              extendTotal: 1160,
              extendUnit: 1160,
              netUnit: 1160,
            },
            rooms: 'BR',
          },
        ],
        totals: {
          extendTotal: 2245,
        },
      },
      group: {
        items: [
          {
            specs: {
              groupTypeID: '5799108994787d9d9173ab55',
              installType: null,
              name: '2 Casements, 1 Fixed',
              options: 'Pebble: Low E & Argon Gas (dark)\nColonial Bars\n',
            },
            qty: 1,
            costs: {
              discountAmount: null,
              discounted: 0,
              extendTotal: 2440,
              extendUnit: 2440,
              netUnit: 2440,
            },
            rooms: 'BR',
          },
          {
            specs: {
              groupTypeID: '579910e794787d9d9173ab56',
              installType: null,
              name: 'Bay Window, 2 Casements, Single Fixed',
              options: 'Pebble: Low E & Argon Gas (dark)\nColonial Bars\n',
            },
            qty: 1,
            costs: {
              discountAmount: null,
              discounted: 0,
              extendTotal: 3210,
              extendUnit: 3210,
              netUnit: 3210,
            },
            rooms: 'DR',
          },
        ],
        totals: {
          extendTotal: 5650,
        },
      },
      other: {
        items: [
          {
            description: 'Cap Garage Frame',
            qty: 1,
            specs: {
              options: 'Pebble Colour',
              location: 'Driveway',
            },
            costs: {
              extendTotal: 225,
              extendUnit: 225,
            },
          },
        ],
        totals: {
          extendTotal: 225,
        },
      },
    },
    quotePrice: {
      subtotal: 7079.646017699116,
      tax: 920.3539823008841,
      total: 8000,
      outstanding: 0,
      payments: 8000,
    },
    closed: true,
    invoiced: true,
    pdfCreated: false,
    version: 1,
    _id: '5b19e0c62aac0409e37ec013',
    customerID: '5b1846c62aac040faf7ebfe7',
    features: null,
    jobsheetID: '5b1846d52aac0450227ebfe9',
    number: 1051,
    createdAt: '2018-06-08T01:49:58.077Z',
    updatedAt: '2018-06-08T02:03:08.305Z',
    __v: 0,
  },
]

export { customers, customerInfo, quotes }
