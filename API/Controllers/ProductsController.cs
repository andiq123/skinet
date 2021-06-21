using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {

        private readonly IGenericRepository<Product> _productRepo;
        private readonly IGenericRepository<ProductType> _productTypeRepo;
        private readonly IGenericRepository<ProductBrand> _productBrandRepo;
        private readonly IMapper _mapper;

        public ProductsController(IGenericRepository<Product> productRepo,
         IGenericRepository<ProductType> productTypeRepo,
         IGenericRepository<ProductBrand> productBrandRepo, IMapper mapper)
        {
            _mapper = mapper;
            _productBrandRepo = productBrandRepo;
            _productTypeRepo = productTypeRepo;
            _productRepo = productRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var spec = new ProductsWithTypesAndBrandsSpecification();
            var products = await _productRepo.ListAsync(spec);
            var productsToReturn = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products);
            return Ok(productsToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(id);
            var product = await _productRepo.GetEntityWithSpec(spec);
            var productToReturn = _mapper.Map<Product, ProductToReturnDto>(product);
            return Ok(productToReturn);
        }

        [HttpGet("brands")]
        public async Task<IActionResult> GetProductBrands()
        {
            return Ok(await _productBrandRepo.GetAllAsync());
        }

        [HttpGet("brands/{id}")]
        public async Task<IActionResult> GetProductBrand(int id)
        {
            return Ok(await _productBrandRepo.GetByIdAsync(id));
        }

        [HttpGet("types")]
        public async Task<IActionResult> GetProductTypes()
        {
            return Ok(await _productTypeRepo.GetAllAsync());
        }

        [HttpGet("types/{id}")]
        public async Task<IActionResult> GetProductType(int id)
        {
            return Ok(await _productTypeRepo.GetByIdAsync(id));
        }

    }
}