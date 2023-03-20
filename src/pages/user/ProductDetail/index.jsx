import { useParams } from "react-router-dom";

function ProductDetailPage() {
  const params = useParams();
  console.log("🚀 ~ file: index.jsx:5 ~ ProductDetailPage ~ params:", params);
  // const { id } = useParams();

  return <div>Product Detail Page - {params.id}</div>;
}

export default ProductDetailPage;
