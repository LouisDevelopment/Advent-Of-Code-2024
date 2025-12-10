import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Badge } from 'primereact/badge';
import init, {solve} from '../pkg/aoc_core'

interface Props {
    dayNumber: number;
    onBack: () => void;
}

const PuzzleView: React.FC<Props> = ({ dayNumber, onBack }) => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [activePart, setActivePart] = useState<1 | 2 | null>(null);

    const runRustSolution = async (part: 1 | 2) => {
        if (!input.trim()) {
            return; 
        }

        setIsLoading(true);
        setActivePart(part);
        
        init().then(() => {
            const output = part === 1 
                ? solve(dayNumber, input, false) 
                : solve(dayNumber, input, true);
            setOutput(output);
            setIsLoading(false);
            setActivePart(null);
        });
    };

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-6 fadein animation-duration-500">
            <div className="flex align-items-center justify-content-between mb-6">
                <div className="flex align-items-center gap-3">
                    <Button 
                        icon="pi pi-arrow-left" 
                        rounded 
                        text 
                        aria-label="Back" 
                        onClick={onBack}
                        className="text-gray-400 hover:text-white"
                    />
                    <div>
                        <div className="text-sm text-primary font-medium tracking-wide uppercase mb-1">Advent of Code</div>
                        <div className="text-3xl font-bold text-white flex align-items-center gap-3">
                            Day {dayNumber}
                            <Badge value="Unsolved" severity="warning" className="font-normal text-xs opacity-80" />
                        </div>
                    </div>
                </div>
                
                <Button 
                    label="View Problem" 
                    icon="pi pi-external-link" 
                    text 
                    className="text-sm text-gray-500 hover:text-gray-300"
                    onClick={() => window.open(`https://adventofcode.com/2024/day/${dayNumber}`, '_blank')}
                />
            </div>

            <div className="grid">
                <div className="col-12 md:col-7">
                    <div className="glass-panel h-full flex flex-column">
                        <div className="p-3 border-bottom-1 border-white-alpha-10 flex justify-content-between align-items-center">
                            <span className="font-medium text-gray-300 flex align-items-center gap-2">
                                <i className="pi pi-file-code text-primary"></i> Input
                            </span>
                            <span className="text-xs text-gray-500 font-mono">input.txt</span>
                        </div>
                        <div className="flex-grow-1 p-0 relative">
                            <InputTextarea 
                                value={input} 
                                onChange={(e) => setInput(e.target.value)} 
                                placeholder="// Paste your puzzle input here..."
                                className="code-editor-input w-full h-full border-none border-noround shadow-none"
                                style={{ minHeight: '300px', resize: 'none', padding: '1.5rem' }}
                            />
                        </div>
                    </div>
                </div>

                <div className="col-12 md:col-5 flex flex-column gap-4">
                    <div className="glass-panel p-4">
                        <div className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">Execution</div>
                        <div className="flex flex-column gap-3">
                            <Button 
                                className="gem-button w-full justify-content-between border-white-alpha-10 bg-white-alpha-5 hover:bg-white-alpha-10 text-white transition-all"
                                onClick={() => runRustSolution(1)}
                                disabled={isLoading}
                            >
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-play text-primary"></i> 
                                    <span>Run Part One</span>
                                </span>
                                {activePart === 1 && <i className="pi pi-spin pi-spinner"></i>}
                            </Button>

                            <Button 
                                className="gem-button w-full justify-content-between border-white-alpha-10 bg-white-alpha-5 hover:bg-white-alpha-10 text-white transition-all"
                                onClick={() => runRustSolution(2)}
                                disabled={isLoading}
                            >
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-forward text-primary"></i> 
                                    <span>Run Part Two</span>
                                </span>
                                {activePart === 2 && <i className="pi pi-spin pi-spinner"></i>}
                            </Button>
                        </div>
                    </div>

                    {/* Output Terminal */}
                    <div className="glass-panel flex-grow-1 flex flex-column" style={{minHeight: '200px'}}>
                        <div className="p-3 border-bottom-1 border-white-alpha-10 flex justify-content-between align-items-center bg-black-alpha-20">
                            <span className="font-medium text-gray-300 text-sm">
                                <i className="pi pi-terminal mr-2"></i>Terminal
                            </span>
                            {output && (
                                <Button 
                                    icon="pi pi-copy" 
                                    rounded 
                                    text 
                                    className="w-2rem h-2rem text-gray-500" 
                                    tooltip="Copy Output"
                                />
                            )}
                        </div>
                        <div className="p-3 font-mono text-sm text-green-400 bg-black-alpha-40 flex-grow-1 overflow-auto" style={{borderRadius: '0 0 12px 12px'}}>
                            {output ? (
                                <>
                                    <div className="opacity-50 mb-2">$ cargo run --release</div>
                                    <div className="fadein animation-duration-300">
                                        &gt; {output}
                                        <span className="animate-cursor ml-1">_</span>
                                    </div>
                                </>
                            ) : (
                                <div className="text-gray-600 italic">Waiting for execution...</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PuzzleView;