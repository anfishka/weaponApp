using System.Linq;
using System.Threading.Tasks;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.EntityFrameworkCore;
using System.Net;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using System.Collections.Specialized;
using System.Net.Http;

public class ProductsFunction
{
    private readonly AppDbContext _context;

    public ProductsFunction(AppDbContext context)
    {
        _context = context;
    }

    [Function("GetProducts")]
    public async Task<HttpResponseData> GetProducts([HttpTrigger(AuthorizationLevel.Function, "get", Route = "products")] HttpRequestData req)
    {
        var products = await _context.Products.ToListAsync();
        var response = req.CreateResponse(HttpStatusCode.OK);
        await response.WriteAsJsonAsync(products);
        return response;
    }

    [Function("GetProductById")]
    public async Task<HttpResponseData> GetProductById([HttpTrigger(AuthorizationLevel.Function, "get", Route = "products/{id}")] HttpRequestData req, int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null)
        {
            var notFoundResponse = req.CreateResponse(HttpStatusCode.NotFound);
            await notFoundResponse.WriteStringAsync("Product not found.");
            return notFoundResponse;
        }
        var response = req.CreateResponse(HttpStatusCode.OK);
        await response.WriteAsJsonAsync(product);
        return response;
    }

    [Function("SearchProducts")]
    public async Task<HttpResponseData> SearchProducts(
       [HttpTrigger(AuthorizationLevel.Function, "get", Route = "products/search")] HttpRequestData req)
    {
        // Извлечение параметров запроса
        NameValueCollection queryParams = req.Url.ParseQueryString();
        string query = queryParams["query"];

        if (string.IsNullOrEmpty(query))
        {
            var badRequestResponse = req.CreateResponse(HttpStatusCode.BadRequest);
            await badRequestResponse.WriteStringAsync("Search query cannot be empty.");
            return badRequestResponse;
        }

        var products = await _context.Products
            .Where(p => p.Name.Contains(query) || p.Category.Contains(query))
            .ToListAsync();

        if (!products.Any())
        {
            var notFoundResponse = req.CreateResponse(HttpStatusCode.NotFound);
            await notFoundResponse.WriteStringAsync("No products found matching the query.");
            return notFoundResponse;
        }

        var response = req.CreateResponse(HttpStatusCode.OK);
        await response.WriteAsJsonAsync(products);
        return response;
    }
}