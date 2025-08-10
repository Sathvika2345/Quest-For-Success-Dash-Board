# Quest for Success - SAT Performance Dashboard

An interactive dashboard for tracking and visualizing student SAT performance metrics, built with Streamlit and Plotly.

## Features

- **Interactive Filters**
  - Date range selection
  - Individual student selection
  - Real-time data updates

- **Key Performance Indicators (KPIs)**
  - Latest average total scores
  - Top performing students
  - Average improvement rates
  - Target achievement rates

- **Visual Analytics**
  - Score trends over time
  - Section-wise performance distribution
  - Detailed performance data table

## Setup Instructions

1. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Run the dashboard:
   ```bash
   streamlit run app.py
   ```

3. Access the dashboard in your web browser at `http://localhost:8501`

## Data Structure

The dashboard currently uses generated sample data with the following structure:
- Student ID
- Student Name
- Test Date
- Math Score
- Reading Score
- Target Score

## Usage Guide

1. Use the sidebar filters to select specific date ranges and students
2. View overall performance metrics in the KPI cards
3. Analyze score trends and distributions in the interactive charts
4. Access detailed performance data in the table view

## Note

This dashboard currently uses sample data. To use real student data, modify the `generate_sample_data()` function in `app.py` to connect to your actual data source.