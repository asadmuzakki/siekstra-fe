/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import {
  useGetDataGrafikPendaftaran,
  useGetDataGrafikKegiatan,
} from "../Hooks/Admin/useGet";
import { useMemo, useEffect } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

type Props = {
  type: "pendaftaran" | "kegiatan";
  tahun?: number;
  kategori?: string;
  tingkat?: string;
};

const ExtracurricularBarChart = ({ type, tahun, kategori, tingkat }: Props) => {
  // Pilih hook sesuai type
  const hook =
    type === "pendaftaran"
      ? useGetDataGrafikPendaftaran
      : useGetDataGrafikKegiatan;

  // Panggil hook dengan parameter
  const { data, isLoading, isError, error } =
    type === "pendaftaran"
      ? hook({ tahun }) // pendaftaran hanya filter tahun
      : hook({ tahun, kategori, tingkat }); // kegiatan bisa semua filter

  useEffect(() => {
    if (isError) {
      console.error(`Error fetching grafik ${type}:`, error);
    } else if (!isLoading && data) {
      console.log(`Grafik ${type} data:`, data);
    }
  }, [isLoading, isError, data, error, type]);

  // transformasi data API → format chart.js
  const chartData = useMemo(() => {
    if (!data?.data) return { labels: [], datasets: [] };

    return {
      labels: data.data.map((item: any) => item.ekskul),
      datasets: [
        {
          label:
            type === "pendaftaran" ? "Jumlah Pendaftaran" : "Jumlah Kegiatan",
          data: data.data.map((item: any) => item.total),
          backgroundColor: type === "pendaftaran" ? "#3b82f6" : "#10b981", // biru utk pendaftaran, hijau utk kegiatan
          borderRadius: 6,
          barThickness: 50,
          maxBarThickness: 50,
          categoryPercentage: 0.5,
          barPercentage: 0.7,
        },
      ],
    };
  }, [data, type]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { grid: { display: false } },
      y: {
        grid: { display: false },
        ticks: { stepSize: 5 },
      },
    },
  };

  if (isLoading) return <p>Loading grafik {type}...</p>;
  if (isError) return <p>Error saat fetch grafik {type}: {String(error)}</p>;

  return (
    <div className="w-full h-[350px]">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ExtracurricularBarChart;
