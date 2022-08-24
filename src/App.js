import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [inputNama, setInputNama] = useState("");
  const [inputNoHp, setInputNoHp] = useState("");
  const [dataKontak, setDataKontak] = useState(
    JSON.parse(localStorage.getItem("dataKontak")) || []
  );
  const [edit, setEdit] = useState({});

  useEffect(() => {
    localStorage.setItem("dataKontak", JSON.stringify(dataKontak));
  }, [dataKontak]);
  const simpanKontak = () => {
    if (edit.id) {
      const editedKontak = { nama: inputNama, noHp: inputNoHp, id: edit.id };
      const index = dataKontak.findIndex((el) => el.id === edit.id);
      const newDataKontak = [...dataKontak];
      newDataKontak[index] = editedKontak;
      setDataKontak(newDataKontak);
      setEdit({});

      return;
    }
    setDataKontak([
      ...dataKontak,
      { nama: inputNama, noHp: inputNoHp, id: Date.now() },
    ]);
  };
  const hapusKontak = (index) => {
    setDataKontak(
      dataKontak.filter((el) => {
        return el.id !== index;
      })
    );
    setEdit({});
    resetInput();
  };
  const resetInput = () => {
    setInputNama("");
    setInputNoHp("");
  };
  const ubahKontak = (kontak) => {
    setInputNama(kontak.nama);
    setInputNoHp(kontak.noHp);
    setEdit(kontak);
  };
  return (
    <div className="App">
      <h1>CRUD : data kontak</h1>
      <div className="container">
        <form
          onSubmit={(e) => {
            e.preventDefault();

            simpanKontak();
            resetInput();
          }}
        >
          {edit.id && <div className="status">Edit...</div>}
          <label>
            Nama
            <input
              type="text"
              value={inputNama}
              onChange={(el) => setInputNama(el.target.value)}
            />
          </label>

          <label>
            Nomor HP
            <input
              type="text"
              value={inputNoHp}
              onChange={(el) => setInputNoHp(el.target.value)}
            />
          </label>
          <button className="tambahBtn">
            {edit.id ? "Simpan perubahan" : "Tambah"}
          </button>
          {edit.id && (
            <button
              className="batalBtn"
              onClick={() => {
                setEdit({});
                resetInput();
              }}
            >
              Batalkan perubahan
            </button>
          )}
        </form>
        {!edit.id && (
          <table>
            <thead>
              <tr>
                <th>Nama</th>
                <th>Nomor Hp</th>
              </tr>
            </thead>
            <tbody>
              {dataKontak.map((el) => {
                return (
                  <tr key={el.id}>
                    <td>{el.nama}</td>
                    <td>{el.noHp}</td>
                    <td>
                      <button
                        className="ubahBtn"
                        onClick={() => ubahKontak(el)}
                      >
                        Ubah
                      </button>
                    </td>
                    <td>
                      <button
                        className="hapusBtn"
                        onClick={() => hapusKontak(el.id)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
