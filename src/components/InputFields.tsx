import '../styles/globalstyle.css';
const InputFields = ({ inputTitle, updateField, fieldName, value, isEditable = true }) => {
    return (
        <div className="input-field-container">
            <label className="input-label">
                {inputTitle}
            </label>
            <input
                className="input-field"
                value={value}
                onChange={(e) => updateField(fieldName, e.target.value)}  // Handle change for text input
                readOnly={!isEditable}  // Disable editing if not editable
            />
        </div>
    );
};

export default InputFields;
