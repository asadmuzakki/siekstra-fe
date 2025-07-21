import GeneralTable from "../../Components/GeneralTable";
import Header from "../../Components/Header";
import Sidebar from "../../Components/Sidebar";

const DataSiswa = () => {
  const editdelete = (id: string) => {
    alert(id);
  };
  const data = [
    {
      id: "1",
      nis: "12345",
      nama: "John Doe",
      kelas: "5",
      jenis_kelamin: "Laki-Laki",
      ekstrakurikuler: "Futsal",
      pembina: "Pak Budi",
    },
    {
      id: "2",
      nis: "12346",
      nama: "Jane Smith",
      kelas: "6",
      jenis_kelamin: "Perempuan",
      ekstrakurikuler: "Paduan Suara",
      pembina: "Bu Siti",
    },
    {
      id: "3",
      nis: "12347",
      nama: "Ali Akbar",
      kelas: "5",
      jenis_kelamin: "Laki-Laki",
      ekstrakurikuler: "Pramuka",
      pembina: "Pak Andi",
    },
    {
      id: "4",
      nis: "12348",
      nama: "Siti Aminah",
      kelas: "4",
      jenis_kelamin: "Perempuan",
      ekstrakurikuler: "Tari Tradisional",
      pembina: "Bu Rina",
    },
    {
      id: "5",
      nis: "12349",
      nama: "Rudi Hartono",
      kelas: "6",
      jenis_kelamin: "Laki-Laki",
      ekstrakurikuler: "Basket",
      pembina: "Pak Joko",
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <div onClick={(e) => e.stopPropagation()}>
        <Sidebar sidebar="ADMIN" />
      </div>
      <div className="flex-1 flex flex-col w-full overflow-hidden relative bg-blue-50">
        <div onClick={(e) => e.stopPropagation()}>
          <Header />
        </div>
        <div className="overflow-scroll scrollbar-hide  w-full">
          <div className="flex-1 m-4  scrollbar-hide">
            <div className="w-full flex justify-between mb-6">
              <p className="text-2xl md:text-3xl text-gray-600 font-semibold">
                Dashboard
              </p>
            </div>

            <div className="p-5 bg-white shadow-md rounded-md mb-10">
              <GeneralTable
                label={[
                  "NIS",
                  "Nama",
                  "Kelas",
                  "Jenis Kelamin",
                  "Ekstrakurikuler",
                  "Wali Murid",
                ]}
                data={data}
                action={true}
                keys={[
                  "nis",
                  "nama",
                  "kelas",
                  "jenis_kelamin",
                  "ekstrakurikuler",
                  "pembina",
                ]}
                onEdit={editdelete}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataSiswa;
