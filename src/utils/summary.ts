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

export function countRiskPerMonth(
  assessments: Assessment[],
  monthsBack: number = 5
) {
  const now = new Date();
  const result: Record<string, Record<string, number>> = {};

  for (let i = 0; i < monthsBack; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
    const key = date.toISOString().slice(0, 7);

    result[key] = {
      Rendah: 0,
      Sedang: 0,
      Tinggi: 0,
    };
  }

  assessments.forEach((a) => {
    const date = new Date(a.created_at);
    const key = date.toISOString().slice(0, 7);

    if (result[key]) {
      result[key][a.risk_level]++;
    }
  });

  return result;
}
