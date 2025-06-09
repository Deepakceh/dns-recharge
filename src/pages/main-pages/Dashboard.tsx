import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from "recharts";
// import doller from '../../assets/images/common/doller.svg'
import profit from '../../assets/images/common/profit.svg'
import operator from '../../assets/images/common/operator.svg'
import pen_reacharge from '../../assets/images/common/pending_recharge.svg'
const COLORS = ["#00C49F", "#FFBB28", "#0088FE", "#FF8042"];

const pieData = [
  { name: "Airtel", value: 400 },
  { name: "VI", value: 300 },
  { name: "Jio", value: 300 },
  { name: "BSNL", value: 200 },
];

const barData = [
  { day: "Sat", Jio: 3000, Airtel: 4000 },
  { day: "Sun", Jio: 2000, Airtel: 3000 },
  { day: "Mon", Jio: 2780, Airtel: 3908 },
  { day: "Tue", Jio: 1890, Airtel: 4800 },
  { day: "Wed", Jio: 2390, Airtel: 3800 },
  { day: "Thu", Jio: 3490, Airtel: 4300 },
  { day: "Fri", Jio: 4000, Airtel: 4400 },
];
const donutStats = [
  { label: "Failed", value: 81, color: "#FF4D4F" },
  { label: "Profit", value: 22, color: "#00C49F" },
  { label: "Success", value: 62, color: "#0088FE" },
  { label: "Complaint Ratio", value: 81, color: "#FF4D4F" },
];

function DonutStat({ label, value, color }: { label: string; value: number; color: string }) {
  const data = [
    { name: "filled", value },
    { name: "empty", value: 100 - value },
  ];

  return (
    <div className="flex flex-col items-center text-center">
      <ResponsiveContainer width={100} height={100}>
        <PieChart>
          <Pie
            data={data}
            innerRadius={25}
            outerRadius={45}
            paddingAngle={1}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
          >
            <Cell fill={color} />
            <Cell fill="#f3f4f6" /> {/* light gray for background */}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="relative -mt-[60px] text-sm font-semibold">{value}%</div>
      <p className="mt-14 text-sm text-gray-700 font-medium">{label}</p>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div className="">
        {/* Dashboard Header */}
        <div className="flex gap-2">
          <Badge variant="secondary" className="bg-white py-2 px-5 text-orange-500 border-2 border-orange-500 font-medium">Recharge</Badge>
          <Badge variant="secondary" className="bg-white py-2 px-5 text-gray-500 font-medium">Bill Payment</Badge>
          <Badge variant="secondary" className="bg-white py-2 px-5 text-gray-500 font-medium">AEPS</Badge>
          <Badge variant="secondary" className="bg-white py-2 px-5 text-gray-500 font-medium">CMS</Badge>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-white rounded-lg shadow-md border">
          <CardContent className="p-4 flex items-center gap-4">
            <img src={profit} alt="Money Icon" className="w-10 h-10" />
            <div className="flex flex-col">
              <p className="text-gray-400 font-normal">Total</p>
              <h2 className="text-xl font-medium">14,450</h2>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white rounded-lg shadow-md border">
          <CardContent className="p-4 flex items-center gap-4">
            <img src={profit} alt="Money Icon" className="w-10 h-10" />
            <div className="flex flex-col">
              <p className="text-gray-400 font-normal">Total Profit</p>
              <h2 className="text-xl font-medium">14,450</h2>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white rounded-lg shadow-md border">
          <CardContent className="p-4 flex items-center gap-4">
            <img src={operator} alt="Money Icon" className="w-10 h-10" />
            <div className="flex flex-col">
              <p className="text-gray-400 font-normal">Most Used Operator</p>
              <h2 className="text-xl font-medium">14,450</h2>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white rounded-lg shadow-md border">
          <CardContent className="p-4 flex items-center gap-4">
            <img src={pen_reacharge} alt="Money Icon" className="w-10 h-10" />
            <div className="flex flex-col">
              <p className="text-gray-400 font-normal">Pending Recharges</p>
              <h2 className="text-xl font-medium">14,450</h2>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white rounded-lg shadow-md border py-5 ">
        <div className="flex flex-wrap items-center justify-between px-20 gap-2 mb-6">
          <h1 className="text-xl font-semibold">Stats</h1>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3  border border-gray-500"></span>
              <p className="text-sm text-muted-foreground">Week</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3  border border-gray-500"></span>
              <p className="text-sm text-muted-foreground">Month</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {donutStats.map((stat, idx) => (
            <DonutStat key={idx} {...stat} />
          ))}
        </div>
      </div>


      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

        {/* First card - 8 columns on md+ screens */}
        <div className="md:col-span-8">
          <h1 className="text-xl font-semibold mb-4">Recharges By Operator</h1>
          <Card className="bg-white rounded-lg shadow-md border">
            <CardContent className="p-4">
              <div className="flex justify-between items-center px-5 mb-6 flex-wrap gap-2">
                {/* Left side */}
                <p className="text-lg text-gray-500"><span className="text-black">$7,560</span> Debited & <span className="text-black">$5,420</span> Credited in this week</p>

                {/* Right side */}
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm bg-blue-500"></span>
                    <p className="text-sm text-muted-foreground">Jio</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm bg-red-500"></span>
                    <p className="text-sm text-muted-foreground">Airtel</p>
                  </div>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={barData}>
                  <XAxis dataKey="day" />
                  <Tooltip />
                  <Bar dataKey="Jio" fill="#0088FE" radius={[8, 8, 0, 0]} barSize={20} />
                  <Bar dataKey="Airtel" fill="#FFBB28" radius={[8, 8, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Second card - 4 columns on md+ screens */}
        <div className="md:col-span-4">
          <h1 className="text-xl font-semibold mb-4">Stats</h1>
          <Card className="bg-white rounded-lg shadow-md border">
            <CardContent className="p-4">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>


      <Card className="bg-white rounded-lg shadow-md border">
        <CardContent className="p-6">
          {/* Header Row: Commission Report aligned right */}
          <div className="flex justify-end mb-4">
            <Badge
              variant="outline"
              className="border-orange-500 text-orange-500 hover:bg-orange-50 text-xs px-3 py-1"
            >
              Commission Report
            </Badge>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-6">
            {/* P2P Wallet Section */}
            <div className="flex-1">
              <p className="font-semibold text-lg mb-4">P2P Wallet</p>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">Billing Taken</span>
                  <span className="text-muted-foreground font-medium text-gray-500">₹180</span>
                </div>
                <div className="flex justify-between text-sm ">
                  <span className="font-semibold">Approved</span>
                  <span className="text-muted-foreground font-medium text-gray-500">₹250</span>
                </div>
                <div className="flex justify-between text-sm ">
                  <span className="font-semibold">Wallet Amount</span>
                  <span className="text-muted-foreground font-medium text-gray-500">₹560</span>
                </div>
              </div>
            </div>

            {/* P2A Wallet Section */}
            <div className="flex-1">
              <div className="flex justify-between items-start mb-4">
                <p className="font-bold text-lg">P2A Wallet</p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm ">
                  <span className="font-semibold">Billing Taken</span>
                  <span className="text-muted-foreground font-medium text-gray-500">₹180</span>
                </div>
                <div className="flex justify-between text-sm ">
                  <span className="font-semibold">Approved</span>
                  <span className="text-muted-foreground font-medium text-gray-500">₹250</span>
                </div>
                <div className="flex justify-between text-sm ">
                  <span className="font-semibold">Wallet Payment</span>
                  <span className="text-muted-foreground font-medium text-gray-500">₹560</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
