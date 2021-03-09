import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import SettingsIcon from '@material-ui/icons/Settings';
import React, { Dispatch } from 'react';

import { FrameProps } from '../NavFrame/FrameProps';
import { INavigationPage } from './INavigationPage';
import TeamPg from './TeamPage';

/* put page routes and registration here. */

export class PageRoutes {
  static pages: INavigationPage[] = [];
  static addRootPage(page: INavigationPage): void {
    this.pages.push(page);
  }

  static getRootPages(): INavigationPage[] {
    let pages: INavigationPage[] = [...this.pages];

    pages.push(new TeamPage());
    pages.push(new SettingsPage());

    return pages;
  }
}

class SettingsPage implements INavigationPage {
  name: string = 'Settings';
  urlRoute?: string | undefined = 'settings';
  renderIcon(): JSX.Element | null | undefined {
    return <SettingsIcon />;
  }
  renderPage(): JSX.Element | null | undefined {
    return <div>settings page</div>;
  }
  getSubPages(): INavigationPage[] {
    return [];
  }
}

class TeamPage implements INavigationPage {
  name: string = 'Team';
  urlRoute?: string | undefined = 'team';
  renderIcon(): JSX.Element | null | undefined {
    return <PeopleOutlineIcon />;
  }
  renderPage(
    layoutOptions: FrameProps,
    setLayoutOption: Dispatch<any>,
    rerender?: any | undefined
  ): JSX.Element | null | undefined {
    return <TeamPg rerender={rerender} layoutOptions={layoutOptions} setLayoutOption={setLayoutOption} />;
  }
  getSubPages(): INavigationPage[] {
    return [new UsersPage(), new RolesPage()];
  }
}

class UsersPage implements INavigationPage {
  name: string = 'Users';
  urlRoute?: string | undefined = 'team/users';
  renderIcon(): JSX.Element | null | undefined {
    return undefined;
  }
  renderPage(): JSX.Element | null | undefined {
    return <div>users page</div>;
  }
  getSubPages(): INavigationPage[] {
    return [];
  }
}

class RolesPage implements INavigationPage {
  name: string = 'Roles';
  urlRoute?: string | undefined = 'team/roles';
  renderIcon(): JSX.Element | null | undefined {
    return undefined;
  }
  renderPage(): JSX.Element | null | undefined {
    return <div>roles page</div>;
  }
  getSubPages(): INavigationPage[] {
    return [];
  }
}
