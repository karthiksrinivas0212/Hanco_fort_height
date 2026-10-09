import { useEffect, useId, useRef, useState } from "react";
import countryCodes from "./countryCodes.json";

export default function PhoneField({ name, value, onChange, placeholder }) {
  const [country, setCountry] = useState("IN:+91");
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const container = useRef(null);
  const trigger = useRef(null);
  const search = useRef(null);
  const popupId = useId();
  const code = country.split(":")[1];
  const filtered = countryCodes.filter((item) => (item.name + " " + item.code + " " + item.iso).toLowerCase().includes(query.trim().toLowerCase()));

  useEffect(() => {
    if (!open) return;
    search.current?.focus();
    const closeOutside = (event) => {
      if (!container.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [open]);

  const close = () => { setOpen(false); trigger.current?.focus(); };
  return (
    <div className="phone-field" ref={container} onKeyDown={(event) => {
      if (event.key === "Escape" && open) { event.preventDefault(); close(); }
    }} onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
    }}>
      <div className="phone-country">
        <button className="phone-country-trigger" type="button" ref={trigger} aria-label={"Country calling code " + code} aria-expanded={open} aria-controls={popupId} onClick={() => { setQuery(""); setOpen(!open); }}>
          {code}<span className="phone-country-arrow" aria-hidden="true">▾</span>
        </button>
      </div>
      <input type="hidden" name={name + "CountryCode"} value={country} />
      <input type="hidden" name={name + "DialCode"} value={code} />
      <input name={name} type="tel" autoComplete="tel-national" placeholder={placeholder} aria-label={placeholder} value={value} onChange={onChange} required />
      {open && <div className="phone-country-popup" id={popupId}>
        <input className="phone-country-search" ref={search} type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search country or code" aria-label="Search country or calling code" onKeyDown={(event) => {
          if (event.key === "Enter") event.preventDefault();
          if (event.key === "ArrowDown") { event.preventDefault(); container.current?.querySelector(".phone-country-option")?.focus(); }
        }} />
        <div className="phone-country-results">
          {filtered.map((item) => <button type="button" className="phone-country-option" key={item.iso + item.code} aria-pressed={country === item.iso + ":" + item.code} onClick={() => { setCountry(item.iso + ":" + item.code); close(); }}><span>{item.name}</span><span>{item.code}</span></button>)}
          {!filtered.length && <p className="phone-country-empty" role="status">No countries found.</p>}
        </div>
      </div>}
    </div>
  );
}
