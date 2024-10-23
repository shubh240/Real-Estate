// ScrollContext.js
import React, { createContext, useContext, useState } from 'react';

const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
  const [scrollToBottom, setScrollToBottom] = useState(false);

  return (
    <ScrollContext.Provider value={{ scrollToBottom, setScrollToBottom }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScrollContext = () => useContext(ScrollContext);
