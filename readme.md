# Klontong Mobile App
Klontong is a mobile app built to help owner of a grocery shop (toko kelontong) to manage their products. [Learn More](https://github.com/brik-id/test-m)

### Table of Content
- [Klontong Mobile App](#klontong-mobile-app)
    - [Table of Content](#table-of-content)
    - [Tech stack:](#tech-stack)
    - [Backend (Mock API Service)](#backend-mock-api-service)
    - [Screens:](#screens)
    - [Features:](#features)
    - [Screen Recording](#screen-recording)
    - [Error Reporting (Sentry)](#error-reporting-sentry)
      - [Sentry Issues of Klontong](#sentry-issues-of-klontong)
      - [Sentry Error Event](#sentry-error-event)

### Tech stack:
- `react-native` with `typescript`
- `redux` for state management
- `react-hook-form` for managing form state
- `react-native-encrypted-storage` as secure storage (persistent state) for storing sensitive value such as token
- `axios` as HTTP client
- `react-navigation` for routing and navigation
- `native-base` for building the UI

### Backend (Mock API Service)
This app uses [MockAPI](https://mockapi.io) as the mock backend API service.
- [List of Product](https://637e23df9c2635df8f9a3ec6.mockapi.io/api/v1/products)
- [List of Category](https://637e23df9c2635df8f9a3ec6.mockapi.io/api/v1/category)

### Screens:
- `HomeScreen` shows list of products which has the capabilities of:
  - Pagination/infinite scroll 
  - pull-to-refresh 
  - Search/Filter product with debounce
- `AuthScreen` shows dummy login form. Clicking `Login` button will store dummy token to the `encrypted-storage` and navigate the screen to the `HomeScreen`
- `ProductDetailScreen` shows the detail information of the product
- `AddProductScreen` shows form to input new products to database. List of category is fetched dynamically from the mock API.

### Features:
- Browse products
- Infinite Scroll
- Pull-to-refresh
- See Detail of a product
- Search product
- Add new product 
- Error reporting
- Secure storage as State persistence for storing auth token

### Screen Recording

https://user-images.githubusercontent.com/39834619/204120536-68541ef6-eab3-4105-9e88-4c266dde059c.mp4

https://user-images.githubusercontent.com/39834619/204120561-2d70ae92-13df-4a39-893c-875ca828b037.mp4


### Error Reporting (Sentry)
Klontong also has been integrated to error reporting service namely [Sentry](https://sentry.io/) which can help to identify bugs and error on production.

#### Sentry Issues of Klontong
![Sentry Issues of Klontong](media/Web%20capture_27-11-2022_114231_sentry.io.jpeg)
#### Sentry Error Event
![Sentry Error Event](media/Web%20capture_27-11-2022_114315_sentry.io.jpeg)

