import { useParams, useLocation } from "react-router-dom";
import qs from "qs";

function TodoDetailPage() {
  const params = useParams();
  const { state, search } = useLocation();
  const query = qs.parse(search, { ignoreQueryPrefix: true });
  console.log("🚀 ~ file: index.jsx:11 ~ TodoDetailPage ~ query:", query);
  // const { id } = useParams();

  return (
    <div>
      <div>To do detail Page - {params.id}</div>
      <div>State Title: {state?.title}</div>
      <div>State Content: {state?.content}</div>
      <div>Search query Title: {query.title}</div>
      <div>Search query Content: {query.content}</div>
    </div>
  );
}

export default TodoDetailPage;
