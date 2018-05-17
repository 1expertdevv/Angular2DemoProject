using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Angular2DemoProject.Model;

namespace Angular2DemoProject.Controllers
{
    [Produces("application/json")]
    [Route("api/Item")]
    public class ItemController : Controller
    {
        ItemDataAccessLayer objItem = new ItemDataAccessLayer();


        // GET: api/Item
        [HttpGet]
        public IEnumerable<Items> Get()
        {
            return objItem.GetAllItems();
        }

        // GET: api/Item/5
        [HttpGet("{id}", Name = "Get")]
        public Items Get(int id)
        {
            return objItem.GetItemById(id);
        }

        // POST: api/Item
        [HttpPost]
        public void Post([FromBody]Items items)
        {
            objItem.AddItems(items);
        }

        // PUT: api/Item
        [HttpPut]
        public void Put([FromBody]Items items)
        {
            objItem.UpdateItem(items);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            objItem.DeleteItem(id);
        }

    }
}
