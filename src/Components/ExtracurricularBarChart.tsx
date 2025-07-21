import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Registrasi elemen Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

// Data Ekstrakurikuler
const data = {
  labels: [
    "Futsal",
    "Musik",
    "Pramuka",
    "Tahfidz",
    "Catur",
    "English",
    "Robotik",
  ],
  datasets: [
    {
      data: [25, 18, 30, 22, 10, 17, 14],
      backgroundColor: "#3b82f6",
      borderRadius: 6,
      barThickness: 50, // Rampingkan bar (default auto)
      maxBarThickness: 50,
      categoryPercentage: 0.5, // Perkecil kategori
      barPercentage: 0.7, // Perkecil bar dalam kategori
    },
  ],
};

// Opsi chart
const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        display: false, // Hilangkan garis vertikal
      },
    },
    y: {
      grid: {
        display: false, // Hilangkan garis horizontal
      },
      ticks: {
        stepSize: 5, // Opsional: biar angka tetap rapi
      },
    },
  },
};

const ExtracurricularBarChart = () => {
  return (
    <div className=" w-full h-[350px] mx-auto">
      <Bar options={options} data={data} />
    </div>
  );
};

export default ExtracurricularBarChart;
