import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

type Offer = {
  id: number;
  kategoriaId: number;
  kategoriaNev: string;
  leiras: string;
  hirdetesDatuma: string;
  tehermentes: boolean;
  kepUrl: string;
};

function Offers() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOffers = async () => {
      try {
        setError("");
        const res = await fetch("http://localhost:5000/api/ingatlan");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Offer[] = await res.json();
        setOffers(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Ismeretlen hiba történt",
        );
      }
    };

    loadOffers();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Kínálatunk</h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <Table striped bordered hover responsive style={{ display: "block" }}>
        <thead
          style={{ display: "table", width: "100%", tableLayout: "fixed" }}
        >
          <tr>
            <th>ID</th>
            <th>Kategória</th>
            <th>Leírás</th>
            <th>Hirdetés dátuma</th>
            <th>Tehermentes</th>
            <th>Kép</th>
          </tr>
        </thead>
        <tbody style={{ display: "block" }}>
          {offers.map((o) => (
            <tr
              key={o.id}
              style={{ display: "table", width: "100%", tableLayout: "fixed" }}
            >
              <td>{o.id}</td>
              <td>{o.kategoriaNev}</td>
              <td>{o.leiras}</td>
              <td>{o.hirdetesDatuma}</td>
              <td>{o.tehermentes ? "Igen" : "Nem"}</td>
              <td>
                <img src={o.kepUrl} className="img-fluid" alt="Ingatlan kép" />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Offers;
