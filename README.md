
# GIST Challenge

In this React Native code challenge, I'm aiming to build an app to read (and write if time allows) GISTs using official GitHub's API with a focus on reusable components, and scalability in mind. With support for both iOS and Android.

## The Project

For this project I'm using [redux](https://github.com/reduxjs/redux) as state container, with a [redux-thunk](https://github.com/reduxjs/redux-thunk) implementation to handle every possible async process that we might need to do, like API requests.

Dealing with redux modules/actions/reducers can be a little bit hard to maintain in large scale project, so in order to keep things under control, I'm using [reduxsauce](https://github.com/infinitered/reduxsauce) which provides a few tools for working with Redux-based codebases, allowing us to not only keep the state container organized and clear, but also letting us easily change it whenever we need to.

For navigations, I'm using [react-navigation](https://reactnavigation.org/) which provides me with all the bridges to native elements/behaviour that I need to be able to create a native UX.

I'm using [axios](https://github.com/axios/axios) as HTTP client but being wrapper by a service layer to centralize every access-to-data and functions of the API.

For API error handling, I've made an apiErrorHandler which will grab the error coming from the API, extract out of it the error message, fire an in-app-notification with the error, and stop any possible loading animation that the app might have running.

The project is also localized ready, which means that we can have every view/text in the app in the user's language. By default the app is using english, so if the language is not yet implemented, everything will be in english. To accomplish this, I'm using [react-native-localization](https://github.com/stefalda/ReactNativeLocalization).

When it comes to the app theme/style I've implemented a centralized theme concept, which will allow to customize and change the look & feel of the app very easily in the future, by changing a few variables. All this is possible because pretty much every component/screen of the app is using the styles set on `/theme` folder.

I've implemented [redux-persist](https://github.com/rt2zz/redux-persist) to persist and rehydrate a redux store. This is useful if we want to cache something in the app at some point, like a user-token, or something like that, so when the user closes the app, the next time it launch the app, the user-token or whatever is persisted, will remain the same.

For debugging the project is configured to use [react-native-debugger](https://github.com/jhen0409/react-native-debugger) which is a pretty useful debugger for React Native apps.

## Requirements
In order to run this project, you must have installed and already configured (if supported) all this tools.

 - [Yarn](https://yarnpkg.com/lang/en/)
 - [Node](https://nodejs.org/en/)
 - xCode (Mac users only)
 - Android Simulator

## Install

```
$ yarn install
```


## Run

### RN dev server

In a separate terminal window/tab

```
$ yarn start
```

### Launch App

In a separate terminal window/tab



#### iOS app

```
$ yarn ios
```



#### Android app

```
$ yarn android
```


## Debugging

The project is configured to use[react-native-debugger](https://github.com/jhen0409/react-native-debugger) which is a pretty useful debugger for React Native apps.

**Use `REACT_DEBUGGER` env of react-native packager**

If you're using **react-native-debugger**, make sure your packager is using the debugger, otherwise it'll keep opening the chrome's debugger. To do so, just run the following:

```
$ REACT_DEBUGGER="rndebugger-open --open --port 8081"
```
