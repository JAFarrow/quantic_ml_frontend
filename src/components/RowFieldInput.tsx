import type { ChangeEvent } from "react";
import type { PredictionFieldDefinition } from "../data/predictionFields";

interface RowFieldInputProps {
  field: PredictionFieldDefinition;
  value: string;
  onChange: (value: string) => void;
}

const RowFieldInput = ({ field, value, onChange }: RowFieldInputProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <label className="field-control">
      <span className="field-label">
        {field.label}
        {field.optional && <small>optional</small>}
      </span>
      <input
        type={field.type === "number" ? "number" : field.type}
        value={value}
        onChange={handleChange}
        placeholder={field.placeholder}
        min={field.min}
        max={field.max}
        step={field.step ?? (field.type === "number" ? "1" : undefined)}
        required={!field.optional}
        aria-label={field.label}
      />
    </label>
  );
};

export default RowFieldInput;
