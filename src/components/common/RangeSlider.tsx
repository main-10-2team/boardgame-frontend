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
      <div className="relative mb-2">
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
          className="peer [&::-webkit-slider-thumb]:bg-primary-400 h-2 w-full cursor-pointer appearance-none rounded-lg border border-gray-200 bg-gray-100 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-none [&::-webkit-slider-thumb]:shadow-md"
          style={{
            background: `linear-gradient(to right, #ffcbf4 0%, #ff61d5 ${percent}%, #f1f1f1 ${percent}%, #f1f1f1 100%)`,
          }}
        />
        <span
          style={{
            left: `${percent}%`,
          }}
          className="absolute -top-6 hidden -translate-x-1/2 transform rounded border border-gray-300 bg-white px-2 py-1 text-xs font-medium text-black shadow peer-active:block"
        >
          {value}
        </span>
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
