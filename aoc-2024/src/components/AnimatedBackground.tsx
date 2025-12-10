import React, { useMemo } from 'react';

const AnimatedBackground: React.FC = () => {
    const stars = useMemo(() => {
        return Array.from({ length: 60 }).map((_, i) => {
            const size = Math.random() * 2 + 1 + 'px';
            const top = Math.random() * 100 + '%';
            const left = Math.random() * 100 + '%';
            const duration = Math.random() * 3 + 2 + 's';
            const delay = Math.random() * 5 + 's';
            const isGold = Math.random() > 0.85;

            return (
                <div
                    key={`star-${i}`}
                    className={`star ${isGold ? 'gold' : ''}`}
                    style={{
                        width: size,
                        height: size,
                        top,
                        left,
                        '--duration': duration,
                        '--delay': delay,
                    } as React.CSSProperties}
                />
            );
        });
    }, []);

    const meteors = useMemo(() => {
        return Array.from({ length: 4 }).map((_, i) => {
            const top = (Math.random() * 70 + 30) + '%' ;
            const left = Math.random() * 50 + '%';
            const duration = Math.random() * 5 + 5 + 's';
            const delay = Math.random() * 10 + 's';
            const length = Math.random() * 100 + 50 + 'px';

            return (
                <div
                    key={`meteor-${i}`}
                    className="meteor"
                    style={{
                        top,
                        left,
                        '--duration': duration,
                        '--delay': delay,
                        '--length': length,
                    } as React.CSSProperties}
                />
            );
        });
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div 
                className="bg-orb"
                style={{
                    top: '-20%',
                    left: '-10%',
                    width: '600px',
                    height: '600px',
                    background: 'var(--accent-primary)',
                    animationDelay: '0s'
                }}
            />
            <div 
                className="bg-orb"
                style={{
                    top: '30%',
                    right: '-10%',
                    width: '500px',
                    height: '500px',
                    background: '#a5a5a5ff',
                    animationDelay: '-5s',
                    opacity: 0.1
                }}
            />
            <div 
                className="bg-orb"
                style={{
                    bottom: '-10%',
                    left: '20%',
                    width: '700px',
                    height: '700px',
                    background: '#2d2d58',
                    animationDelay: '-10s',
                    opacity: 0.2
                }}
            />
            {stars}

            {meteors}
            
            <div 
                className="absolute inset-0 w-full h-full"
                style={{
                    background: 'radial-gradient(circle at center, transparent 0%, rgba(2,2,4,0.6) 100%)'
                }}
            />
        </div>
    );
};

export default AnimatedBackground;