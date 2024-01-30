import { useGlobalState } from '@/app/context/globalContextProvider';
import React from 'react'
import { PieChart, Pie, Sector, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';

const PieChartbox = () => {

    const { theme, tasks, incompleteTasks, completedTasks, percentageOfSuccessful } = useGlobalState();

    const data = [
        { name: 'Total', value: tasks.length, color: '#d800fe' },
        { name: 'Completed', value: completedTasks.length, color: '#0088FE' },
        { name: 'Pending', value: incompleteTasks.length, color: '#00C49F' },
        { name: 'Missed', value: 1, color: '#FF8042' },
    ];
    const COLORS = ['#0088FE', '#00C49F', '#FF8042'];
    // TOTAL, COMPLETED, PENDING (INCOMPLETED BUT NOT MISSED), MISSED(TIMED OUT)
    const filteredData = data.filter(item => item.name !== 'Total');

    return (
        <StatisticsStyled theme={theme}>
            <div className="header-container flex justify-between items-center mb-9">
                <h1>Task statistics</h1>
            </div>
            <div className="piechart-container flex flex-col">
                <div className="piechart-title">
                    <h2>Completion rate</h2>
                </div>
                <div className="piechart-content flex justify-evenly items-center flex-row">
                    <div className="piechart-options">
                        <span className='successful-percentage'>{percentageOfSuccessful()}%</span>
                        {filteredData.map(item => (
                            <div className="option" key={item.name}>
                                <div className="title">
                                    <div className="square" style={{ backgroundColor: item.color }} />
                                    <span style={{ color: item.color }}>{item.name}</span>
                                </div>
                                {/* <span style={{ color: item.color, fontWeight: 600 }}>{item.value}</span> */}
                            </div>
                        ))}
                    </div>
                    <ResponsiveContainer width="99%" height={300}>
                        <PieChart >
                            <Tooltip
                                contentStyle={{ background: "white", borderRadius: "5px" }}
                            />
                            <Pie
                                data={filteredData}
                                innerRadius="70%"
                                outerRadius="90%"
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {filteredData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer >
                </div>
            </div>
            <div className="piechart-container mt-5">
                <h2>Dashboard</h2>
                <div className="dashboard">
                    {data.map(item => (
                        <div className="dashboard-options" key={item.name}>
                            <div className="dashboard-item">
                                <span style={{ color: item.color, fontWeight: 700, fontSize: "2.3rem" }}>{item.value}</span>
                                <span style={{ color: item.color }}>{item.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </StatisticsStyled>
    )
}
const StatisticsStyled = styled.main`
  height: 100%;
  width: 100%;

  padding: 2rem;

  background: ${(props) => props.theme.colorBg2};

  border: 2px solid ${(props) => props.theme.borderColor2};
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;

  overflow-y: auto;
  
  .header-container > h1 {
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 800;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 3rem;
      height: 0.2rem;
      background: ${(props) => props.theme.colorDanger};
      border-radius: .5rem;
    }
  }

  .piechart-container {
    border: 1px solid ${(props) => props.theme.borderColor2};
    padding: 3rem 5rem;

        h2 {
        font-size: clamp(1.5rem, 2vw, 2rem);
        font-weight: 800;
        position: relative;
        margin-left: auto;
    }
  }

  .piechart-options {
    margin-left: 7rem;
    width: 11rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 20px;

    .successful-percentage {
        display: flex;
        justify-content: center;
        font-size: 3.4rem;
        font-weight: 700;
        color: #0088FE;
    }

    .option {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        
        .title {
            display: flex;
            gap: 20px;
            align-items: center;
            font-weight: 600;

            .square {
                width: 10px;
                height: 10px;
                border-radius: 50%;
            }
        }
    }
  }

  .dashboard {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    gap: 2rem;
    margin-top: 2rem;

    .dashboard-options {
        display: flex;
        flex-direction: row;
        
        .dashboard-item {
            display: flex;
            flex-direction: column;
            font-size: 2rem;
            justify-content: center;
            align-items: center;
        }
    }

}

`;

export default PieChartbox