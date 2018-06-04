export const navItems = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  // user management
  {
    name: 'Staff Management',
    url: 'staff-management',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Staff Role',
        url: 'staff-management/staffrole',
        icon: 'icon-puzzle'
      },
      {
        name: 'Staff List',
        url: 'staff-management/stafflist',
        icon: 'icon-puzzle'
      }
     
      
    ]
  },
  // menu management

   {
    name: 'Food/Beverages',
    url: 'food',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Brands',
        url: 'food/brands',
        icon: 'icon-puzzle'
      },
      {
        name: 'Categories',
        url:  'food/categories',
        icon: 'icon-puzzle'
      },
      {
        name: 'Items',
        url: 'food/items',
        icon: 'icon-puzzle'
      },
      {
        name: 'My Bar Price',
        url: 'food/my-bar-price',
        icon: 'icon-puzzle'
      },
      
      
    ]
  },
  // order management

   {
    name: 'Order Management',
    url: 'order',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Order List',
        url: 'order/order-list',
        icon: 'icon-puzzle'
      },
      {
        name: 'Print Bill',
        url: 'order/print-bill',
        icon: 'icon-puzzle'
      }
      
      
    ]
  },
  // GIFT management

   {
    name: 'Gift Master',
    url: '/gift',
    icon: 'icon-puzzle',
    // children: [
    //   {
    //     name: 'Create Gift Card',
    //     url: '/gift/create-card',
    //     icon: 'icon-puzzle'
    //   },
    //   {
    //     name: 'View Gift Card',
    //     url: '/gift/view-card',
    //     icon: 'icon-puzzle'
    //   },
    //   {
    //     name: 'View Gift Card',
    //     url: '/gift/view-card',
    //     icon: 'icon-puzzle'
    //   },
      
      
    // ]
  },

  // Tax management

   {
    name: 'Vouchers',
    url: 'vouchers',
    icon: 'icon-puzzle',
    // children: [
    //   {
    //     name: 'Vouchers List',
    //     url: 'voucher/vouchers-list',
    //     icon: 'icon-puzzle'
    //   },
    // ]
  },
  // Tax management

   {
    name: 'Tax Management',
    url: '/tax',
    icon: 'icon-puzzle',
    // children: [
    //   {
    //     name: 'Add Tax Pricing',
    //     url: '/tax/tax-pricing',
    //     icon: 'icon-puzzle'
    //   },
    // ]
  },
  {
    name: 'Table Management',
    url: 'table-management',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'View Tables',
        url: 'table-management/view-tables',
        icon: 'icon-puzzle'
      },
    ]
  },

  // KITCHEN management

   {
    name: 'Kitchen Management',
    url: '/kitchen',
    icon: 'icon-puzzle',
    // children: [
    //   {
    //     name: 'Add Kitchen',
    //     url: '/kitchen/add-kitchen',
    //     icon: 'icon-puzzle'
    //   },
    //   {
    //     name: 'View Kitchen',
    //     url: '/kitchen/view-kitchen',
    //     icon: 'icon-puzzle'
    //   },
    // ]
  },
  // REPORTS MANAGEMENT

   {
    name: 'Reports',
    url: '/reports',
    icon: 'icon-puzzle',
    // children: [
    //   {
    //     name: 'Order Report',
    //     url: '/reports/order-report',
    //     icon: 'icon-puzzle'
    //   },
    //   {
    //     name: 'Product Sale Reports',
    //     url: '/reports/sale-reports',
    //     icon: 'icon-puzzle'
    //   },
    //   {
    //     name: 'Custom Reports',
    //     url: '/reports/custom-reports',
    //     icon: 'icon-puzzle'
    //   },
    // ]
  },
  // system admin
  {
    name: 'Settings',
    url: '/settings',
    icon: 'icon-puzzle',
    // children: [
    //   {
    //     name: 'Manage User',
    //     url: '/system/manage-user',
    //     icon: 'icon-puzzle'
    //   },
    //   {
    //     name: 'Set Rules',
    //     url: '/system/set-rules',
    //     icon: 'icon-puzzle'
    //   },
      
    // ]
  },
  
];
