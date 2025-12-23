'use client';

import React from 'react';

interface Step {
  id: number;
  title: string;
  description: string;
  duration: string;
}

interface StepProgressProps {
  steps: Step[];
  currentStep: number;
  completedSteps: number[];
}

export default function StepProgress({ steps, currentStep, completedSteps }: StepProgressProps) {
  return (
    <div className="w-full">
      {/* 진행률 바 */}
      <div className="flex items-center justify-between mb-6">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* 스텝 원 */}
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all ${
                  completedSteps.includes(step.id)
                    ? 'bg-idusOrange text-white'
                    : currentStep === step.id
                    ? 'bg-idusOrange-20 text-idusOrange border-2 border-idusOrange'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {completedSteps.includes(step.id) ? '✓' : step.id}
              </div>
              <span
                className={`mt-2 text-sm font-medium ${
                  completedSteps.includes(step.id) || currentStep === step.id
                    ? 'text-idusBlack'
                    : 'text-gray-400'
                }`}
              >
                STEP {step.id}
              </span>
            </div>
            
            {/* 연결선 */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-1 mx-2 rounded-full bg-gray-200">
                <div
                  className={`h-full rounded-full transition-all ${
                    completedSteps.includes(step.id) ? 'bg-idusOrange' : 'bg-transparent'
                  }`}
                  style={{
                    width: completedSteps.includes(step.id) ? '100%' : '0%',
                  }}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* 현재 스텝 정보 */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-idusBlack">
              {steps.find(s => s.id === currentStep)?.title}
            </h3>
            <p className="text-sm text-gray-500">
              {steps.find(s => s.id === currentStep)?.description}
            </p>
          </div>
          <div className="text-sm text-gray-500 flex items-center gap-1">
            <span>⏱️</span>
            <span>{steps.find(s => s.id === currentStep)?.duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

