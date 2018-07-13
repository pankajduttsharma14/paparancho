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
    icon: 'icon-user',
    children: [
      {
        name: 'Staff Role List',
        url: 'staff-management/staffrole',
        icon: 'fa fa-angle-right'
      },
      {
        name: 'Staff List',
        url: 'staff-management/stafflist',
        icon: 'fa fa-angle-right'
      }


    ]
  },
  // menu management
{
    name: 'Food & Beverages',
    url: 'food',
    icon: 'fa fa-cutlery',
    children: [
      // {
      //   name: 'Brands',
      //   url: 'food/brands',
      //   icon: 'icon-puzzle'
      // },
      {
        name: 'Categories',
        url:  'food/categories',
        icon: 'fa fa-angle-right'
      },
      {
        name: 'Items',
        url: 'food/items',
        icon: 'fa fa-angle-right'
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
    icon: 'icon-basket-loaded',
    children: [
      {
        name: 'Order List',
        url: 'order/order-list',
        icon: 'fa fa-angle-right'
      },

      // {
      //   name: 'Outstanding Bills',
      //   url: 'order/outstanding-bills',
      //   icon: 'icon-puzzle'
      // },


    ]
  },
  
  // Voucher management

   {
    name: 'Vouchers',
    url: 'vouchers',
    icon: 'fa fa-gift',
    
  },
 
  // Tax management
  {
    name: 'Table Management',
    url: 'table-management',
    icon: 'icon-list',
    children: [
      {
        name: 'View Tables',
        url: 'table-management/view-tables',
        icon: 'fa fa-angle-right'
      },
    ]
  },
   {
    name: 'Tax Management',
    url: 'tax',
    icon: 'fa fa-money',
    children: [
      {
        name: 'Tax List',
        url: 'tax/tax-list',
        icon: 'fa fa-angle-right'
      },
    ]
  },
   {
    name: 'Reports',
    url: 'reports',
    icon: 'icon-graph',
    
  },
];
