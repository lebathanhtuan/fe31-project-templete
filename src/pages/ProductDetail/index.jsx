import { useParams } from "react-router-dom";

function ProductDetailPage() {
  const params = useParams();
  // const { id } = useParams();

  return <div>Product Detail Page - {params.id}</div>;
}

export default ProductDetailPage;
