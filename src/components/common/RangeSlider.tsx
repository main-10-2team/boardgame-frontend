interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (val: number) => void;
  unit?: string;
}

export default function RangeSlider({
  min,
  max,
  step = 1,
  value,
  onChange,
  unit,
}: RangeSliderProps) {
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className="w-full">
      <div className="mb-2">
        <input
          type="range"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-label="range slider"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="[&::-webkit-slider-thumb]:bg-primary-400 h-2 w-full cursor-pointer appearance-none rounded-lg border border-gray-200 bg-gray-100 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-none [&::-webkit-slider-thumb]:shadow-md"
          style={{
            background: `linear-gradient(to right, #ffcbf4 0%, #ff61d5 ${percent}%, #f1f1f1 ${percent}%, #f1f1f1 100%)`,
          }}
        />
      </div>
      <div className="flex w-full items-center justify-between">
        <span className="text-xs font-medium text-nowrap text-black">
          {`${min}${unit ?? ''}`}
        </span>
        <span className="text-xs font-medium text-nowrap text-black">
          {`${max}${unit ?? ''}`}
        </span>
      </div>
    </div>
  );
}
