import React from 'react';
import { registerRootComponent } from 'expo';
import MainScreen from './MainScreen';

const App = () => <MainScreen />;

registerRootComponent(App);
export default App;
