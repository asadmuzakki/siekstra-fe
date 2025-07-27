export const calculateNilai = (
  nilaiKehadiran: string,
  nilaiKeaktifan: string,
  nilaiPraktik: string
) => {
  const kehadiran = Number(nilaiKehadiran);
  const keaktifan = Number(nilaiKeaktifan);
  const praktik = Number(nilaiPraktik);

  if (isNaN(kehadiran) || isNaN(keaktifan) || isNaN(praktik)) {
    return 0;
  }

  const nilaiAkhir = kehadiran * 0.4 + keaktifan * 0.3 + praktik * 0.3;
  return nilaiAkhir;
};

export const calculateIndexNilai = (nilai: string) => {
  const nilaiAkhir = Number(nilai);
  if (nilaiAkhir >= 94 && nilaiAkhir <= 100) {
    return "A";
  }

  if (nilaiAkhir >= 86 && nilaiAkhir < 94) {
    return "B";
  }

  if (nilaiAkhir >= 80 && nilaiAkhir < 86) {
    return "C";
  }

  if (nilaiAkhir < 80) {
    return "D";
  }
};
