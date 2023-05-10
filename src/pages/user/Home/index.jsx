import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";

import { ROUTES } from "../../../constants/routes";

import * as S from "./styles";

function HomePage() {
  const navigate = useNavigate();

  const handleSelectCategory = () => {
    navigate(ROUTES.USER.PRODUCT_LIST, {
      state: {
        categoryId: 1,
      },
    });
  };

  return (
    <S.HomeWrapper>
      <Button type="primary" onClick={() => handleSelectCategory()}>
        Go to Apple with navigate
      </Button>
      <Link to={ROUTES.USER.PRODUCT_LIST} state={{ categoryId: 2 }}>
        Go to Samsung with Link
      </Link>
    </S.HomeWrapper>
  );
}

export default HomePage;
