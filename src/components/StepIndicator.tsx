import React from 'react';
import type { StepInfo } from '../types';
import { CheckCircle2 } from 'lucide-react';

interface StepIndicatorProps {
    steps: StepInfo[];
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps }) => {
    return (
        <div className="w-full overflow-x-auto pb-4">
            <div className="flex items-center gap-2 bg-background-secondary/50 backdrop-blur-sm rounded-2xl p-4 border border-white/5 min-w-max">
                {steps.map((step, index) => {
                    const isLast = index === steps.length - 1;

                    return (
                        <React.Fragment key={index}>
                            <div
                                className={`
                  flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300
                  ${step.isActive
                                        ? 'bg-accent-blue/10 border border-accent-blue/30 shadow-lg shadow-accent-blue/10'
                                        : step.isCompleted
                                            ? 'bg-accent-green/5 border border-accent-green/20'
                                            : 'opacity-50 hover:opacity-70'
                                    }
                `}
                            >
                                <div className={`
                  flex items-center justify-center w-6 h-6 rounded-full
                  ${step.isActive
                                        ? 'text-accent-blue'
                                        : step.isCompleted
                                            ? 'text-accent-green'
                                            : 'text-text-muted'
                                    }
                `}>
                                    {step.isCompleted ? (
                                        <CheckCircle2 className="w-5 h-5" />
                                    ) : (
                                        <span className="text-sm font-bold">{step.number}</span>
                                    )}
                                </div>

                                <div className="flex flex-col">
                                    <span className={`
                    text-sm font-medium whitespace-nowrap
                    ${step.isActive ? 'text-text-primary' : step.isCompleted ? 'text-text-secondary' : 'text-text-muted'}
                  `}>
                                        {step.title}
                                    </span>
                                </div>
                            </div>

                            {!isLast && (
                                <div className={`h-px w-8 flex-shrink-0 transition-colors duration-300 ${step.isCompleted ? 'bg-accent-green/30' : 'bg-white/5'}`} />
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};

export default StepIndicator;
