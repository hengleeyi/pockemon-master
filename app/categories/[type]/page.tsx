import React from "react";

type CategoryPageProps = {
  params: { type: string };
};

const CategoryPage = ({ params }: CategoryPageProps) => {
  return <div>{params.type}</div>;
};

export default CategoryPage;
