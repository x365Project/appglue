import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import FormatListBulletedOutlinedIcon from '@material-ui/icons/FormatListBulletedOutlined';
import PollOutlinedIcon from '@material-ui/icons/PollOutlined';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import TableChartOutlinedIcon from '@material-ui/icons/TableChartOutlined';
import TimelineOutlinedIcon from '@material-ui/icons/TimelineOutlined';

const TopMenu = [
  {
    label: 'Manage Users',
    icon: PersonOutlineIcon,
    //   url: '/',
    items: [
      {
        label: 'Default',
        icon: PersonOutlineIcon,
        //   url: '/roles/default',
      },
      {
        label: 'Default',
        icon: PersonOutlineIcon,
        //   url: '/roles/custom',
      }
    ]
  },
  {
    label: 'Team Settings',
    icon: PeopleOutlineIcon,
    //   url: '/organisations',
    items: [
      {
        label: 'Default',
        icon: PeopleOutlineIcon,
        //   url: '/roles/default',
      },
      {
        label: 'Default',
        icon: PeopleOutlineIcon,
        //   url: '/roles/custom',
      }
    ]
  },
  {
    label: 'Task Page',
    icon: FormatListBulletedOutlinedIcon,
    //   url: '/users'
  },
  {
    label: 'Trello Like List',
    icon: PollOutlinedIcon,
    //   url: '/roles',
  },
  {
    label: 'My Forms',
    icon: TableChartOutlinedIcon,
    //   url: '/purchases',
  },
  {
    label: 'My Flows',
    icon: TimelineOutlinedIcon,
    //   url: '/settings',
  },
  {
    label: 'My Rules',
    icon: DashboardOutlinedIcon,
    //   url: '/invoicing',
  },
];


export default TopMenu;