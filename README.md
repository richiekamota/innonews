# Innonews - Personalized News Platform  

Innonews is a modern web application designed to deliver personalized news experiences tailored to user preferences. With powerful features and a mobile-responsive design, Innonews ensures users stay informed and engaged.

---

## Features  

### 1. **User Authentication and Registration**  
- **Secure Registration:** Users can sign up with an email and password to ensure data security.  
- **Login Access:** Seamless login functionality for accessing personalized content.  
- **Account Management:** Update profiles and preferences with ease.  

### 2. **Article Search and Filtering**  
- **Keyword Search:** Quickly find articles using relevant keywords.  
- **Date Filtering:** Narrow down results by selecting specific date ranges.  
- **Category and Source Filters:** Customize search results by category or source.  

### 3. **Personalized News Feed**  
- **Preferred Sources:** Add favorite news outlets to your feed.  
- **Category Selection:** Choose categories like sports, technology, business, etc.  
- **Author Preferences:** Follow specific authors for targeted content.  

### 4. **Mobile-Responsive Design**  
- **Adaptive Layouts:** Content adjusts dynamically for all screen sizes.  
- **Touch-Friendly UI:** Smooth navigation for mobile users.  
- **Fast Loading Times:** Lightweight design optimized for mobile networks.  

---

## Why Choose Innonews?  
- **Personalized Experience:** Tailored news feed based on user preferences.  
- **Powerful Filtering Options:** Quickly access relevant articles.  
- **Mobile Accessibility:** Consistent experience across devices.  

---

## Getting Started  
1. **Sign Up:** Create an account to access personalized features.  
2. **Customize Your Feed:** Select preferred sources, categories, and authors.  
3. **Stay Informed:** Enjoy a seamless, mobile-friendly news experience.  

---

## Getting Started ( for Developers)  
1. Clone the Github repo.  
2. Run the following command ```./vendor/bin/sail -up  
3. cd into frontend folder and look for a file named tailwind.config.ts and paste in the following code:    ```/** @type {import('tailwindcss').Config} */
    export default {
        content: [
            "./index.html",
            "./src/**/*.{js,ts,jsx,tsx}",
        ],
        theme: {
            extend: {},
        },
        plugins: [],
    }
4. In the same directory look for another file named vite.config.ts and open it to paste the following      code: ```import { defineConfig } from 'vite';
 ```import react from '@vitejs/plugin-react';

 ```export default defineConfig({
    plugins: [react()],
      server: {
        proxy: {
            '/api': 'http://localhost:8086', // Adjust the URL to match your Laravel app's network
         },
        port: 5173,
        // Remove or set `open: false` to prevent Vite from trying to open the browser
        host: true,
        open: false,
        watch: {
            usePolling: true,
         },
    },
    optimizeDeps: {
        include: [
            'react',
            'react-dom',
        ],
    },
    build: {
        rollupOptions: {
            //input: 'index.html', // Specify the path to your entry HTML file
        },
    },
  });
5. Don't forget to run ```./vendor/bin/sail php artisan migrate

6. Don't forget to set up your keys for the following api news sites(these are not real keys, you need to get your own): 
   -NEWS_API_KEY=hhdbd748848484u8448  (News API)
   -GUARDIAN_API_KEY=d5a7647ce3bab74d (The Guardian)
   -NYT_API_KEY=gccf5n0Pqlq1hrSWLCZZL (New York Times)

6. Run the following command ``./vendor/bin/sail php artisan articles:scrape

7. ### Contact  
For questions, feedback, or support, please reach out to me at: **[richiekamota@gmail.com]**.  
