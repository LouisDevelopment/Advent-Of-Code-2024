import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';

export const Navbar: React.FC = () => {
    const endContent = (
        <div><Button 
            icon="pi pi-github" 
            rounded 
            tooltip='View the code on Github'
            tooltipOptions={{ position: 'bottom' }}
            text 
            className="text-gray-400 hover:text-white"
            onClick={() => window.open('https://github.com/LouisDevelopment/Advent-Of-Code-2024', '_blank')}
        />
        <Button 
            icon="pi pi-briefcase" 
            rounded  
            tooltip='View portfolio'
            tooltipOptions={{ position: 'bottom' }}
            text 
            className="text-gray-400 hover:text-white"
            onClick={() => window.open('https://louisbraidwood.co.uk', '_blank')}
        />
        </div>
    );

    const startContent = (
        <div className="flex align-items-center gap-3 px-2">
             <div className="w-2rem h-2rem border-round bg-primary flex align-items-center justify-content-center font-bold text-black-alpha-90">
                24
             </div>
             <span className="text-lg font-medium text-white tracking-tight">AoC Workspace</span>
        </div>
    );

    return (
        <div className="sticky top-0 z-5 px-4 pt-4 mb-4">
            <div className="glass-panel" style={{ borderRadius: '16px' }}>
                <Menubar 
                    start={startContent} 
                    end={endContent} 
                    style={{ background: 'transparent', border: 'none' }} 
                />
            </div>
        </div>
    );
};