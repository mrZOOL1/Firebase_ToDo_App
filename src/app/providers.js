'use client';

import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@/components/theme-provider";

export default function Providers({ children }) {

    const [Mounted, SetMounted] = useState(false);

    useEffect(() => {
        SetMounted(true);
    }, []);

    if (!Mounted) {
        return <>{children}</>;
    }

    return (
        <ThemeProvider attribute="class" defaultTheme="light">
            {children}
        </ThemeProvider>
    );
}