import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import PollIcon from '@material-ui/icons/Poll';
import DashboardIcon from '@material-ui/icons/Dashboard';
import TableChartIcon from '@material-ui/icons/TableChart';
import TimelineIcon from '@material-ui/icons/Timeline';

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
    icon: FormatListBulletedIcon,
    //   url: '/users'
  },
  {
    label: 'Trello Like List',
    icon: PollIcon,
    //   url: '/roles',
  },
  {
    label: 'My Forms',
    icon: TableChartIcon,
    //   url: '/purchases',
  },
  {
    label: 'My Flows',
    icon: TimelineIcon,
    //   url: '/settings',
  },
  {
    label: 'My Rules',
    icon: DashboardIcon,
    //   url: '/invoicing',
  },
];


export default TopMenu;