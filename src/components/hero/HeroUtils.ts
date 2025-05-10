
// Utility functions for the Hero section

/**
 * Smooth scroll function to navigate between sections
 */
export const scrollToSection = (sectionId: string, e: React.MouseEvent) => {
  e.preventDefault();
  const targetSection = document.querySelector(sectionId);
  
  if (targetSection) {
    const navbarHeight = 80;
    const targetPosition = (targetSection as HTMLElement).getBoundingClientRect().top;
    const offsetPosition = targetPosition + window.pageYOffset - navbarHeight;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

/**
 * Types for the hero section components
 */
export type MousePosition = {
  x: number;
  y: number;
};
