import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import ApplicationNavigator from './navigators/Root/Application';
import {ThemeProvider} from './theme';
import {MMKV} from 'react-native-mmkv';
import Brand from './components/molecules/Brand/Brand';
import {store} from './services/store';

export const storage = new MMKV();

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider storage={storage}>
        <PaperProvider>
          <ApplicationNavigator />
        </PaperProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
