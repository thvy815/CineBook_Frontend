import React from "react";
import "./SelectBox.css";

interface Props {
    label: string;
    value: string;
    options: string[];
    onChange: (v: string) => void;
}

export const SelectBox = ({ label, value, options, onChange }: Props) => {
    return (
        <div className="selectbox">
            <p className="selectbox-label">{label}</p>

            <div className="selectbox-wrapper">
                <select
                    className="selectbox-input"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                >
                    <option key="default" value="">
                        Chọn {label}
                    </option>

                    {options.map((item, idx) => (
                        <option key={`${item}-${idx}`} value={item}>
                            {item}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default SelectBox;
