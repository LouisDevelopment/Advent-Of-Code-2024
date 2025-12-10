import React from 'react';
import { Card } from 'primereact/card';
import { Ripple } from 'primereact/ripple';
import type { DayChallenge } from '../types';

interface Props {
    days: DayChallenge[];
    onSelectDay: (dayNum: number) => void;
}

const DashboardGrid: React.FC<Props> = ({ days, onSelectDay }) => {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '1.5rem',
            padding: '2rem'
        }}>
            {days.map((day) => (
                <DayCard key={day.dayNumber} day={day} onClick={() => onSelectDay(day.dayNumber)} />
            ))}
        </div>
    );
};

const DayCard: React.FC<{ day: DayChallenge; onClick: () => void }> = ({ day, onClick }) => {
    const isLocked = day.status === 'locked';
    const isSolved = day.status.includes('solved');

    const borderColor = isSolved ? 'var(--primary-color)' : 'transparent';
    
    return (
        <div className="p-ripple" style={{height: '100%'}} onClick={!isLocked ? onClick : undefined}>
            <Card 
                className={`h-full ${!isLocked ? 'cursor-pointer hover:surface-hover' : 'opacity-50'}`}
                style={{ 
                    border: `1px solid ${isSolved ? borderColor : 'var(--surface-border)'}`,
                    transition: 'all 0.2s'
                }}
            >
                <div className="flex flex-column align-items-center justify-content-center gap-2">
                    <span className="text-4xl font-bold">{day.dayNumber}</span>
                    {isSolved && <i className="pi pi-star-fill text-primary" style={{fontSize: '1.5rem'}}></i>}
                    {isLocked && <i className="pi pi-lock" style={{fontSize: '1rem'}}></i>}
                </div>
            </Card>
            {!isLocked && <Ripple />}
        </div>
    );
};

export default DashboardGrid;