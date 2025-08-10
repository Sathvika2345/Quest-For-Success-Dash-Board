import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import numpy as np
from datetime import datetime, timedelta

# Generate sample student data
def generate_sample_data(num_students=50):
    np.random.seed(42)
    
    # Generate student names
    first_names = ['Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Sam', 'Riley', 'Avery']
    last_names = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis']
    
    data = []
    start_date = datetime(2023, 1, 1)
    
    for student_id in range(1, num_students + 1):
        student_name = f"{np.random.choice(first_names)} {np.random.choice(last_names)}"
        target_score = np.random.randint(1300, 1601)
        
        # Generate 5 test scores for each student
        for test_num in range(5):
            test_date = start_date + timedelta(days=test_num*30)
            
            # Simulate improvement over time with some randomness
            base_math = np.random.randint(500, 801)
            base_reading = np.random.randint(500, 801)
            improvement = test_num * np.random.randint(10, 30)
            
            data.append({
                'Student_ID': student_id,
                'Student_Name': student_name,
                'Test_Date': test_date,
                'Math_Score': min(800, base_math + improvement),
                'Reading_Score': min(800, base_reading + improvement),
                'Target_Score': target_score
            })
    
    return pd.DataFrame(data)

# Page configuration
st.set_page_config(page_title="SAT Performance Dashboard", layout="wide")

# Title and description
st.title("📊 Quest for Success - SAT Performance Dashboard")
st.markdown("""Track student performance, analyze trends, and identify areas for improvement.""")

# Generate sample data
df = generate_sample_data()

# Sidebar filters
st.sidebar.header("Filters")

# Date range filter
date_range = st.sidebar.date_input(
    "Select Date Range",
    value=(df['Test_Date'].min(), df['Test_Date'].max())
)

# Student filter
selected_student = st.sidebar.selectbox(
    "Select Student",
    options=['All Students'] + sorted(df['Student_Name'].unique().tolist())
)

# Filter data based on selections
masked_df = df.copy()
if len(date_range) == 2:
    start_date, end_date = date_range
    masked_df = masked_df[
        (masked_df['Test_Date'].dt.date >= start_date) &
        (masked_df['Test_Date'].dt.date <= end_date)
    ]

if selected_student != 'All Students':
    masked_df = masked_df[masked_df['Student_Name'] == selected_student]

# Calculate KPIs
col1, col2, col3, col4 = st.columns(4)

with col1:
    latest_total_avg = masked_df.groupby('Test_Date')[['Math_Score', 'Reading_Score']].mean().iloc[-1].sum()
    st.metric("Latest Average Total Score", f"{int(latest_total_avg)}")

with col2:
    top_performers = masked_df.groupby('Student_Name')[['Math_Score', 'Reading_Score']].mean().sum(axis=1).nlargest(3)
    st.metric("Top Performer", f"{top_performers.index[0]}")

with col3:
    avg_improvement = masked_df.groupby('Student_Name').agg({
        'Math_Score': lambda x: x.iloc[-1] - x.iloc[0],
        'Reading_Score': lambda x: x.iloc[-1] - x.iloc[0]
    }).mean().sum()
    st.metric("Average Improvement", f"{int(avg_improvement)} points")

with col4:
    target_achievement = masked_df.groupby('Student_Name').last()
    target_achievement['Total_Score'] = target_achievement['Math_Score'] + target_achievement['Reading_Score']
    achievement_rate = (target_achievement['Total_Score'] >= target_achievement['Target_Score']).mean() * 100
    st.metric("Target Achievement Rate", f"{achievement_rate:.1f}%")

# Create two columns for graphs
col1, col2 = st.columns(2)

with col1:
    st.subheader("Score Trends Over Time")
    fig_trends = go.Figure()
    
    if selected_student != 'All Students':
        student_data = masked_df[masked_df['Student_Name'] == selected_student]
        fig_trends.add_trace(go.Scatter(
            x=student_data['Test_Date'],
            y=student_data['Math_Score'],
            name='Math',
            line=dict(color='blue')
        ))
        fig_trends.add_trace(go.Scatter(
            x=student_data['Test_Date'],
            y=student_data['Reading_Score'],
            name='Reading',
            line=dict(color='red')
        ))
    else:
        avg_scores = masked_df.groupby('Test_Date')[['Math_Score', 'Reading_Score']].mean()
        fig_trends.add_trace(go.Scatter(
            x=avg_scores.index,
            y=avg_scores['Math_Score'],
            name='Avg Math',
            line=dict(color='blue')
        ))
        fig_trends.add_trace(go.Scatter(
            x=avg_scores.index,
            y=avg_scores['Reading_Score'],
            name='Avg Reading',
            line=dict(color='red')
        ))
    
    fig_trends.update_layout(height=400, margin=dict(l=20, r=20, t=20, b=20))
    st.plotly_chart(fig_trends, use_container_width=True)

with col2:
    st.subheader("Section-wise Performance Distribution")
    latest_scores = masked_df.groupby('Student_Name').last()
    
    fig_dist = go.Figure()
    fig_dist.add_trace(go.Box(
        y=latest_scores['Math_Score'],
        name='Math',
        boxpoints='all',
        jitter=0.3,
        pointpos=-1.8
    ))
    fig_dist.add_trace(go.Box(
        y=latest_scores['Reading_Score'],
        name='Reading',
        boxpoints='all',
        jitter=0.3,
        pointpos=-1.8
    ))
    
    fig_dist.update_layout(height=400, margin=dict(l=20, r=20, t=20, b=20))
    st.plotly_chart(fig_dist, use_container_width=True)

# Detailed student table
st.subheader("Detailed Performance Data")
detailed_view = masked_df[['Student_Name', 'Test_Date', 'Math_Score', 'Reading_Score', 'Target_Score']]
detailed_view['Total_Score'] = detailed_view['Math_Score'] + detailed_view['Reading_Score']
st.dataframe(detailed_view.sort_values('Test_Date', ascending=False), hide_index=True)