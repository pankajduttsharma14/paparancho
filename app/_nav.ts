export const navItems = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    // badge: {
    //   variant: 'info',
    //   text: 'NEW'
    // }
  },
  // outlet
  // {
  //   name: 'Outlet Management',
  //   url: 'outlet-management',
  //   icon: 'icon-puzzle',
  //   children: [
  //     {
  //       name: 'Outlet List',
  //       url: 'outlet-management/outletlist',
  //       icon: 'icon-puzzle'
  //     },
      
  //    ]
  // },


  // user management
  {
    name: 'Staff Management',
    url: 'staff-management',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Staff Role List',
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
      // {
      //   name: 'Brands',
      //   url: 'food/brands',
      //   icon: 'icon-puzzle'
      // },
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
      // {
      //   name: 'My Bar Price',
      //   url: 'food/my-bar-price',
      //   icon: 'icon-puzzle'
      // },


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
      


    ]
  },
  
  // Voucher management

   {
    name: 'Vouchers',
    url: 'vouchers',
    icon: 'icon-puzzle',
    
  },
  // Tax management
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
   {
    name: 'Tax Management',
    url: 'tax',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Tax List',
        url: 'tax/tax-list',
        icon: 'icon-puzzle'
      },
    ]
  },
];
