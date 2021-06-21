using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithTypesAndBrandsSpecification : BaseSpecification<Product>
    {
        public ProductsWithTypesAndBrandsSpecification()
        {
            AddIncludes();
        }

        public ProductsWithTypesAndBrandsSpecification(int id) : base(p => p.Id == id)
        {
            AddIncludes();
        }

        private void AddIncludes()
        {
            AddInclude(p => p.ProductBrand);
            AddInclude(p => p.ProductType);
        }
    }
}