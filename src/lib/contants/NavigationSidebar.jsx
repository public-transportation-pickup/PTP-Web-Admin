import {
	HiOutlineViewGrid,
	HiOutlineUsers,
	HiOutlineDocumentText,
} from 'react-icons/hi'
import { CiRoute,CiShop } from "react-icons/ci";

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Thống kê',
		path: '/',
		icon: <HiOutlineViewGrid />,
		flag: false
	},
	{
		key: 'store',
		label: 'Cửa hàng',
		path: '/store',
		icon: <CiShop />,
		flag:true
	},
	{
		key: 'user',
		label: 'Người dùng',
		path: '/user',
		icon: <HiOutlineUsers />,
		flag:false
	},
	{
		key: 'route',
		label: 'Tuyến',
		path: '/route',
		icon: <CiRoute />,
		flag:false
	},
	// {
	// 	key: 'station',
	// 	label: 'Doanh thu theo trạm',
	// 	path: '/station',
	// 	icon: <FaMapLocation />,
	// 	flag:false
	// },
	{
		key: 'category',
		label: 'Danh mục',
		path: '/category',
		icon: <HiOutlineDocumentText />,
		flag:false
	},
	
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	// {
	// 	key: 'settings',
	// 	label: 'Cài đặt',
	// 	path: '/settings',
	// 	icon: <HiOutlineCog />
	// },
	// {
	// 	key: 'support',
	// 	label: 'Trợ giúp',
	// 	path: '/support',
	// 	icon: <HiOutlineQuestionMarkCircle />
	// }
]