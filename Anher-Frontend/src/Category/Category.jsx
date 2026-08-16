import { Navigate, useParams } from 'react-router-dom'
import { urlReverter } from '../Functions/functions'

export const Category = () => {
  const { categoryName } = useParams()
  const category = urlReverter(categoryName)
  return <Navigate to={`/all-products?category=${encodeURIComponent(category)}`} replace />
}

export default Category
