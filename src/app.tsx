/// <reference path="./@types/electron-remote.d.ts" />

import ReactDom from 'react-dom';
import React from 'react';
import { ConfigSelection } from './config-selection';
import { RecoilRoot } from 'recoil';

const App = () => (
    <RecoilRoot>
        <ConfigSelection/>
    </RecoilRoot>
)

const rootElement = document.getElementById('root');
ReactDom.render(<App/>, rootElement);
