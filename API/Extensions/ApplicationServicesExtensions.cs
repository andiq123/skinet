using System.Linq;
using API.Errors;
using API.Helpers;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.Extensions
{
    public static class ApplicationServicesExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            services.AddAutoMapper(typeof(MappingProfiles));

            services.AddDbContext<StoreContext>(x => x.UseSqlite(config.GetConnectionString("DefaultConnection")));
            services.Configure<ApiBehaviorOptions>(options =>
                    {
                        options.InvalidModelStateResponseFactory = actionContext =>
                        {
                            var errors = actionContext.ModelState.Where(e => e.Value.Errors.Count >= 0).SelectMany(x => x.Value.Errors).Select(x => x.ErrorMessage).ToArray();
                            var errorResponse = new ApiValidationErrorResponse() { Errors = errors };
                            return new BadRequestObjectResult(errorResponse);
                        };
                    });

            return services;
        }
    }
}