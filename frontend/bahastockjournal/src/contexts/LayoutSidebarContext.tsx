import { createContext, useContext, useState } from 'react';
import { ContextProviderProps, LayoutSidebarContextType } from '../Types/Contexts';




const LayoutSidebarContext = createContext<LayoutSidebarContextType | undefined>(undefined);


export const LayoutSidebarProvider: React.FC<ContextProviderProps> = ({ children }) => {

    const [isLayoutSidebarOpen, setIsLayoutSidebarOpen] = useState<boolean>(true);

    const toggleLayoutSidebar = (): void => {
        setIsLayoutSidebarOpen((prev) => !prev);
    }


    return (
        <LayoutSidebarContext.Provider value={{ isLayoutSidebarOpen, toggleLayoutSidebar }}>
            {children}
        </LayoutSidebarContext.Provider>
    )
}


export const useLayoutSidebar = () => {
    const context = useContext(LayoutSidebarContext);
    if (!context) {
        throw new Error('useLayoutSidebar must be used within a LayoutSidebarProvider');
    }

    return context;
}

