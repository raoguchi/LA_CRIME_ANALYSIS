# LA Crime & Municipal Policy Modeling

### Group 16: Yuzhi Tao, Qiyong Zhang, Allen Li, Ryosuke (Alex) Oguchi

**Last Updated: 2024**

---

## 🔎 Overview

This project aims to uncover actionable insights into crime trends in **Los Angeles County** from **January 2020 to January 2024**. With nearly **1 million publicly available crime records**, we build a machine learning model to **predict crime types** based on spatio-temporal and demographic features.

Our findings are intended to support **data-driven municipal policy decisions**, improve **resource allocation**, and **enhance public safety**.

---

## 📊 Dataset Summary

| Feature  | Description                                      |
| -------- | ------------------------------------------------ |
| Records  | ~982,639 total                                  |
| Timespan | Jan 2020 - Jan 2024                              |
| Source   | Los Angeles Open Data Portal                     |
| Format   | CSV, JSON, GeoJSON                               |
| Access   | API (limited to 1000 records per call)           |
| Columns  | 28 total                                         |
| Includes | Victim demographics, location, time, weapon type |

---

## 📅 Project Structure

```bash
Project-Files-main/
├── code.ipynb                # Exploratory Data Analysis & Modeling
├── lgb_model.txt.gz          # Trained LightGBM model
├── unique_values.json        # Metadata on feature values
├── data/
│   ├── crime.csv.gz              # Full crime dataset
│   ├── la_crime_data.geojson.gz # Geospatial boundaries
│   ├── mo_codes.pdf              # Codebook for crime types
│   ├── subset_ml.csv.gz         # Processed dataset for ML
│   └── subset_ml.json.gz        # Alternative ML dataset
```

---

## 🔢 Goal

- Analyze patterns of crime across time, location, and demographic factors
- Build a classification model to predict **crime type**
- Generate insights that can support **public safety** and **policy making**

---

## 📝 Key Insights

- Total crime levels remain **high post-pandemic**
- **Violent crime** has decreased, but **theft and vehicle-related incidents** are on the rise
- **Predictable patterns** in location and time can guide targeted intervention

---

## 🎯 Modeling Approach

### 🔌 Model: LightGBM (Gradient Boosting Classifier)

#### ✨ Features Used

- Event types (MO Codes)
- Time and date of occurrence
- Geographic location (police precincts)
- Victim demographics (age, gender, race)
- Weapon type (if applicable)

#### ✅ Performance

| Metric    | Score |
| --------- | ----- |
| Accuracy  | 0.72  |
| Precision | 0.73  |
| Recall    | 0.72  |
| F1 Score  | 0.71  |

---

## 🧡 Fairness Evaluation (By Race)

| Group    | Accuracy | Precision | Recall | F1     |
| -------- | -------- | --------- | ------ | ------ |
| White    | 0.7233   | 0.7329    | 0.7233 | 0.7137 |
| Black    | 0.7021   | 0.7170    | 0.7020 | 0.6907 |
| Hispanic | 0.7184   | 0.7279    | 0.7174 | 0.7055 |
| Other    | 0.7542   | 0.7427    | 0.7542 | 0.7249 |

---

## 📈 Policy Utilization

Municipalities can use the model to:

- Reallocate staffing based on **temporal and geographic hotspots**
- Adjust policy on crime prevention, punishment, or rehabilitation
- Improve public communication and transparency

---

## ❓ Challenges

- The model **assumes crime has already occurred** — it cannot predict unknown or unreported crimes
- **Non-crime acts are not recorded**, which skews perception
- Difficult to act on crimes that are hidden from the system

---

## 🧰 Suggested Interventions

### Operational

- Dynamic staffing in high-crime areas during peak hours
- Focus resources on **predictable and preventable crimes**

### Policy

- Voter-supported changes in punishment/rehabilitation balance
- Invest in **education & prevention** initiatives

---

## 📁 How to Run

1. Clone the repository

```bash
git clone <repo-url>
cd Project-Files-main
```

2. Unzip the model and datasets

3. Run the notebook

```bash
jupyter notebook code.ipynb
```

4. Inspect outputs, model predictions, and visuals

---

## 📷 Visual Summary

### 🗺️ Crime Frequency by LAPD Precinct

![Frequency of Crimes Across LAPD Precincts](images/freq.png)

> Central precinct shows the highest number of reported crimes, suggesting concentrated hotspots in urban centers.

---

### 📆 Monthly Crime Trends (2020–2024)

![Frequency of Crimes Across Month-Year](images/freq_time.png)

> Crime rates increased steadily post-pandemic and began declining sharply in 2024 — possibly due to new interventions or reporting lags.

---

## 📅 Future Work

- Incorporate social or economic indicators (e.g., poverty levels, housing instability)
- Explore sequence models or spatial clustering
- Expand fairness evaluation beyond race (e.g., age, gender)

---

## 🙏 Acknowledgments

Thanks to the Los Angeles Open Data initiative and the communities affected by crime who inspire work toward equitable public safety.

---

## 📚 References

- [LA Open Data Crime Portal](https://data.lacity.org/)
- [LightGBM Documentation](https://lightgbm.readthedocs.io/)
