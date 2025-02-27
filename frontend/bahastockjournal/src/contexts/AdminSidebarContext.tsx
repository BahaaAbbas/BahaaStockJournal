import { createContext, useContext, useState } from 'react';
import { AdminSidebarContextType, ContextProviderProps } from '../Types/Contexts';



const SidebarContext = createContext<AdminSidebarContextType | undefined>(undefined);

export const SidebarProvider: React.FC<ContextProviderProps> = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen((prevState) => !prevState);
    };

    return (
        <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
};
