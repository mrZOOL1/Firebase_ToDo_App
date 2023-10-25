'use client';

import React, {useState, useEffect} from 'react';
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { Sun } from 'lucide-react';
import { Moon } from 'lucide-react';
import { CornerUpLeft } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';



const ThemeSwitcher = () => {

  const path = usePathname();
  const IsProject = path === '/';

  const [Mounted, SetMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const toggletheme = function() {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }

  useEffect(() => {
    SetMounted(true);
  },[]);

  if (!Mounted) {
    return null;
  }

  return (
    <div>

      <div className="absolute top-6 left-6 flex gap-2 items-center">

        <Link href='/'>

          <CornerUpLeft size='30px' className = {`${IsProject && 'hidden'} hover:cursor-pointer transition-all`}></CornerUpLeft>

        </Link>

      </div>

      <div className="absolute top-6 right-6 flex gap-2 items-center">

        <Switch onClick={() => toggletheme()} className='switch'/>
        {theme === 'dark' ? <Moon color='white' /> : <Sun color='black' />}

      </div>

    </div>
  )
}

export default ThemeSwitcher