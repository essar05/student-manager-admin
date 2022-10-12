export interface ISidebarMenuItem {
  heading?: string
  name?: string
  icon?: string
  translate?: string
  path?: string
  label?: {
    value: string | number
    color: string
  }
  submenu?: ISidebarMenu
}

export interface ISidebarMenu extends Array<ISidebarMenuItem> {}

const Menu: ISidebarMenu = [
  {
    name: 'Clase',
    path: '/classes',
    icon: 'icon-grid',
  },

  {
    name: 'Debug',
    icon: 'icon-speedometer',
    label: { value: 4, color: 'info' },
    submenu: [
      {
        name: 'Welcome',
        path: '/welcome',
      },
      {
        name: 'Buttons',
        path: '/buttons',
      },
      {
        name: 'Forms',
        path: '/form-standard',
      },
      {
        name: 'Spinners',
        path: '/spinners',
      },
      {
        name: 'Tables',
        path: '/table-standard',
      },
      {
        name: 'Cards',
        path: '/cards',
      },
      {
        name: 'Forum',
        path: '/forum',
      },
      {
        name: 'Blog',
        path: '/blog',
      },
      {
        name: 'Charts',
        path: '/charts',
      },
      {
        name: 'Dashboard',
        path: '/dashboard',
      },
      {
        name: 'Login',
        path: 'login',
      },
      {
        name: 'DataGrid',
        path: 'datagrid',
      },
      {
        name: 'Datatable',
        path: 'datatable',
      },
      {
        name: 'Datatableview',
        path: 'datatableview',
      },
      {
        name: 'contacts',
        path: 'contacts',
      },
      {
        name: 'faq',
        path: 'faq',
      },
      {
        name: 'filemanager',
        path: 'filemanager',
      },
      {
        name: 'followers',
        path: 'followers',
      },
      {
        name: 'helpcenter',
        path: 'helpcenter',
      },
      {
        name: 'plans',
        path: 'plans',
      },
      {
        name: 'profile',
        path: 'profile',
      },
      {
        name: 'projects',
        path: 'projects',
      },
      {
        name: 'projectdetails',
        path: 'projectdetails',
      },
      {
        name: 'search',
        path: 'search',
      },
      {
        name: 'settings',
        path: 'settings',
      },
      {
        name: 'teamviewer',
        path: 'teamviewer',
      },
      {
        name: 'votelinks',
        path: 'votelinks',
      },
      {
        name: 'formcropper',
        path: 'formcropper',
      },
      {
        name: 'formupload',
        path: 'formcropper',
      },
      {
        name: 'formvalidation',
        path: 'formvalidation',
      },
      {
        name: 'formvalidator',
        path: 'formvalidator',
      },
      {
        name: 'formwizard',
        path: 'formwizard',
      },
      {
        name: 'formwizardvertical',
        path: 'formwizardvertical',
      },
    ],
  },
]

export default Menu
