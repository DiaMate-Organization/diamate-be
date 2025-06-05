import Assessment from "../types/assessment";

export const getAverageRisk = (assessments: { risk_level: string }[]) => {
  const count: Record<string, number> = {
    Rendah: 0,
    Sedang: 0,
    Tinggi: 0,
  };

  assessments.forEach((a) => {
    count[a.risk_level]++;
  });

  const maxCategory = Object.entries(count).reduce((max, current) =>
    current[1] > max[1] ? current : max
  )[0];

  return maxCategory;
};

export const getCurrentAsessments = (assessments: Assessment[]) => {
  return assessments
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, 10);
};

export function countRiskPerMonth(assessments: Assessment[]) {
  if (assessments.length === 0) return {};

  const months = assessments
    .map((a) => new Date(a.created_at))
    .sort((a, b) => a.getTime() - b.getTime());

  const firstDate = new Date(months[0]);
  const lastDate = new Date(months[months.length - 1]);

  firstDate.setMonth(firstDate.getMonth() - 1);

  const result: Record<string, Record<string, number>> = {};

  const loopDate = new Date(firstDate);
  while (
    loopDate.getFullYear() < lastDate.getFullYear() ||
    (loopDate.getFullYear() === lastDate.getFullYear() &&
      loopDate.getMonth() <= lastDate.getMonth())
  ) {
    const key = loopDate.toISOString().slice(0, 7);
    result[key] = { Rendah: 0, Sedang: 0, Tinggi: 0 };

    loopDate.setMonth(loopDate.getMonth() + 1);
  }

  assessments.forEach((a) => {
    const key = new Date(a.created_at).toISOString().slice(0, 7);
    result[key][a.risk_level]++;
  });

  return result;
}

export function getTopRiskFactorsWithCount(
  assessments: Assessment[],
  topN = 5
): { name: string; count: number }[] {
  const frequencyMap: Record<string, number> = {};

  assessments.forEach(({ risk_factors }) => {
    risk_factors.forEach((factor) => {
      frequencyMap[factor] = (frequencyMap[factor] || 0) + 1;
    });
  });

  return Object.entries(frequencyMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([name, count]) => ({ name, count }));
}

export function simplifyAssessments(assessments: any[]) {
  return assessments.map((a) => ({
    risk_factors: a.risk_factors,
    date: a.created_at,
    risk_level: a.risk_level,
  }));
}

export function generateTopRiskFactorRecommendations(
  topRiskFactors: { name: string; count: number }[]
): string[] {
  const recommendations: string[] = [];

  for (const factor of topRiskFactors) {
    switch (factor.name) {
      case "High Blood Pressure":
        recommendations.push(
          "Tekanan darah tinggi? Ini bukan perlombaan stres, coba kontrol garam dan rileks sedikit."
        );
        break;

      case "Poor General Health":
        recommendations.push(
          "Kesehatan yang kurang oke ini serius, jangan cuma dianggap remeh. Cek ke dokter dan mulai pola hidup sehat."
        );
        break;

      case "Difficulty Walking":
        recommendations.push(
          "Sulit jalan? Jangan cuma duduk nonton serial terus, coba deh jalan kaki sebentar tiap hari, sedikit bergerak nggak bikin mati kok."
        );
        break;

      case "High Cholesterol":
        recommendations.push(
          "Makan gorengan boleh, tapi jangan sampai tiap hari. Hati-hati, bukan cuma dompet yang bocor."
        );
        break;

      case "Frequent Physical Health Problems":
        recommendations.push(
          "Tubuhmu kayak sinyal merah, jangan diabaikan. Istirahat cukup dan konsultasi ke dokter itu wajib."
        );
        break;

      case "Obesity":
        recommendations.push(
          "Obesitas bukan cuma soal penampilan, tapi juga risiko kesehatan. Yuk, mulai bergerak dan perbaiki pola makan."
        );
        break;

      case "Heart Disease or Attack":
        recommendations.push(
          "Penyakit jantung itu serius, bukan bahan lelucon. Segera periksakan kesehatan dan jangan tunda lagi."
        );
        break;

      case "Older Age":
        recommendations.push(
          "Usia bertambah, bukan berarti berhenti merawat diri. Tetap aktif dan cek kesehatan secara rutin ya!"
        );
        break;

      case "Low Education Level":
        recommendations.push(
          "Pendidikan rendah? Jangan jadi alasan untuk malas peduli kesehatan. Edukasi itu penting, ayo belajar terus!"
        );
        break;

      default:
        recommendations.push(
          `Faktor risiko '${factor.name}' cukup sering muncul, jangan anggap remeh. Tubuh ini bukan mesin yang bisa dipaksa terus.`
        );
        break;
    }
  }

  return recommendations;
}
