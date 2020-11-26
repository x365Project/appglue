import * as React from 'react';
import capitalize from '../../appglue.common/helpers/capitalize';
import {apiRoute} from './utils';
import './app.less';

interface AppStates {
    username?: string;
    textOfPostTest: string,
    textForPost: string,
    textOfPutTest: string,
    textForPut: string,
    textOfDeleteTest: string,
    textForDelete: string,
}

export default class App extends React.Component<{}, AppStates> {
    state: AppStates = {
        username: '',
        textOfPostTest: '',
        textForPost: '',
        textOfPutTest: '',
        textForPut: '',
        textOfDeleteTest: '',
        textForDelete: '',
    };

    getUser = async () => {
        this.setState({
            username: (await apiRoute.invoke('GET', 'test')).username
        })
    };

    sendUserInfo = async () => {
        if (this.state.textOfPostTest.trim()) {
            const response = await apiRoute.invoke('POST', 'test', {
                text: this.state.textOfPostTest
            });

            this.setState({
                textForPost: response.text
            });
        }
    };

    changeUserInfo = async () => {
        if (this.state.textOfPutTest.trim()) {
            const response = await apiRoute.invoke('PUT', 'test', {
                text: this.state.textOfPutTest
            });

            this.setState({
                textForPut: response.text
            });
        }
    };

    deleteUserInfo = async () => {
        if (this.state.textOfDeleteTest.trim()) {
            const response = await apiRoute.invoke('DELETE', 'test', {
                text: this.state.textOfDeleteTest
            });

            this.setState({
                textForDelete: response.text
            });
        }
    };

    render() {
        const {username, textForPost, textForPut, textForDelete} = this.state;
        const inputText = 'Input text...';
        return (
            <div>
                <div>
                    <div>
                        <div>
                            <button onClick={this.getUser}>{'Test Get'}</button>
                        </div>
                        <label>{'Test for Get: '}</label>
                        <h2>{!!username && `Hello ${capitalize(username)}!`}</h2>
                    </div>
                    <div>
                        <input onChange={e => this.setState({textOfPostTest: e.target.value})} placeholder={inputText}/>
                        <button onClick={this.sendUserInfo}>{'Test Post'}</button>
                    </div>
                    <div>
                        <label>{'Test for Post: '}</label>
                        <h3>{textForPost}</h3>
                    </div>
                    <div>
                        <input onChange={e => this.setState({textOfPutTest: e.target.value})} placeholder={inputText}/>
                        <button onClick={this.changeUserInfo}>{'Test Put'}</button>
                    </div>
                    <div>
                        <label>{'Test for Put: '}</label>
                        <h3>{textForPut}</h3>
                    </div>
                    <div>
                        <input onChange={e => this.setState({textOfDeleteTest: e.target.value})}
                               placeholder={inputText}/>
                        <button onClick={this.deleteUserInfo}>{'Test Delete'}</button>
                    </div>
                    <div>
                        <label>{'Test for Delete: '}</label>
                        <h3>{textForDelete}</h3>
                    </div>
                </div>
            </div>
        );
    }
}
