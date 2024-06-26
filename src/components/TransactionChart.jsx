import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts'

export default function TransactionChart({param}) {
  // console.log(param);
  const data = [
    {
      name: 'T2',
      'Tuần mới': param!==null? param.saleValueCurrent[0]:4000,
      'Tuần trước': param!==null? param.saleValueLast[0]:2400
    },
    {
      name: 'T3',
      'Tuần mới': param!==null? param.saleValueCurrent[1]:4000,
      'Tuần trước': param!==null? param.saleValueLast[1]:2400
    },
    {
      name: 'T4',
      'Tuần mới': param!==null? param.saleValueCurrent[2]:4000,
      'Tuần trước': param!==null? param.saleValueLast[2]:2400
    },
    {
      name: 'T5',
      'Tuần mới': param!==null? param.saleValueCurrent[3]:4000,
      'Tuần trước': param!==null? param.saleValueLast[3]:2400
    },
    {
      name: 'T6',
      'Tuần mới': param!==null? param.saleValueCurrent[4]:4000,
      'Tuần trước': param!==null? param.saleValueLast[4]:2400
    },
    {
      name: 'T7',
      'Tuần mới': param!==null? param.saleValueCurrent[5]:4000,
      'Tuần trước': param!==null? param.saleValueLast[5]:2400
    },
    {
      name: 'CN',
      'Tuần mới': param!==null? param.saleValueCurrent[6]:4000,
      'Tuần trước': param!==null? param.saleValueLast[6]:2400
    }
  ];
      
  return (
    <div className='h-[30rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1'>
        <strong className='text-gray-700 font-medium'>Biều đồ so sánh thu nhập</strong>
      <div className='w-full mt-3 flex-1 text-xs'>
      <ResponsiveContainer width="100%" height="100%">
      <BarChart
						width={500}
						height={300}
						data={data}
						margin={{
							top: 20,
							right: 10,
							left: -10,
							bottom: 0
						}}
					>
						<CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Bar dataKey="Tuần trước" fill="#0ea5e9" />
						<Bar dataKey="Tuần mới" fill="#ea580c" />
					</BarChart>
    </ResponsiveContainer>
  
      </div>
    </div>
  )
}
