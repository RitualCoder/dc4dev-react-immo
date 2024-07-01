type PropsCategoryPaginate = {
  totalCount: number;
};

const CategoryPaginate = ({ totalCount }: PropsCategoryPaginate) => {
  return (
    <div className="paginate">
      <p>Number of categories: {totalCount}</p>
    </div>
  );
};

export default CategoryPaginate;
