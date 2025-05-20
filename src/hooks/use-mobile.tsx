// hooks/useIsMobile.ts (或 useIsMobile.js)
import { useState, useEffect } from 'react';

export default function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            const userAgent = navigator.userAgent;
            const isMobileDevice = /Mobi|Android|iPhone|iPad|iPod/i.test(userAgent);
            setIsMobile(isMobileDevice);
        };
        checkMobile();
        // 可选：监听窗口变化重新判断（横竖屏切换等）
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return isMobile;
}
