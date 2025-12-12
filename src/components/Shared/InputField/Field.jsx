
export function Field({
  label,
  icon,
  name,
  placeholder,
  type = "text",
  ...rest
}) {
  return (
    <div>
      <label className="form-label">{label}</label>
      <div className="flex items-center gap-3">
        <div className="icon-box">{icon}</div>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          className="form-input"
          {...rest}
        />
      </div>
    </div>
  );
}

export function FieldArea({ label, icon, name, placeholder, ...rest }) {
  return (
    <div>
      <label className="form-label">{label}</label>
      <div className="flex items-start gap-3">
        <div className="icon-box mt-2">{icon}</div>
        <textarea
          name={name}
          placeholder={placeholder}
          className="form-input h-28 resize-none"
          {...rest}
        />
      </div>
    </div>
  );
}