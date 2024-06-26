import classNames from 'classnames'
import { Link } from 'react-router-dom'




export default function PopularProducts({param}) {
  console.log(param);
  const popularProducts = [
    {
      id: '3432',
      product_name: 'Macbook M1 Pro 14"',
      product_thumbnail: 'https://source.unsplash.com/100x100?macbook',
      product_price: '$1499.00',
      product_stock: 341
    },
    {
      id: '7633',
      product_name: 'Samsung Galaxy Buds 2',
      product_thumbnail: 'https://source.unsplash.com/100x100?earbuds',
      product_price: '$399.00',
      product_stock: 24
    },
    {
      id: '6534',
      product_name: 'Asus Zenbook Pro',
      product_thumbnail: 'https://source.unsplash.com/100x100?laptop',
      product_price: '$899.00',
      product_stock: 56
    },
    {
      id: '9234',
      product_name: 'LG Flex Canvas',
      product_thumbnail: 'https://source.unsplash.com/100x100?smartphone',
      product_price: '$499.00',
      product_stock: 98
    },
    {
      id: '4314',
      product_name: 'Apple Magic Touchpad',
      product_thumbnail: 'https://source.unsplash.com/100x100?touchpad',
      product_price: '$699.00',
      product_stock: 0
    },
    {
      id: '4342',
      product_name: 'Nothing Earbuds One',
      product_thumbnail: 'https://source.unsplash.com/100x100?earphone',
      product_price: '$399.00',
      product_stock: 453
    }
  ]
  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 w-[20rem]">
      <strong>Danh mục đồ ăn </strong>
      {param!==null?
      <div className='mt-4 flex flex-col gap-3'>
        {param.categories.map((category,index)=>(
          <Link key={index} to={`/category`} className='flex hover:no-underline'>
            <div className='w-10 h-10 min-w-10 bg-gray-200 rounded-sm overflow-hidden'>
              <img className='w-full h-full object-cover'
              src={category.imageURL}
              alt="cate image"/>
            </div>
            <div className='ml-4 flex-1'>
              <p className='text-sm text-gray-800'>{category.name}</p>
              <span className={classNames(
									category.products === 0
										? 'text-red-500'
										: category.products > 50
										? 'text-green-500'
										: 'text-orange-500',
									'text-xs font-medium'
								)}>
                {category.products ===0 ? '0 sản phẩm': category.products+' sản phẩm'}
              </span>
            </div>
            <div className='text-xs text-gray-400 pl-2'></div>
          </Link>
        ))}
      </div>
      :<></>}
    </div>
  )
}

