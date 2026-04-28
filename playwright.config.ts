import { defineConfig, devices} from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();
export default defineConfig({
  testDir: './Tests',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 4, // 4 workers локално, 1 на CI/CD
  reporter: [['html', { open: 'never' }]], // HTML репорт, без авто-отваряне

  use: {
    browserName: 'chromium', // Задаваме браузъра
    headless: false,
    baseURL: 'https://app.bookly24.tech/auth', 
    trace: 'on-first-retry',
    //screenshot: 'only-on-failure', // Автоматичен screenshot при грешка
   video: {
      mode: 'on',
      size: { width: 1280, height: 720 },
   }
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],

  // Ако имаш локален dev сървър, можеш да го стартираш преди тестовете
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
