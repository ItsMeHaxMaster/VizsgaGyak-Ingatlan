import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./bootstrap.min.css";

type Category = {
  id: number;
  megnevezes: string;
};

type NewAdData = {
  kategoriaId: number;
  hirdetesDatuma: string;
  leiras: string;
  tehermentes: boolean;
  kepUrl: string;
};

function NewAd() {
  const navigate = useNavigate();
  const [types, setTypes] = useState<Category[]>([]);
  const [error, setError] = useState("");
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload: NewAdData = {
      kategoriaId: Number(fd.get("kategoriaId")),
      leiras: String(fd.get("leiras") ?? ""),
      hirdetesDatuma: String(fd.get("hirdetesDatuma")),
      tehermentes: fd.get("tehermentes") === "on",
      kepUrl: String(fd.get("kepUrl") ?? ""),
    };

    try {
      const res = await fetch("http://localhost:5000/api/ujingatlan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || `HTTP ${res.status}`);
      }

      navigate("/offers");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ismeretlen hiba történt");
    }
  };

  useEffect(() => {
    const loadTypes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/kategoriak");
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data: Category[] = await response.json();
        setTypes(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Ismeretlen hiba történt",
        );
      }
    };
    loadTypes();
  }, []);

  return (
    <div className="container">
      <h2 className="mb-4 text-center">Új hirdetés elküldése</h2>
      <div className="row">
        <form
          className="offset-lg-3 offset-md-2 col-lg-6 col-md-8 col-12"
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Ingatlan kategóriája
            </label>
            <select className="form-select" name="kategoriaId" required>
              <option value="0">Kérem válasszon</option>
              {types.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.megnevezes}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="date" className="form-label">
              Hirdetés dátuma
            </label>
            <input
              type="date"
              className="form-control"
              name="hirdetesDatuma"
              value={today}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Ingatlan leírása
            </label>
            <textarea
              className="form-control"
              name="leiras"
              required
              rows={3}
            ></textarea>
          </div>
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              name="tehermentes"
              defaultChecked
            />
            <label className="form-check-label" htmlFor="creditFree">
              Tehermentes ingatlan
            </label>
          </div>
          <div className="mb-3">
            <label htmlFor="pictureUrl" className="form-label">
              Fénykép az ingatlanról
            </label>
            <input type="url" className="form-control" name="kepUrl" required />
          </div>
          <div className="mb-3 text-center">
            <button className="btn btn-primary px-5" type="submit">
              Küldés
            </button>
          </div>

          {error && (
            <div className="alert alert-danger alert-dismissible" role="alert">
              <strong>{error}</strong>
              <button
                type="button"
                className="btn-close"
                onClick={() => setError("")}
              ></button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default NewAd;
