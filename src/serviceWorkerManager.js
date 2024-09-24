// src/serviceWorkerManager.js

import { register as registerServiceWorker, unregister } from './registerServiceWorker';

/**
 * Registers the service worker if the environment is production.
 * Logs the status of the registration process.
 */
export function registerServiceWorker() {
  try {
    if (process.env.NODE_ENV === 'production') {
      // Register the service worker
      registerServiceWorker();

      // Log successful registration
      console.log('Service Worker registration in progress...');
    }
  } catch (error) {
    // Log any errors during the registration process
    console.error('Service Worker registration failed:', error);
  }
}

/**
 * Unregisters the service worker.
 * Logs the status of the unregistration process.
 */
export function unregisterServiceWorker() {
  try {
    // Unregister the service worker
    unregister();

    // Log successful unregistration
    console.log('Service Worker unregistration in progress...');
  } catch (error) {
    // Log any errors during the unregistration process
    console.error('Service Worker unregistration failed:', error);
  }
}
