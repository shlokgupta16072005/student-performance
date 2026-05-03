import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

function Dashboard() {
  const [attendance, setAttendance] = useState("");
  const [study, setStudy] = useState("");
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => { fetchHistory(); }, []);

  const fetchHistory = async () => {
    const res = await axios.get("http://localhost:5000/history");
    setHistory(res.data);
  };

  const predict = async () => {
    const res = await axios.post("http://localhost:5000/predict", {
      attendance, study
    });
    setResult(res.data.result);
    fetchHistory();
  };

  const total = history.length;
  const pass = history.filter(h => h.result==="Pass").length;
  const fail = history.filter(h => h.result==="Fail").length;

  return (
    <div>
      <h1>Dashboard</h1>

      <button onClick={()=>{
        localStorage.removeItem("token");
        window.location.href="/";
      }}>Logout</button>

      <h2>Predict</h2>
      <input placeholder="Attendance" onChange={e=>setAttendance(e.target.value)} />
      <input placeholder="Study Hours" onChange={e=>setStudy(e.target.value)} />
      <button onClick={predict}>Predict</button>

      <h3>{result}</h3>

      <h3>Total:{total} Pass:{pass} Fail:{fail}</h3>

      <BarChart width={400} height={300} data={[
        { name:"Pass", value:pass },
        { name:"Fail", value:fail }
      ]}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" />
      </BarChart>

      <h2>History</h2>
      <table border="1">
        <thead>
          <tr><th>Attendance</th><th>Study</th><th>Result</th></tr>
        </thead>
        <tbody>
          {history.map((h,i)=>(
            <tr key={i}>
              <td>{h.attendance}</td>
              <td>{h.study}</td>
              <td>{h.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;