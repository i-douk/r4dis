import { useWindowSize } from "@vueuse/core";

const sidebarOpen = ref(false);
export const useSidebar = () =>
{
    const toggleSidebar = () => {
        sidebarOpen.value =!sidebarOpen.value
    }
    
    const isSmallScreen = () => {
        const { width } = useWindowSize()
        if(width.value < 1024){
            sidebarOpen.value = false
        }
    }
    return {
        sidebarOpen,
        toggleSidebar,
        isSmallScreen
    }
}