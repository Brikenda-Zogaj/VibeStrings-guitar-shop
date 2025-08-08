import React, { createContext, useState, useContext, useMemo } from 'react';
import en from '../lang/en.json';
import sq from '../lang/sq.json';

// Krijojmë një objekt të qartë për përkthimet
const translations = { en, sq };

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en'); // Gjuha fillestare

  const value = useMemo(() => {
    // Kjo siguron që kemi gjithmonë një objekt përkthimi, edhe nëse ngarkesa dështon
    const currentTranslations = translations[language] || {};

    const t = (key) => {
      // Kthen çelësin nëse përkthimi nuk gjendet, por NUK shkakton error
      return currentTranslations[key] || key;
    };

    return {
      language,
      setLanguage,
      t,
    };
  }, [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hook për përdorim të lehtë
export function useLanguage() {
  return useContext(LanguageContext);
}